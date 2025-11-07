import './App.css'
import Header from './components/layout/Header';
import MenuSection from './components/menu/MenuSection';
import Footer from './components/layout/Footer';
import Spacer from './components/layout/Spacer';
import AddCategory from './components/category/AddCategory';
import { useState, useEffect } from 'react';
import { getCategorias, getProductos } from './services/api';

function App() {
  const [stateCategory, setStateCategory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getCategorias()
      .then(response => {
        if (response.status === 'success') {
          const categorias = response.data;
          
          Promise.all(
            categorias.map(cat => {
              return getProductos(cat.id)
                .then(productosResponse => {
                  const productos = productosResponse.status === 'success' ? productosResponse.data : [];
                  
                  return {
                    id: cat.id,
                    category: cat.nombre,
                    items: productos.map(prod => ({
                      id: prod.id,
                      name: prod.nombre,
                      price: prod.precio.toString(),
                      categoria_id: cat.id
                    }))
                  };
                })
                .catch(error => {
                  console.error('Error loading products:', error);
                  return {
                    id: cat.id,
                    category: cat.nombre,
                    items: []
                  };
                });
            })
          ).then(categoriasConProductos => {
            setStateCategory(categoriasConProductos);
          });
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
        alert('Error al cargar los datos');
      });
  };

  return (
    <div className='menu'>
      <AddCategory loadData={loadData} />
      <Header />
      <Spacer />
      {stateCategory.map((menu) => (
        <MenuSection
          key={menu.id}
          menu={menu}
          loadData={loadData}
        />
      ))}
      <Spacer />
      <Footer />
    </div>
  )
}

export default App
