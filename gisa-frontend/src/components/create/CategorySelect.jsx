import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategorySelect = ({ selectedCategory, onCategoryChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/restore-categories/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div>
            <label>Category:</label>
            <select name="category" value={selectedCategory} onChange={onCategoryChange} required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name} - {category.version}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
