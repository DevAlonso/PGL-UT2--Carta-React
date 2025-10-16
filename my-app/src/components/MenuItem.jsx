function MenuItem(props){
    return (
        <article className="item">
        <p className="name">{props.name}</p>
        <p className="price">{props.price}</p>
        </article>
    )
}

export default MenuItem