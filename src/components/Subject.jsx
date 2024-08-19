import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const { userID } = useContext(UserContext);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/subjects/${userID}`);
                if (Array.isArray(response.data)) {
                    setSubjects(response.data); // Set the subjects only if it's an array
                } else {
                    setSubjects([]); // Ensure subjects is set to an empty array if the response data is not an array
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
                alert('Failed to load subjects. Please try again later.');
                setSubjects([]); // Set to empty array in case of error
            }
        };

        if (userID) {
            fetchSubjects(); // Fetch subjects only if userID is available
        }
    }, [userID]);

    const handleAddSubject = async () => {
        if (!newSubject) {
            alert('Please enter a subject name.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/subjects', {
                name: newSubject,
                userId: userID, // Include the userID when adding a new subject
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
