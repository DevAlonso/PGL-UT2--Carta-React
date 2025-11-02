import { useState } from "react"

export default function AddCategory({ stateCategory, setStateCategory }) {
    const [inputText, setInputText] = useState("");

    const updateText = (event) => {
        setInputText(event.target.value);
    };

    const addNewCategory = () => {
        if (inputText.trim() === "") return;

        const categoryToAdd = {
            category: inputText,
            icon: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
            items: []
        };

        setStateCategory([...stateCategory, categoryToAdd]);
        setInputText("");
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
