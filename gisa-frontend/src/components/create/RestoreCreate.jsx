import React, { useState } from 'react';
import axios from 'axios';
import CategorySelect from './CategorySelect';
import Answers from './Answers';
import Photos from './Photos';
import NumInput from './NumInput';
import TitleInput from './TitleInput';

const RestoreCreate = () => {
    const [restore, setRestore] = useState({
        num: '',
        title: '',
        category: '',
        answers: [{ name: '' }],
        photos: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRestore({ ...restore, [name]: value });
    };

    const handleAnswerChange = (index, event) => {
        const newAnswers = restore.answers.map((answer, i) => {
            if (i !== index) return answer;
            return { ...answer, name: event.target.value };
        });
        setRestore({ ...restore, answers: newAnswers });
    };

    const handleAddAnswer = () => {
        setRestore({
            ...restore,
            answers: [...restore.answers, { name: '' }],
        });
    };

    const handlePhotoChange = (e) => {
        setRestore({ ...restore, photos: [...restore.photos, ...e.target.files] });
    };

    const handleCategoryChange = (e) => {
        setRestore({ ...restore, category: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('num', restore.num);
        formData.append('title', restore.title);
        formData.append('category', restore.category);

        restore.answers.forEach((answer, index) => {
            formData.append(`answers[${index}].name`, answer.name);
        });

        restore.photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });

        try {
            const response = await axios.post('/api/manager/category/version/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Restore created successfully:', response.data);
        } catch (error) {
            console.error('Error creating restore:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <NumInput num={restore.num} onInputChange={handleInputChange} />
            <TitleInput title={restore.title} onInputChange={handleInputChange} />
            <CategorySelect
                selectedCategory={restore.category}
                onCategoryChange={handleCategoryChange}
            />
            <Answers
                answers={restore.answers}
                onAnswerChange={handleAnswerChange}
                onAddAnswer={handleAddAnswer}
            />
            <Photos onPhotoChange={handlePhotoChange} />
            <button type="submit">Create Restore</button>
        </form>
    );
};

export default RestoreCreate;
