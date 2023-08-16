import React, { useState, useEffect } from 'react';

const Scholarships = ({ studentId }) => {
  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch scholarship data from the API based on the provided studentId
    if (!studentId) {
      setError('Invalid student ID. Please enter a valid student ID.');
      setScholarship(null);
      return;
    }

    fetch(`http://localhost:8086/scholarships/${studentId}`)
      .then((response) => {
        if (!response.ok) {
          // Check if the response status is 404 (Not Found)
          if (response.status === 404) {
            throw new Error('No scholarships found for the student.');
          } else {
            throw new Error('Failed to fetch scholarship');
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          // If the API returns an empty array, handle the "not found" case
          throw new Error('No scholarships found for the student.');
        }
        // Assuming the API returns an array with one object
        // If the API can return multiple scholarships, you may need to handle it differently
        setScholarship(data[0]); // Take the first object from the array
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setScholarship(null);
      });
  }, [studentId]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Scholarships:</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {scholarship ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={{ width: '35%', borderCollapse: 'collapse', border: '1px solid black' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>Student ID</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>Scholarship ID</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>Scholarship Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr key={scholarship.studentId}>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>{scholarship.studentId}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>{scholarship.scholarshipId}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>{scholarship.scholarshipAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p style={{ textAlign: 'center' }}>No scholarships found for the student.</p>
      )}
    </div>
  );
};

export default Scholarships;
