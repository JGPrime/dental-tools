import type { Product } from '@/lib/types';
import { useState } from 'react';

type ProductListProps = {
    products: Product[];
    onRemoveProduct: (productId: number) => void;
    updateProduct: (productId: number, updatePrice: number) => void;
};

export default function ProductList({
    products,
    onRemoveProduct,
    updateProduct,
}: ProductListProps) {

    const [editingId, setEditingId] = useState<number | null>(null);
    const [updatePrice, setUpdatePrice] = useState("");

    function handleEdit(product: Product) {
        setEditingId(product.id);
        setUpdatePrice(String(product.price));
    }

    function handleSave(productId: number) {
        const price = Number(updatePrice);

        if(updatePrice.trim() === "" || !Number.isFinite(price) || price < 0) {
            return;
        }

        updateProduct(productId, price);;
        setEditingId(null);
        setUpdatePrice("");
    }

    return (
        <div>
            <h2>Liste des produits</h2>
            {products.length === 0 ? (
                <p>Aucun produit disponible.</p>
            ) : (
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} €
                        {editingId === product.id ? (
                            <>
                                <input 
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={updatePrice} 
                                    onChange={(e) => setUpdatePrice(e.target.value)} 
                                />
                                <button onClick={() => handleSave(product.id)}>Enregistrer</button>
                                <button onClick={() => setEditingId(null)}>Annuler</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleEdit(product)}>Modifier</button>
                                <button onClick={() => onRemoveProduct(product.id)}>Supprimer</button>
                            </>
                        )}
                    </li>
                    
                )
                )}
                
            </ul>
            )}
        </div>
    );
}