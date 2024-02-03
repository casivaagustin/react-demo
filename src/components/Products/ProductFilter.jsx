import CategoriesDropDown from "../Categories/CategoriesDropDown";
import React, { useState, useContext } from "react";
import './Products.scss';


function ProductsFilter({applyFilters}) {
    
    const [formData, setFormData] = useState({
        title: "",
        categoryId: "",
        price_min: 0,
        price_max: 10000
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (evt) => {        
        evt.preventDefault();
        applyFilters(formData);
    };

    const handleClear = (evt) => {
        evt.preventDefault();
        setFormData({
            title: "",
            categoryId: "",
            price_min: 0,
            price_max: 10000
        });
        applyFilters({
            title: "",
            categoryId: "",
            price_min: 0,
            price_max: 10000
        });
    }

    const updateCategory = (categoryId) => {
        setFormData((prevData) => ({
            ...prevData,
            categoryId
        }));
    }

    return (
        <div className="formFilter">                            
            <form className="ProductFilter" onSubmit={handleSubmit}>
                <div className="categoryFilter">            
                    <div className="control">
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                    </div>
                    <div className="control">
                        <label htmlFor="">Price Min:</label>
                        <input type="text" name="price_min" value={formData.price_min} onChange={handleChange}/>
                    </div>
                    <div className="control">
                        <label htmlFor="">Price Max:</label>
                        <input type="text" name="price_max" value={formData.price_max} onChange={handleChange}/>
                    </div>
                    <div className="control">
                        <CategoriesDropDown selectedCategory={formData.categoryId} handleChange={handleChange}/>                        
                    </div>
                    <div className="control actions">                        
                        <button className='btn'>Filter</button>
                        <button className='btn danger' onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductsFilter