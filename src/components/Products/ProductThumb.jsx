import { Link } from "react-router-dom"
import { isValidURL } from "../../utils/validators"

function Product(props) {
  
  let image = props.p.images[0];
  if (isValidURL(props.p.images[0]) === false) {
    try {
      image = JSON.parse(image);
    } catch (error) {
      image = "https://via.placeholder.com/640"
    }
  }
  
  return (
    <div className="product">    
      <div className="category">
        <Link to={`/category/${props.p.id}`}>
          {props.p.category.name}
        </Link>         
      </div>
      <h2 className="title">
        <Link to={`/product/${props.p.id}`}>
          {props.p.title}
        </Link>               
      </h2>
      <div className="image">
        <Link to={`/product/${props.p.id}`}>
          <img src={image} />
        </Link>
      </div>
      <div className="price">
        <label htmlFor="">Price:</label><span className="value">${props.p.price}</span>
      </div>
    </div>
  )
}

export default Product
