import { deleteCategoria } from "../../services/api";

export default function RemoveCategory({ categoryId, itemsCount, deleteCategoryFromState }) {

    const deleteCategoryHandler = async () => {
        if (itemsCount > 0) {
            const confirmDelete = window.confirm("This category has items. Delete anyway?");
            if (!confirmDelete) return;
        }

        try {
            await deleteCategoria(categoryId);
            // Eliminar solo del estado local
            deleteCategoryFromState(categoryId);
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error al eliminar la categoría');
        }
    };

    return (
        <button className="delete-button" onClick={deleteCategoryHandler}></button>
    )
}
