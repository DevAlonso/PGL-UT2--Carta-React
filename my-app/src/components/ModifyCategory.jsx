export default function ModifyCategory({ categoryChange, setCategoryChange, inputValue, setInputValue, setStateCategory, categoryIndex, currentCategory }) {
    const renameCategory = () => {
        setInputValue(currentCategory)
        setCategoryChange(false)
    }
    let buttonName = categoryChange
    let nameButton = ''
    if (buttonName) {
        nameButton = 'Modify'
    } else {
        nameButton = 'Guardar'
    }

    function saveCategory() {
        if (inputValue.length === 0 || inputValue.trim() === '') {
            alert('The input is empty');
            return
        }
        setStateCategory((prevState) => {
            const updated = [...prevState];
            updated[categoryIndex].category = inputValue;
            return updated;
        });
        setInputValue('')
        setCategoryChange(true)
    }

    const applyState = () => {
        if (categoryChange) {
            renameCategory()
            return
        }
        saveCategory()
    }


    return (
        <button className='modify-button'onClick={applyState}>{nameButton}</button>
    )
}