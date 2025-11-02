import { useState } from "react"
import MenuItem from "./MenuItem"
import ModifyCategory from "./ModifyCategory"
import RemoveCategory from "./RemoveCategory"
import AddItem from "./AddItem";

export default function MenuSection({
    menu,
    index,
    onDeleteCategory,
    onDeleteItem,
    setStateCategory
}) {
    const [categoryChange, setCategoryChange] = useState(true);
    const [addItemState, setAddItemState] = useState(true);
    const [inputValue, setInputValue] = useState('');
    let categoryElement;


    if (categoryChange) {
        categoryElement = <h2>{menu.category}</h2>
    } else {
        categoryElement = <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    }

    return (
        <section>
            <div className="category-container">
                {categoryElement}
                <RemoveCategory
                    categoryIndex={index}
                    itemsCount={menu.items.length}
                    onDeleteCategory={onDeleteCategory}
                />
                <ModifyCategory
                    categoryChange={categoryChange}
                    setCategoryChange={setCategoryChange}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setStateCategory={setStateCategory}
                    categoryIndex={index}
                    currentCategory={menu.category}
                />
            </div>
            <img src={menu.icon} alt={menu.category} />

            {menu.items.map((item,itemIndex) => (
                <MenuItem
                    key={item.id}
                    categoryIndex={index}
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    onDeleteItem={onDeleteItem}
                    setStateCategory={setStateCategory}
                    itemIndex={itemIndex}
                />
            ))}
            <AddItem
                addItemState={addItemState}
                setAddItemState={setAddItemState}
                categoryIndex={index}
                setStateCategory={setStateCategory}
            />
        </section>
    )
}
