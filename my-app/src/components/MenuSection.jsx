import MenuItem from "./MenuItem"
import RemoveCategory from "./RemoveCategory" 

export default function MenuSection({menu, index, onDeleteCategory}){
    return(
        <section>
            <div className="category-container">
            <h2>{menu.category}</h2>
            <RemoveCategory 
                categoryIndex={index}      // ← Usa el index que llega
                itemsCount={menu.items.length}
                onDeleteCategory={onDeleteCategory}
            />
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