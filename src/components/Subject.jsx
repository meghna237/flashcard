import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/subjects');
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                alert('Failed to load subjects. Please try again later.');
            }
        };

        fetchSubjects();
    }, []);

    const handleAddSubject = async () => {
        if (!newSubject) {
            alert('Please enter a subject name.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/subjects', {
                name: newSubject,
            });

            if (response.data.success) {
                setSubjects([...subjects, response.data.subject]); // Add the new subject to the list
                setNewSubject(''); // Clear the input field
            } else {
                alert('Failed to add subject.');
            }
        } catch (error) {
            console.error('Error adding subject:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Select a Subject</h2>
                <div>
                    <input 
                        type="text" 
                        placeholder="New Subject" 
                        value={newSubject} 
                        onChange={(e) => setNewSubject(e.target.value)} 
                    />
                    <button onClick={handleAddSubject}>Add Subject</button>
                </div>
            </div>
            {subjects.map((subject) => (
                <button key={subject._id} onClick={() => handleSubjectClick(subject.name)}>
                    {subject.name}
                </button>
            ))}
        </div>
    );
}

const handleSubjectClick = (subjectName) => {
    alert(`You selected ${subjectName}`);
    // Implement further actions on subject click, such as redirecting to another page
};

export default Subjects;
