import { Link } from "react-router-dom"
import './NavBar.scss'

export default function NavBar () {
  return (
    <div className='navbar'>
      <div className="item brand">
        Platzi Products
      </div>
      <div className="item">
          <Link to='/'>Home</Link> 
      </div>
      <div className="item">
          <Link to='/product/add'>Add Product</Link>
      </div>
    </div>
  )
}