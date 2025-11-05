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
  const [loading, setLoading] = useState(true);

  // Cargar categorías y productos al inicio
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const categoriasResponse = await getCategorias();
      
      if (categoriasResponse.status === 'success') {
        const categorias = categoriasResponse.data;
        
        const categoriasConProductos = await Promise.all(
          categorias.map(async (cat) => {
            try {
              const productosResponse = await getProductos(cat.id);
              const productos = productosResponse.status === 'success' ? productosResponse.data : [];
              
              return {
                id: cat.id,
                category: cat.nombre,
                icon: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
                items: productos.map(prod => ({
                  id: prod.id,
                  name: prod.nombre,
                  price: prod.precio.toString(),
                  categoria_id: cat.id
                }))
              };
            } catch (error) {
              console.error(`Error loading products for category ${cat.id}:`, error);
              return {
                id: cat.id,
                category: cat.nombre,
                icon: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
                items: []
              };
            }
          })
        );
        
        setStateCategory(categoriasConProductos);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Recargar solo las categorías (sin productos, más rápido)
  const reloadCategories = async () => {
    try {
      const categoriasResponse = await getCategorias();
      
      if (categoriasResponse.status === 'success') {
        const categorias = categoriasResponse.data;
        
        // Mantener los productos existentes de cada categoría
        setStateCategory(prev => {
          // Crear mapa de categorías existentes con sus productos
          const existingCategories = new Map(prev.map(cat => [cat.id, cat.items]));
          
          // Actualizar con las nuevas categorías, manteniendo productos existentes
          return categorias.map(cat => ({
            id: cat.id,
            category: cat.nombre,
            icon: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
            items: existingCategories.get(cat.id) || [] // Mantener productos existentes o array vacío
          }));
        });
      }
    } catch (error) {
      console.error('Error reloading categories:', error);
    }
  };

  // Recargar solo los productos de una categoría específica
  const reloadCategoryProducts = async (categoryId) => {
    try {
      const productosResponse = await getProductos(categoryId);
      
      if (productosResponse.status === 'success') {
        const productos = productosResponse.data.map(prod => ({
          id: prod.id,
          name: prod.nombre,
          price: prod.precio.toString(),
          categoria_id: categoryId
        }));
        
        setStateCategory(prev => prev.map(cat => 
          cat.id === categoryId ? { ...cat, items: productos } : cat
        ));
      }
    } catch (error) {
      console.error('Error reloading products:', error);
    }
  };

  // Actualizar nombre de categoría en el estado local
  const updateCategoryInState = (categoryId, newName) => {
    setStateCategory(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, category: newName } : cat
    ));
  };

  // Eliminar categoría del estado local
  const deleteCategoryFromState = (categoryId) => {
    setStateCategory(prev => prev.filter(cat => cat.id !== categoryId));
  };

  if (loading) {
    return (
      <div className='menu'>
        <Header />
        <p style={{ textAlign: 'center', padding: '20px' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className='menu'>
      <AddCategory 
        reloadCategories={reloadCategories}
      />
      <Header />
      <Spacer />
      {stateCategory.map((menu) => (
        <MenuSection
          key={menu.id}
          menu={menu}
          updateCategoryInState={updateCategoryInState}
          deleteCategoryFromState={deleteCategoryFromState}
          reloadCategoryProducts={reloadCategoryProducts}
        />
      ))}
      <Spacer />
      <Footer />
    </div>
  )
}

export default App
