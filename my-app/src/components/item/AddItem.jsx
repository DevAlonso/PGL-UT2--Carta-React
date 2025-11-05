import { useState } from "react";
import { addProducto } from "../../services/api";

export default function AddItem({ addItemState, setAddItemState, categoriaId, reloadCategoryProducts }) {
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");
    const [loading, setLoading] = useState(false);

    let itemElement;

    const updateItemName = (event) => {
        setInputName(event.target.value);
    }

    const updateItemPrice = (event) => {
        setInputPrice(event.target.value);
    }

    const handleOnClick = () => {
        if (addItemState) {
            setAddItemState(false);
        } else {
            addItem();
            setAddItemState(true);
        }
    }

    const addItem = async () => {
        if (inputName.trim() === "" || inputPrice.trim() === "") {
            alert("Fields cannot be empty");
            return;
        }

        try {
            setLoading(true);
            await addProducto(categoriaId, inputName, inputPrice);
            
            // Limpiar campos
            setInputName("");
            setInputPrice("");
            
            // Recargar solo los productos de esta categoría
            await reloadCategoryProducts(categoriaId);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error al añadir el producto');
        } finally {
            setLoading(false);
        }
    }

    if (addItemState) {
        itemElement = <button onClick={handleOnClick} disabled={loading}>Add Item</button>;
    } else {
        itemElement = (
            <div>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={inputName}
                    onChange={updateItemName}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Product Price"
                    value={inputPrice}
                    onChange={updateItemPrice}
                    disabled={loading}
                />
                <button className="add-item" onClick={handleOnClick} disabled={loading}></button>
            </div>
        );
    }

    return <>{itemElement}</>;
}
