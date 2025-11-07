import { deleteProducto } from "../../services/api";

export default function RemoveItem({ itemId, loadData }) {
    
    const handleDelete = () => {
        deleteProducto(itemId)
            .then(() => {
                loadData();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Error al eliminar el producto');
            });
    };

    return (
        <button className="delete-button" onClick={handleDelete}></button>
    )
}
