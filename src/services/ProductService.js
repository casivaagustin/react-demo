
export const fetchProducts = async function (filters) {    
  const params = new URLSearchParams(filters);
  return await fetch(`https://api.escuelajs.co/api/v1/products?${params}`);
}

export const createProduct = async function (product) {
  let endpoint = 'https://api.escuelajs.co/api/v1/products';
  let method = 'POST';

  if (product.id) {
    endpoint = `${endpoint}/${product.id}`;
    method = 'PUT';
  }

  return await fetch(endpoint, {
    method: method,
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const getProduct = async function (id) {
  return await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
}
