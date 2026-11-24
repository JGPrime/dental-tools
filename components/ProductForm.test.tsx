import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import  userEvent from "@testing-library/user-event";
import ProductForm from "./ProductForm";
import { Product } from "@/lib/types";

describe("ProductForm", () => {
    it("affiche les erreurs lorsque le formulaire est vide", async() => {
        const user = userEvent.setup();

        render(<ProductForm onAddProduct={function (product: Product): void {
            throw new Error("Function not implemented.");
        } } />);

        await user.click(
            screen.getByRole("button", { name: /créer le produit/i })
        );

        expect(
            screen.getByText("Name is required")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Price is required")
        ).toBeInTheDocument();
    });
});