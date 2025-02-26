import {
	describe,
	it,
	expect,
	vi,
	MockInstance,
	beforeEach,
	Mock,
	afterEach,
} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import * as ReactRouter from "react-router-dom";
import * as OrdersServices from "../services/getOrders";
import * as AuthContext from "../context/AuthContext";
import { useOrders } from "./useOrders";

vi.mock("react-router-dom", () => ({
	useNavigate: vi.fn(),
}));

describe("useOrders", () => {
	let useSessionSpy: MockInstance;
	let getOrdersSpy: MockInstance;
	const mockNavigate = vi.fn();

	beforeEach(() => {
		useSessionSpy = vi.spyOn(AuthContext, "useSession");
		getOrdersSpy = vi.spyOn(OrdersServices, "getOrders");

		(ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);

		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("Deberia mostrar un error", async () => {
		useSessionSpy.mockReturnValue({ user: { id: 1 } });
		getOrdersSpy.mockRejectedValue(new Error("Error al obtener las ordenes"));
		const { result } = renderHook(() => useOrders());

		expect(result.current.loading).toBe(true);
		expect(result.current.orders).toEqual([]);
		expect(result.current.error).toBeNull();

		await waitFor(() => {
			expect(result.current.orders).toEqual([]);
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe(
				"Failed to fetch orders. Please try again later."
			);
			expect(mockNavigate).not.toHaveBeenCalled();
			expect(getOrdersSpy).toHaveBeenCalledTimes(1);
		});
	});
});
