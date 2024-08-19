import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` if using React Router v6

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const { userID } = useContext(UserContext);
    const navigate = useNavigate(); // Use `useNavigate` if using React Router v6

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/subjects/${userID}`);

                if (Array.isArray(response.data)) {
                    setSubjects(response.data);
                } else {
                    setSubjects([]);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
                alert('Failed to load subjects. Please try again later.');
                setSubjects([]);
            }
        };

        fetchSubjects();
        
    }, [userID]);

    const handleAddSubject = async () => {
        if (!newSubject) {
            alert('Please enter a subject name.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/subjects', {
                name: newSubject,
                userId: userID,
            });

            if (response.data.success) {
                setSubjects([...subjects, response.data.subject]);
                setNewSubject('');
            } else {
                alert('Failed to add subject.');
            }
        } catch (error) {
            console.error('Error adding subject:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSubjectClick = (subjectId) => {
        navigate('/questions', { state: { subjectId } });
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
                <button key={subject._id} onClick={() => handleSubjectClick(subject._id)}>
                    {subject.name}
                </button>
            ))}
        </div>
    );
}

export default Subjects;
