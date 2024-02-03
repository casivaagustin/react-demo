import { v4 } from 'uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":            
      return [...action.payload];
    case "ADD":
      return [...state, { id: v4(), ...action.product }];
    case "REMOVE":
      return state.filter(product => product.id !== action.product.id);
    case "EDIT":
      return state.map(product =>
        product.id === action.id ? { ...product, ...action.product } : product
      );
    default:
      return state;
  }
};

export default reducer;