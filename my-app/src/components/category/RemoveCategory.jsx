import { deleteCategoria, getProductos, deleteProducto } from "../../services/api";

export default function RemoveCategory({ categoryId, itemsCount, loadData }) {

    const deleteCategoryHandler = () => {
        if (itemsCount > 0) {
            const confirmDelete = window.confirm("This category has items. Delete anyway?");
            if (!confirmDelete) return;

            getProductos(categoryId)
                .then(productosResponse => {
                    if (productosResponse.status === 'success' && productosResponse.data.length > 0) {
                        const deletePromises = productosResponse.data.map(producto => 
                            deleteProducto(producto.id)
                        );
                        
                        return Promise.all(deletePromises);
                    }
                })
                .then(() => {
                    return deleteCategoria(categoryId);
                })
                .then(() => {
                    loadData();
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    alert('Error al eliminar la categoría');
                });
        } else {
            deleteCategoria(categoryId)
                .then(() => {
                    loadData();
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    alert('Error al eliminar la categoría');
                });
        }
    };

    return (
        <button className="delete-button" onClick={deleteCategoryHandler}></button>
    )
}
