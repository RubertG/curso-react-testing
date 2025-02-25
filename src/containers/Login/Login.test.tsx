import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import { Login } from "./Login";
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});


vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn()
}));

const mockNavigate = vi.fn();
const mockGetAuth = getAuth as Mock;

describe("<Login />", () => {
  beforeEach(() => {
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    )
  });

  it("Deberia mostrar un mensaje de error", async () => {
    const errorMessage = "Invalid credentials";

    mockGetAuth.mockRejectedValueOnce(new Error(errorMessage));
    const userNameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await act(async () => {
      fireEvent.change(userNameInput, { target: { value: "asdasd" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(submitButton);
    })

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("Deberia redirigir a /orders", async () => {
    mockGetAuth.mockResolvedValue({ success: true });

    const userNameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await act(async () => {
      fireEvent.change(userNameInput, { target: { value: "validUser" } });
      fireEvent.change(passwordInput, { target: { value: "validPassword" } });
      fireEvent.click(submitButton);
    })

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith("validUser", "validPassword");
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
    });
  });

  it("Deberia mostrar la contraseña", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    const showPasswordButton = screen.getByRole("button", { name: "show" });

    await act(async () => {
      fireEvent.click(showPasswordButton);
    })

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(showPasswordButton).toHaveTextContent("hide");
  })
});