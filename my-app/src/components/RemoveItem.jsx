export default function RemoveItem({ categoryIndex, itemId, onDeleteItem }) {
    const handleDelete = () => {
        onDeleteItem(categoryIndex, itemId);
    };

    return (
        <button className="delete-button" onClick={handleDelete}></button>
    )
}
