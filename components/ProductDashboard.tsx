import type { Product } from "@/lib/types";

type ProductDashboardProps = {
    products: Product[];
};

export default function ProductDashboard({
    products,
} : ProductDashboardProps) {

    const totalProducts = products.length;

    const averagePrice = totalProducts > 0 ? products.reduce((total, product) => total + product.price, 0) / totalProducts : 0;

    const mostExpensive = products.reduce<Product | null>(
        (highest, product) => highest === null || product.price > highest.price ? product : highest,
        null
    );

    const cheapest = products.reduce<Product | null>(
        (lowest, product) => lowest === null || product.price < lowest.price ? product : lowest,
        null
    );


    return (
        <section>
            <h2>Statistiques</h2>
            <p>Nombre de produits : {totalProducts}</p>
            <p>Prix moyen : {averagePrice.toFixed(2)} €</p>
            <p>
                Produit le plus cher : {" "}
                {mostExpensive
                    ? `${mostExpensive.name} - ${mostExpensive.price} €` 
                    : "Aucun produit"}
            </p>

            <p>
                Produit le moins cher : {" "}
                {cheapest 
                    ? `${cheapest.name} - ${cheapest.price} €` 
                    : "Aucun produit"}
            </p>
        </section>
    );
}

