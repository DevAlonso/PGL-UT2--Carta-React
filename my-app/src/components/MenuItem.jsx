import { useState } from "react"
import ModifyItem from "./ModifyItem"
import RemoveItem from "./RemoveItem"

function MenuItem({ categoryIndex, itemId, name, price, onDeleteItem, setStateCategory,itemIndex }) {
    const [modifyItem, setModifyItem] = useState(true);
    const [inputNameValue, setInputNameValue] = useState(name);
    const [inputPriceValue, setInputPriceValue] = useState(price);


    let itemElement;
    const updateName = (event) => {
        setInputNameValue(event.target.value);
    };
    const updatePrice = (event) => {
        setInputPriceValue(event.target.value);
    };
    const saveNewItemValue = () => {
        setStateCategory((prevState) => {
            const updated = [...prevState]

            updated[categoryIndex].items[itemIndex].name = inputNameValue;
            updated[categoryIndex].items[itemIndex].price = inputPriceValue;

            return updated
        })
    }

    if (modifyItem) {
        itemElement = <div className="item-container">
            <p className="name">{name}</p>
            <p className="price">{price}</p>
        </div>
    } else {
        itemElement = <div className="item-container">
            <input type="text" value={inputNameValue} onChange={updateName} placeholder="Enter new name" />
            <input type="text" value={inputPriceValue} onChange={updatePrice} placeholder="Enter new price" />
        </div>
    }

    return (
        <article className="item">
            {itemElement}
            <div>
                <RemoveItem
                    categoryIndex={categoryIndex}
                    itemId={itemId}
                    onDeleteItem={onDeleteItem}
                />
                <ModifyItem
                    modifyItem={modifyItem}
                    setModifyItem={setModifyItem}
                    saveNewItemValue={saveNewItemValue}
                />
            </div>
        </article>
    )
}

export default MenuItem
