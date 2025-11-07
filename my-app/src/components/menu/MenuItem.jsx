import { useState } from "react"
import ModifyItem from "../item/ModifyItem"
import RemoveItem from "../item/RemoveItem"
import { updateProducto } from "../../services/api";

function MenuItem({ itemId, name, price, loadData }) {
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
        updateProducto(itemId, inputNameValue, inputPriceValue)
            .then(() => {
                loadData();
            })
            .catch(error => {
                console.error('Error updating product:', error);
                alert('Error al actualizar el producto');
            });
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
                    itemId={itemId}
                    loadData={loadData}
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
