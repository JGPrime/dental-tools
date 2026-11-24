"use client"

import { useState } from "react"
import type { Product } from "@/lib/types";
import { validateProduct } from "@/lib/validateProduct";
import type { FormError } from "@/lib/validateProduct";

type ProductFormProps = {
    onAddProduct: (product: Product) => void;
};

export default function ProductForm( { onAddProduct }: ProductFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        price: ""
    });

    const [touched, setTouched] = useState({
        name: false,
        price: false
    })

    const { name, price } = formData;

    const [errors, setErrors] = useState<FormError>({});
    const [successMessage, setSuccessMessage] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const nextErrors = validateProduct(name, price);

        setTouched({
            name: true,
            price: true
        });

        setErrors(nextErrors);

        if(Object.keys(nextErrors).length > 0) {
            return;
        }

        setSuccessMessage("");

        const newProduct: Product = {
            id: Date.now(),
            name: name.trim(),
            price: Number(price),
        };

        onAddProduct(newProduct);

        setFormData({
            name: "",
            price: ""
        });

        setErrors({});

        setTouched({    
            name: false,
            price: false
        });

        setSuccessMessage("Produit créé avec succès !");

    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        const nextErrors = validateProduct(
            name === "name" ? value : formData.name,
            name === "price" ? value : formData.price
        );

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        setSuccessMessage("");

        if (name === "name" || name === "price") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: nextErrors[name]
            }));
        }

    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name: fieldName } = e.target;
    
        if (fieldName !== "name" && fieldName !== "price") {
            return;
        }
    
        const nextErrors = validateProduct(name, price);
    
        setTouched((prevTouched) => ({
            ...prevTouched,
            [fieldName]: true
        }));
    
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
    
            if (nextErrors[fieldName]) {
                updatedErrors[fieldName] = nextErrors[fieldName];
            } else {
                delete updatedErrors[fieldName];
            }
    
            return updatedErrors;
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nom du produit</label>
                <input 
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}

                />
                {errors.name && touched.name &&( 
                    <p role="alert"> { errors.name}</p> 
                )}
            </div>
            <div>
                <label htmlFor="price">Prix</label>
                <input 
                    id="price"
                    name="price"
                    type="text"
                    value={price}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                />
                {errors.price && touched.price && (
                    <p role="alert">{errors.price}</p>
                )}
            </div>
            <button type="submit">Créer le produit</button>
            {successMessage && (
                <p role="status">{successMessage}</p>
            )}
        </form>
    );
}
    