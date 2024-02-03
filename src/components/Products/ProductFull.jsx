import { useContext, useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom';
import { getProduct } from "../../services/ProductService";
import { isValidURL } from "../../utils/validators";
import Errors from "../Errors/Errors";

function ProductFull(props) {
  
  const [product, setProduct] = useState({})
  const [errors, setErrors] = useState([])
  const { id } = useParams();  

  useEffect(() => {
    getProduct(id)
      .then((response) => {
        if (!response.ok) {
            response.json().then(data => {                        
                setErrors([data.message]);
            });                    
            throw new Error('Network response was not ok');                    
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
  }, []);


  let rendered = ""
  if (product.id !== undefined) {
    rendered = <div className="product full">    
      <div className="category">
        {product.category.name}
      </div>
      <h2 className="title">{product.title}</h2>
      <div className="two-cols">
        <div className="col">
          <div className="images">
            {
              product.images.map((image, i) => {
                let zimage = image;
                if (isValidURL(image) === false) {
                  try {
                    zimage = JSON.parse(image);
                  } catch (error) {
                    zimage = "https://via.placeholder.com/640"
                  }
                }
                return <img src={zimage} key={i} />
              })
            }        
          </div>
        </div>
        <div className="col">
          <div className="description">
            {product.description}
          </div>
          <div className="price">
            <label htmlFor="">Price:</label>
            <span className="value">${product.price}</span>
          </div>          
          <div className="actions">
            <Link className="btn" to={`/product/${product.id}/edit`}>Edit</Link>
          </div>
        </div>
      </div>          
    </div>
  }
    
  return (
    <div>      
      <Errors errors={errors} />
      {
        rendered
      } 
    </div>
    
  )
}

export default ProductFull
