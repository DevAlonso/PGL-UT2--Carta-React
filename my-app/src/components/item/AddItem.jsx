import { useState } from "react";
import { addProducto } from "../../services/api";

export default function AddItem({ addItemState, setAddItemState, categoriaId, loadData }) {
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");

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

    const addItem = () => {
        if (inputName.trim() === "" || inputPrice.trim() === "") {
            alert("Fields cannot be empty");
            return;
        }

        addProducto(categoriaId, inputName, inputPrice)
            .then(() => {
                setInputName("");
                setInputPrice("");
                loadData();
            })
            .catch(error => {
                console.error('Error adding product:', error);
                alert('Error al añadir el producto');
            });
    }

    if (addItemState) {
        itemElement = <button onClick={handleOnClick}>Add Item</button>;
    } else {
        itemElement = (
            <div>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={inputName}
                    onChange={updateItemName}
                />
                <input
                    type="text"
                    placeholder="Product Price"
                    value={inputPrice}
                    onChange={updateItemPrice}
                />
                <button className="add-item" onClick={handleOnClick}></button>
            </div>
        );
    }

    return <>{itemElement}</>;
}
