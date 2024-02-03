import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ProductsDispatchContext } from "../../contexts/ProductsContext";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createProduct, getProduct } from '../../services/ProductService';
import Errors from '../Errors/Errors';
import CategoriesDropDown from '../Categories/CategoriesDropDown';
import { validate } from 'uuid';

function ProductForm () {
    const [errors, setErrors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        price: 0,
        description: '',
        categoryId: '',
        images: []
    })

    useEffect(() => {
        if (typeof id === 'undefined') {
            return;
        }

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
            setFormData({
                id: data.id,
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.category.id,
                images: data.images
            });
        })
    }, []);

    const validateForm = function() {
        const errors = [];
        if (formData.title === '') {
            errors.push('Title is required');
        }
        if (formData.price === 0) {
            errors.push('Price is required');
        }
        if (formData.description === '') {
            errors.push('Description is required');
        }
        if (formData.categoryId === '' || formData.categoryId === 0) {
            errors.push('Category is required');
        }
        setErrors(errors);
        
        return errors.length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return;
        }

        createProduct(formData)
            .then(response => {                
                if (!response.ok) {
                    response.json().then(data => {
                        let e;
                        if (typeof data.message === 'string') {                            
                            e = [data.message];
                        }
                        else {
                            e = [...data.message]
                        }
                        setErrors(e);
                    });                    
                    throw new Error('Network response was not ok');                    
                }
                return response.json();
            })
            .then(data => {
                navigate('/');
            })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleChangeImage = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: [e.target.value]
        })
    }

    const actionTitle = (typeof id === 'undefined') ? 'Add' : 'Edit';

    return (
        <div>
            <h1>{actionTitle} Product</h1>
            
            <Errors errors={errors} />

            <form className="form" onSubmit={handleSubmit}>
                <div className="control">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        placeholder=""
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="control">
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="price" 
                        placeholder="Product price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="control">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="control">
                    <CategoriesDropDown selectedCategory={formData.categoryId} handleChange={handleChange}/>                    
                </div>
                <div className="control">
                    <label htmlFor="images">Images</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="images" 
                        placeholder="Product images"
                        value={formData.images}
                        onChange={handleChangeImage}
                    />  
                </div>
                <div className='actions'>
                    <button type="submit" className="btn btn-primary">{actionTitle}</button>
                </div>                
            </form>
        </div>
    )
}

export default ProductForm;