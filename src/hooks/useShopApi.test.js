import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useShopApi } from "./useShopApi";

describe("useShopApi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts with the correct initial state", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );

    const { result, unmount } = renderHook(() => useShopApi());

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    unmount();
  });

  it("loads products successfully", async () => {
    const fakeProducts = [
      {
        id: 1,
        title: "Test Product",
        price: 25,
      },
    ];

    const json = vi.fn().mockResolvedValue(fakeProducts);

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json,
    });

    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useShopApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith("https://fakestoreapi.com/products");

    expect(json).toHaveBeenCalledOnce();
    expect(result.current.products).toEqual(fakeProducts);
    expect(result.current.error).toBeNull();
  });

  it("stores an error when the server request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
    });

    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useShopApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Server failed");
  });
});
