import MenuItem from "./MenuItem"

function MenuSection(props){
    return(
        <section>
            <h2>{props.category}</h2>
            <img src={props.icon} alt={props.category} />
            
            {props.items.map((item,index) => (
                <MenuItem
                key={index}
                name={item.name}
                price={item.price}
                />
            ))}
        </section>
        
    )

}

export default MenuSection