import './App.css'
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import Spacer from './components/Spacer';
import menuData from './components/JsonData';
import AddCategory from './components/AddCategory';
import { useState } from 'react';

function App() {
  const [stateCategory, setStateCategory] = useState(menuData);
  
  const deleteCategory = (indexToDelete) => {
    setStateCategory(stateCategory.filter((_, i) => i !== indexToDelete));
  }
  
  const deleteItem = (categoryIndex, itemId) => {
    setStateCategory(prevState => {
      const newState = [...prevState];
      newState[categoryIndex].items = newState[categoryIndex].items.filter(
        item => item.id !== itemId
      );
      return newState;
    });
  }

  return (
    <div className='menu'>
      <AddCategory stateCategory={stateCategory} setStateCategory={setStateCategory} />
      <Header />
      <Spacer />
      {stateCategory.map((menu, index) => (
        <MenuSection
          key={index}
          menu={menu}
          index={index}
          onDeleteCategory={deleteCategory}
          onDeleteItem={deleteItem}
          setStateCategory={setStateCategory}
          stateCategory={stateCategory}
        />
      ))}
      <Spacer />
      <Footer />
    </div>
  )
}

export default App
