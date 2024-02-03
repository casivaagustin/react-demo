import React, { useState, useEffect } from 'react';
import { fetchCategories}  from '../../services/CategoryService';

export default function CategoriesDropDown({selectedCategory, handleChange}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])

    return (
        <div className="control">
            <label htmlFor="categoryId">Category:</label>
            <select name="categoryId" 
                    id="categoryId" 
                    onChange={handleChange}
                    value={selectedCategory}>

                (selectedCategory == "") ? <option value="">All</option> : null
                {categories.map(category => {
                    return <option value={category.id} 
                            key={category.id}>
                            {category.name}
                        </option>
                })}
            </select>
        </div>
    )
}