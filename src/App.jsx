import './App.css'
import ProductList from './components/Products/ProductList'
import ProductForm from './components/Products/ProductForm'
import ProductFull from './components/Products/ProductFull'
import NavBar from './components/Navs/NavBar'
import { Routes, Route, Link } from 'react-router-dom'
import { ProductsProvider } from "./contexts/ProductsContext"
import CategoriesList from './components/Categories/CategoriesList'

function App() {
  return (
    <div>
      <NavBar />
      <ProductsProvider>
        <Routes>
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/product/add" element={<ProductForm />} />
          <Route path="/product/:id/edit" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductFull />} />
          <Route path="/" element={<ProductList />} />        
        </Routes>
      </ProductsProvider>
    </div>
  )
}

export default App
