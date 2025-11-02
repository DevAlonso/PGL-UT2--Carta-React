import { useState } from "react";

export default function AddItem({ addItemState, setAddItemState, categoryIndex, setStateCategory }) {
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
        setStateCategory((prevState) => {
            let maxId = 0;

            prevState.forEach(category => {
                category.items.forEach(item => {
                    if (item.id > maxId) {
                        maxId = item.id;
                    }
                });
            });

            const newId = maxId + 1;


            const itemToAdd = {
                id: newId,
                name: inputName,
                price: inputPrice
            };

            const updated = [...prevState];
            updated[categoryIndex].items.push(itemToAdd);
            return updated;
        });

        setInputName("");
        setInputPrice("");
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