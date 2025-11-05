export default function ModifyItem({ modifyItem, setModifyItem, saveNewItemValue }) {
    
    const handleOnClick = () => {
        if (modifyItem) {
            setModifyItem(false)
        } else {
            saveNewItemValue();
            setModifyItem(true)
        }
    }

    return (
        <button className="modify-item" onClick={handleOnClick}></button>
    )
}
