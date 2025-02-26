import { describe, it, expect, vi, Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSession } from "../context/AuthContext";
import { getOrders } from "../services/getOrders";
import { useOrders } from "./useOrders";

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => vi.fn(),
	};
});

vi.mock("../services/getOrders", () => ({
	getOrders: vi.fn(),
}));

vi.mock("../context/AuthContext", async () => {
	const actual = await vi.importActual("../context/AuthContext");

	return {
		...actual,
		useSession: vi.fn(),
	};
});

const mockGetOrders = getOrders as Mock;
const mockUseSession = useSession as Mock;
const mockOrders = [
  {
    id: "8ec7f60d-1f8e-494d-abb8-56d09ab180d0",
    customer: {
      id: "7d9e35be-e87b-4a98-b1ba-8d12e3e20a0c",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
    products: [
      {
        id: "9ce0b1a8-7b22-4f2f-b8cb-fc9c5b548474",
        name: "Headphones",
        price: 149.99,
        quantity: 1,
      },
      {
        id: "bba23f80-2a09-4423-8b9c-3d56b9a8c5e1",
        name: "Music Subscription",
        price: 9.99,
        quantity: 12,
      },
    ],
    total: 269.87,
    status: "shipped",
    orderDate: "2023-10-10T09:15:00Z",
    shippingAddress: {
      street: "789 Oak Rd",
      city: "Somewhere",
      state: "TX",
      zipCode: "54321",
      country: "USA",
    },
    paymentMethod: "credit_card",
  },
];

describe("useOrders", () => {
  it("Optener las ordenes", async () => {
		mockGetOrders.mockResolvedValue(mockOrders);
		mockUseSession.mockReturnValue({ user: { id: "1" } });

		const { result } = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.orders).toEqual(mockOrders);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
	});
});
