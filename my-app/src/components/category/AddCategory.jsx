import { useState } from "react"
import { addCategoria } from "../../services/api";

export default function AddCategory({ reloadCategories }) {
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);

    const updateText = (event) => {
        setInputText(event.target.value);
    };

    const addNewCategory = async () => {
        if (inputText.trim() === "") return;

        try {
            setLoading(true);
            await addCategoria(inputText);
            
            // Limpiar input
            setInputText("");
            
            // Recargar solo las categorías
            await reloadCategories();
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Error al añadir la categoría');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input className="input-category"
                type="text"
                placeholder="New Category"
                value={inputText}
                onChange={updateText}
                disabled={loading}
            />
            <button onClick={addNewCategory} disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>
        </>
    )
}
