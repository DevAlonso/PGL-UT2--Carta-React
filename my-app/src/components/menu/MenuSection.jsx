import { useState } from "react"
import MenuItem from "./MenuItem"
import ModifyCategory from "../category/ModifyCategory"
import RemoveCategory from "../category/RemoveCategory"
import AddItem from "../item/AddItem";

export default function MenuSection({
    menu,
    updateCategoryInState,
    deleteCategoryFromState,
    reloadCategoryProducts
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
                    categoryId={menu.id}
                    itemsCount={menu.items.length}
                    deleteCategoryFromState={deleteCategoryFromState}
                />
                <ModifyCategory
                    categoryChange={categoryChange}
                    setCategoryChange={setCategoryChange}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    categoryId={menu.id}
                    currentCategory={menu.category}
                    updateCategoryInState={updateCategoryInState}
                />
            </div>
            <img src={menu.icon} alt={menu.category} />

            {menu.items.map((item) => (
                <MenuItem
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    categoriaId={menu.id}
                    reloadCategoryProducts={reloadCategoryProducts}
                />
            ))}
            <AddItem
                addItemState={addItemState}
                setAddItemState={setAddItemState}
                categoriaId={menu.id}
                reloadCategoryProducts={reloadCategoryProducts}
            />
        </section>
    )
}
