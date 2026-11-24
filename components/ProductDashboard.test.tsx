import { describe, it,  expect} from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import ProductDashboard from "./ProductDashboard";

describe("ProductDashboard", () => {
    it("affiche les statistiques par défault quand aucun produit existe", () => {
        render(<ProductDashboard products={[]} />);

        expect(screen.getByText("Nombre de produits : 0")).toBeInTheDocument();
        expect(screen.getByText("Prix moyen : 0.00 €")).toBeInTheDocument();
        
        const paragraphs = screen.getAllByRole("paragraph");

        expect(paragraphs[2]).toHaveTextContent("Aucun produit");
        expect(paragraphs[3]).toHaveTextContent("Aucun produit");

    });

    it("affiche correctement les statistiques des produits", () => {
        const products = [
            { id: 1, name: "Stylo", price: 10 },
            { id: 2, name: "Gants", price: 20 },
            { id: 3, name: "Masque", price: 30 },
        ];
        
        render(<ProductDashboard products={products} />);

        expect(screen.getByText("Nombre de produits : 3")).toBeInTheDocument();
        expect(screen.getByText("Prix moyen : 20.00 €")).toBeInTheDocument();
        expect(screen.getByText(/Masque - 30/)).toBeInTheDocument();
        expect(screen.getByText(/Stylo - 10/)).toBeInTheDocument();
    });
});