const API_BASE_URL = 'https://jlorenzo.ddns.net/carta_restaurante';
const USER_ID = 5273;

// ============ CATEGORÍAS ============

async function getCategorias() {
    const response = await fetch(`${API_BASE_URL}/categorias/?usuario_id=${USER_ID}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function addCategoria(nombre) {
    const response = await fetch(`${API_BASE_URL}/categorias/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

async function updateCategoria(id, nombre) {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

async function deleteCategoria(id) {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

// ============ PRODUCTOS ============

async function getProductos(categoriaId) {
    const response = await fetch(`${API_BASE_URL}/productos/${categoriaId}?usuario_id=${USER_ID}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function addProducto(categoriaId, nombre, precio) {
    const response = await fetch(`${API_BASE_URL}/productos/${categoriaId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre,
            precio: parseFloat(precio)
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

async function updateProducto(productoId, nombre, precio) {
    const response = await fetch(`${API_BASE_URL}/productos/${productoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre,
            precio: parseFloat(precio)
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

async function deleteProducto(productoId) {
    const response = await fetch(`${API_BASE_URL}/productos/${productoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

export {
    getCategorias,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getProductos,
    addProducto,
    updateProducto,
    deleteProducto
};
