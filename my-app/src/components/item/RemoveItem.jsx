import { deleteProducto } from "../../services/api";

export default function RemoveItem({ itemId, categoriaId, reloadCategoryProducts }) {
    
    const handleDelete = async () => {
        try {
            await deleteProducto(itemId);
            // Recargar productos de esta categoría
            await reloadCategoryProducts(categoriaId);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error al eliminar el producto');
        }
    };

    return (
        <button className="delete-button" onClick={handleDelete}></button>
    )
}
