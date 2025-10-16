import './App.css'
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import Spacer from './components/Spacer';
import menuData from './components/JsonData';


function App() {

  return (
  <div className='menu'>
    <Header/>
    <Spacer/>
    {menuData.map((section,index) => (
      <MenuSection
        key={index}
        category={section.category}
        icon={section.icon}
        items={section.items}
        />
    ))}
    <Spacer/>
    <Footer/>
  </div>
  )
}

export default App