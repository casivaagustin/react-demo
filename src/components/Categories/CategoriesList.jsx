import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/CategoryService';

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
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
                setCategories(data);
            });
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    )
}