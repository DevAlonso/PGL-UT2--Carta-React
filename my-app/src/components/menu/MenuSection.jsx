import { useState } from 'react';
import MenuItem from './MenuItem';
import AddItem from '../item/AddItem';
import ModifyCategory from '../category/ModifyCategory';
import RemoveCategory from '../category/RemoveCategory';

function MenuSection({ menu, loadData }) {
    const [categoryChange, setCategoryChange] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [addItemState, setAddItemState] = useState(true);

    let categoryElement;

    const updateCategory = (event) => {
        setInputValue(event.target.value);
    }

    if (categoryChange) {
        categoryElement = <h2>{menu.category}</h2>;
    } else {
        categoryElement = <input type="text" value={inputValue} onChange={updateCategory} placeholder='Enter new category name' />;
    }

    return (
        <section>
            <div className='section-header'>
                {categoryElement}
                <ModifyCategory
                    categoryChange={categoryChange}
                    setCategoryChange={setCategoryChange}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    categoryId={menu.id}
                    currentCategory={menu.category}
                    loadData={loadData}
                />
                <RemoveCategory
                    categoryId={menu.id}
                    itemsCount={menu.items.length}
                    loadData={loadData}
                />
            </div>

            {menu.items.map((item) => (
                <MenuItem
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    loadData={loadData}
                />
            ))}

            <div className='category-actions'>
                <AddItem
                    addItemState={addItemState}
                    setAddItemState={setAddItemState}
                    categoriaId={menu.id}
                    loadData={loadData}
                />
            </div>
        </section>
    )
}

export default MenuSection
