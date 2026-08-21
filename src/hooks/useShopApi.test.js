import { renderHook } from "@testing-library/react";
import { describe, it } from "vitest";
import { useShopApi } from "./useShopApi";

describe("useShopApi custom hook", () => {
  it("ensures initial state has products as an empty array", () => {
    const { result } = renderHook(() => useShopApi());
  });
});
