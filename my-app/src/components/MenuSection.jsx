import { useState } from "react"
import MenuItem from "./MenuItem"
import ModifyCategory from "./ModifyCategory"
import RemoveCategory from "./RemoveCategory"

export default function MenuSection({ menu, index, onDeleteCategory, setStateCategory }) {
    const [categoryChange, setCategoryChange] = useState(true);
    const [inputValue, setInputValue] = useState('');
    let categoryElement;

    if (categoryChange) {
        categoryElement = <h2>{menu.category}</h2>
    } else {
        categoryElement = <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    }


    return (
        <section>
            <div className="category-container">
                {categoryElement}
                <RemoveCategory
                    categoryIndex={index}      // ← Usa el index que llega
                    itemsCount={menu.items.length}
                    onDeleteCategory={onDeleteCategory}
                />
                <ModifyCategory categoryChange={categoryChange} setCategoryChange={setCategoryChange} inputValue={inputValue} setInputValue={setInputValue} setStateCategory={setStateCategory} categoryIndex={index}
                    currentCategory={menu.category} />
            </div>
            <img src={menu.icon} alt={menu.category} />

            {menu.items.map((item, index) => (
                <MenuItem
                    key={index}
                    name={item.name}
                    price={item.price}
                />
            ))}
        </section>
    )

}