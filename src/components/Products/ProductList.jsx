import Product from './ProductThumb'
import ProductFilter from './ProductFilter';
import { ProductsContext, ProductsDispatchContext } from "../../contexts/ProductsContext";
import { useContext, useEffect, useState } from "react";
import { fetchProducts } from "../../services/ProductService";

function ProductsList() {

  const products = useContext(ProductsContext);
  const dispatch  = useContext(ProductsDispatchContext);

  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProducts(filters)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })    
  }, [filters]);
  
  return (
    <div>
      <div>
        <h1>Products</h1>
        <div className="products_container">
          <ProductFilter applyFilters={setFilters} />
          <div className="products">        
            {
                products.map(product => {                
                    return <Product key={product.id} p={product}>
                    </Product>                
                })
            }
          </div>
        </div>
      </div>
    </div>    
  )
}

export default ProductsList