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


  return (
    <div className='menu'>
      <AddCategory stateCategory={stateCategory} setStateCategory={setStateCategory} />
      <Header jsondata={menuData} />
      <Spacer />
      {stateCategory.map((menu, index) => (
        <MenuSection
          key={index}
          menu={menu}                      // ← Pasa TODO el objeto
          index={index}                    // ← El índice aparte
          onDeleteCategory={deleteCategory}
        />
      ))}

      <Spacer />
      <Footer />
    </div>
  )
}

export default App