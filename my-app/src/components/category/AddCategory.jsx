import { useState } from "react"
import { addCategoria } from "../../services/api";

export default function AddCategory({ loadData }) {
    const [inputText, setInputText] = useState("");

    const updateText = (event) => {
        setInputText(event.target.value);
    };

    const addNewCategory = () => {
        if (inputText.trim() === "") return;

        addCategoria(inputText)
            .then(() => {
                setInputText("");
                loadData();
            })
            .catch(error => {
                console.error('Error adding category:', error);
                alert('Error al añadir la categoría');
            });
    };

    return (
        <>
            <input className="input-category"
                type="text"
                placeholder="New Category"
                value={inputText}
                onChange={updateText}
            />
            <button onClick={addNewCategory}>Add</button>
        </>
    )
}
