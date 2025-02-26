import { describe, it, expect, vi, Mock } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { Orders } from "./Orders";
import { Role, SessionProvider, useSession } from "../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { getOrders } from "../../services/getOrders";
import { getSummaryOrders } from "../../utils/sumamry";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("../../services/getOrders", () => ({
  getOrders: vi.fn()
}));

vi.mock("../../context/AuthContext", async () => {
  const actual = await vi.importActual("../../context/AuthContext");

  return {
    ...actual,
    useSession: vi.fn()
  };
});

const mockNavigate = vi.fn();
const mockGetOrders = getOrders as Mock;
const mockOrders = [
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "customer": {
      "id": "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "products": [
      {
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "name": "Laptop",
        "price": 999.99,
        "quantity": 1
      },
      {
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        "name": "Mouse",
        "price": 29.99,
        "quantity": 1
      }
    ],
    "total": 1029.98,
    "status": "delivered",
    "orderDate": "2023-10-01T10:00:00Z",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345",
      "country": "USA"
    },
    "paymentMethod": "credit_card"
  }
]

describe("<Orders />", () => {
  const handleRenderOrders = (userRole: Role | null) => {
    const mockUser = userRole ? { role: userRole } : null;
    (useSession as Mock).mockReturnValue({ user: mockUser });

    render(
      <SessionProvider>
        <MemoryRouter>
          <Orders />
        </MemoryRouter>
      </SessionProvider>
    )
  }

  it("Deberia renderizar el componente", async () => {
    mockGetOrders.mockResolvedValue(mockOrders);
    handleRenderOrders("visualizer");

    await waitFor(() => {
      const orders = screen.getAllByRole("heading", { level: 3 });
      expect(orders).toHaveLength(1);
    });
  });

  it("Deberia redirigir al usuario a la pagina de inicio si no esta autenticado", async () => {
    handleRenderOrders(null);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("Deberia mostrar seccion para super admins", async () => {
    mockGetOrders.mockResolvedValue(mockOrders);
    handleRenderOrders("superadmin");

    await waitFor(() => {
      const { totalOrders, averageOrderValue, totalValue, ordersByStatus } = getSummaryOrders(mockOrders);
      const totalOrdersElement = screen.getByTestId("totalOrders").textContent;
      const totalValueElement = screen.getByTestId("totalValue").textContent;
      const averageOrderValueElement = screen.getByTestId("averageOrderValue").textContent;

      for (const [status, count] of Object.entries(ordersByStatus)) {
        const statusElement = screen.getByTestId(status).textContent;
        expect(statusElement).toBe(count.toString());
      }

      expect(totalValueElement).toBe(`$${totalValue.toFixed(2)}`);
      expect(averageOrderValueElement).toBe(`$${averageOrderValue.toFixed(2)}`);
      expect(totalOrdersElement).toBe(totalOrders.toString());
    });
  })
});
