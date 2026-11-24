import { describe, it , expect } from "vitest";
import { validateProduct } from "./validateProduct";

describe("validateProduct", () => {
    it("refuse un nom vide", () => {
        const errors = validateProduct("", "12.50");

        expect(errors.name).toBe("Name is required");
        expect(errors.price).toBeUndefined();
    });

    it("refuse un prix negatif", () => {
        const errors = validateProduct("Gants", "-5");

        expect(errors.price).toBe("Price must be a positive number");

    });

    it("accepte un produit valide", () => {
        const errors = validateProduct("Gants", "12.50");

        expect(errors).toEqual({});

    });

    
    it("refuse un prix vide", () => {
        const errors = validateProduct("Gants", "");
    
        expect(errors.price).toBe("Price is required");
    });
    
    it("refuse un prix composé uniquement d'espaces", () => {
        const errors = validateProduct("Gants", "   ");
    
        expect(errors.price).toBe("Price is required");
    });
    
    it("refuse un prix qui n'est pas numérique", () => {
        const errors = validateProduct("Gants", "abc");
    
        expect(errors.price).toBe(
        "Price must be a positive number"
        );
    });
    
    it("accepte un prix égal à zéro", () => {
        const errors = validateProduct("Gants", "0");
    
        expect(errors).toEqual({});
    });
  

});
