export default function RemoveCategory({ categoryIndex, itemsCount, onDeleteCategory }) {

    const deleteCategory = () => {
        if (itemsCount > 0) {
            const confirmDelete = window.confirm("This category has items. Delete anyway?");
            if (!confirmDelete) return;
        }

        onDeleteCategory(categoryIndex);
    };

    return (
        <button className="delete-button" onClick={deleteCategory}></button>)
}