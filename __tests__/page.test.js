import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../src/app/page";
import axios from "axios";

// Mocking the Card component
jest.mock("../src/components/UI/card", () => ({ account }) => (
  <div>{`Account: ${account.name}`}</div>
));

// Mocking axios
jest.mock("axios");
describe("Home", () => {
  it("displays accounts when the API call is successful", async () => {
    const mockAccounts = [
      { id: 1, name: "Account 1" },
      { id: 2, name: "Account 2" },
    ];

    // Mock the axios.get method to return a resolved Promise
    axios.get.mockResolvedValueOnce({ data: mockAccounts });

    render(<Home />);

    // Ensure the API call has been made and the accounts are rendered
    await waitFor(() => {
      expect(screen.getByText("Account: Account 1")).toBeInTheDocument();
      expect(screen.getByText("Account: Account 2")).toBeInTheDocument();
    });
  });

  it("displays 'No accounts registered!' when there are no accounts", async () => {
    // Mock the axios.get method to return an empty array
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("No accounts registered!")).toBeInTheDocument();
    });
  });
});
