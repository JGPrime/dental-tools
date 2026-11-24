export type FormError = {
    name?: string;
    price?: string;
};

export function validateProduct(
    name: string,
    price: string
): FormError {
    const errors: FormError = {};

    if (name.trim() === "") {
        errors.name = "Name is required";
    }

    if (price.trim() === "") {
        errors.price = "Price is required";
    } else {
        const numericPrice = Number(price);
        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            errors.price = "Price must be a positive number";
        }
    }

    return errors;
}
