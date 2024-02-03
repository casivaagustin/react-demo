import React, { createContext, useReducer } from "react";
import ProductReducer from '../reducers/ProductReducer';

export const ProductsContext = createContext();
export const ProductsDispatchContext = createContext();

export function ProductsProvider(props) {
  const [products, dispatch ] = useReducer(ProductReducer, [])
 
  return (
    <ProductsContext.Provider value={ products }>
        <ProductsDispatchContext.Provider value={dispatch}>
            {props.children}
        </ProductsDispatchContext.Provider>      
    </ProductsContext.Provider> 
  );
}