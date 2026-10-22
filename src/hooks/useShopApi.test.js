import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { sampleProducts } from "../data/sampleProducts";
import { useShopApi } from "./useShopApi";

const liveProducts = [
  { id: 1, title: "Test Product", price: 25, image: "/test.jpg", rating: { rate: 4 } },
];

describe("useShopApi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("starts loading and aborts the request on unmount", () => {
    const fetchMock = vi.fn(() => new Promise(() => {}));
    vi.stubGlobal("fetch", fetchMock);
    const { result, unmount } = renderHook(() => useShopApi());
    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.usingSampleProducts).toBe(false);
    const signal = fetchMock.mock.calls[0][1].signal;
    unmount();
    expect(signal.aborted).toBe(true);
  });

  it("uses a valid live catalogue without activating the fallback", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => liveProducts });
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useShopApi());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock).toHaveBeenCalledWith("https://fakestoreapi.com/products", {
      signal: expect.any(AbortSignal),
    });
    expect(result.current.products).toEqual(liveProducts);
    expect(result.current.error).toBeNull();
    expect(result.current.usingSampleProducts).toBe(false);
  });

  it.each([
    ["HTTP failure", () => Promise.resolve({ ok: false })],
    ["network failure", () => Promise.reject(new TypeError("Network unavailable"))],
    [
      "invalid JSON",
      () =>
        Promise.resolve({ ok: true, json: () => Promise.reject(new SyntaxError("Invalid JSON")) }),
    ],
    ["empty catalogue", () => Promise.resolve({ ok: true, json: async () => [] })],
    [
      "malformed products",
      () => Promise.resolve({ ok: true, json: async () => [{ id: 1, price: "25" }] }),
    ],
    [
      "duplicate IDs",
      () => Promise.resolve({ ok: true, json: async () => [...liveProducts, ...liveProducts] }),
    ],
  ])("provides the sample catalogue after %s", async (_name, fetchImpl) => {
    vi.stubGlobal("fetch", vi.fn(fetchImpl));
    const { result } = renderHook(() => useShopApi());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toEqual(sampleProducts);
    expect(result.current.usingSampleProducts).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("uses samples after an eight-second timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener("abort", () =>
              reject(new DOMException("Aborted", "AbortError")),
            );
          }),
      ),
    );
    const { result } = renderHook(() => useShopApi());
    await act(() => vi.advanceTimersByTimeAsync(8000));
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(sampleProducts);
    expect(result.current.usingSampleProducts).toBe(true);
  });

  it("recovers to live products when retried successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new Error("Offline"))
        .mockResolvedValueOnce({ ok: true, json: async () => liveProducts }),
    );
    const { result } = renderHook(() => useShopApi());
    await waitFor(() => expect(result.current.usingSampleProducts).toBe(true));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.usingSampleProducts).toBe(false));
    expect(result.current.products).toEqual(liveProducts);
    expect(result.current.error).toBeNull();
  });

  it("keeps samples usable if a retry also fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Offline")));
    const { result } = renderHook(() => useShopApi());
    await waitFor(() => expect(result.current.loading).toBe(false));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.usingSampleProducts).toBe(true);
    expect(result.current.products).toEqual(sampleProducts);
  });
});
