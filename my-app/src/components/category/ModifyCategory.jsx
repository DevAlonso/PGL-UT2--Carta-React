import { updateCategoria } from "../../services/api";

export default function ModifyCategory({ 
    categoryChange, 
    setCategoryChange, 
    inputValue, 
    setInputValue, 
    categoryId,
    currentCategory,
    updateCategoryInState
}) {
    const renameCategory = () => {
        setInputValue(currentCategory)
        setCategoryChange(false)
    }

    let buttonName = categoryChange
    let nameButton = buttonName ? 'Modify' : 'Guardar';

    async function saveCategory() {
        if (inputValue.length === 0 || inputValue.trim() === '') {
            alert('The input is empty');
            return
        }

        try {
            await updateCategoria(categoryId, inputValue);
            // Actualizar solo el estado local
            updateCategoryInState(categoryId, inputValue);
            setInputValue('')
            setCategoryChange(true)
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error al actualizar la categoría');
        }
    }

    const applyState = () => {
        if (categoryChange) {
            renameCategory()
            return
        }
        saveCategory()
    }

    return (
        <button className='modify-button' onClick={applyState}>{nameButton}</button>
    )
}
