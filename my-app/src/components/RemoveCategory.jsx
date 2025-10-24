export default function RemoveCategory({ categoryIndex, itemsCount, onDeleteCategory }) {
    
    const deleteCategory = () => {
        if (itemsCount > 0) {
            const confirmDelete = window.confirm("This category has items. Delete anyway?");
            if (!confirmDelete) return;  // Si cancela, no hace nada
        }
        
        onDeleteCategory(categoryIndex);
    };

    return (
        <button className="edit-button" onClick={deleteCategory}>Delete</button> )
}