import { describe, it, expect } from "vitest";
import  { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home", () => {
    it("ajoute un produit et actualise les statistiques", async() => {
        const user = userEvent.setup();

        render(<Home />);

        await user.type(
            screen.getByLabelText(/nom/i),
            "Stylo"
        );

        await user.type(
            screen.getByLabelText(/prix/i),
            "10"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        expect(
            screen.getByText("Nombre de produits : 1")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Prix moyen : 10.00 €")
        ).toBeInTheDocument();

    });

    it("ajoute deux produits et actualise les statistiques", async() => {
        const user = userEvent.setup();

        render(<Home />);

        await user.type(
            screen.getByLabelText(/nom/i),
            "Stylo"
        );

        await user.type(
            screen.getByLabelText(/prix/i),
            "10"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        await user.type(
            screen.getByLabelText(/nom/i),
            "Gants"
        );

        await user.type(
            screen.getByLabelText(/prix/i),
            "20"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        expect(
            screen.getByText("Nombre de produits : 2")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Prix moyen : 15.00 €")
        ).toBeInTheDocument();

    });

    it("modifie le prix d'un produit et actualise les statistiques", async() => {
        const user = userEvent.setup();

        render(<Home />);

        await user.type(
            screen.getByLabelText(/nom/i),
            "Stylo"
        );
        
        await user.type(
            screen.getByLabelText(/prix/i),
            "10"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        await user.type(
            screen.getByLabelText(/nom/i),
            "Gants"
        );

        await user.type(
            screen.getByLabelText(/prix/i),
            "20"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        const gloves = screen
        .getAllByRole("listitem")
        .find((item) => item.textContent?.includes("Gants"));

        if(!gloves) {
            throw new Error("Produit Gants introuvable");
        }

        const editButton = within(gloves!).getByRole("button", { name: /Modifier/i });

        await user.click(editButton);

        const priceInput = within(gloves!).getByRole("spinbutton");

        await user.clear(priceInput);
        await user.type(priceInput, "40");

        const saveButton = within(gloves!).getByRole("button", { name: /Enregistrer/i });

        await user.click(saveButton);

        expect(
            screen.getByText("Nombre de produits : 2")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Prix moyen : 25.00 €")
        ).toBeInTheDocument();

        const updatedGloves = within(gloves!).getByText(/Gants - 40/);

        expect(updatedGloves).toBeInTheDocument();
        

    });

    it("supprime un produit et actualise les statistiques", async() => {
        const user = userEvent.setup();

        render(<Home />);

        await user.type(
            screen.getByLabelText(/nom/i),
            "Stylo"
        );

        await user.type(
            screen.getByLabelText(/prix/i),
            "10"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        await user.type(
            screen.getByLabelText(/nom/i),
            "Gants"
        );

        await user.type(
            screen.getByLabelText(/prix/i),
            "20"
        );

        await user.click(
            screen.getByRole("button", { name: /Créer le produit/i })
        );

        const gloves = screen
            .getAllByRole("listitem")
            .find((item) => item.textContent?.includes("Gants"));
        
        if(!gloves) {
            throw new Error("Produit Gants introuvable");
        }

        const deleteButton = within(gloves!).getByRole("button", { name: /Supprimer/i });

        await user.click(deleteButton);

        expect(
            screen.getByText("Nombre de produits : 1")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Prix moyen : 10.00 €")
        ).toBeInTheDocument();

        expect(
            screen.queryByText(/Gants - 20/)
        ).not.toBeInTheDocument();

    });

});