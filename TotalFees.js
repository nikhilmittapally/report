import React, { useState, useEffect } from 'react';

const TotalFees = ({ studentId }) => {
  // State to hold total fees data
  const [totalFeesData, setTotalFeesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch total fees data from the API when studentId prop changes
    if (studentId) {
      fetch(`http://localhost:8086/api/total-fees/${studentId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setTotalFeesData(data);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching total fees:', error);
          setError('Error fetching total fees. Please check the student ID.');
        });
    }
  }, [studentId]);

  return (
    <div>
      <h3>Total Fees:</h3>
      {error ? (
        <p>{error}</p>
      ) : totalFeesData ? (
        <div>
          <table style={{ width: '50%', margin: 'auto', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>Student ID</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>First Name</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black'}}>Last Name</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black'}}>Total Subject Fees</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid black'}}>Total Fees After Scholarship</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black' }}>{totalFeesData.studentId}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black'}}>{totalFeesData.firstName}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black'}}>{totalFeesData.lastName}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid black'}}>{totalFeesData.totalSubjectFees}</td>
                <td style={{ padding: '10px', textAlign: 'center', border:'1px solid black'}}>{totalFeesData.totalFeesAfterScholarship}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p style={{ color: 'red', marginBottom: '10px' }}>Invalid student ID, Please enter a valid student ID.</p>
        </div>
      )}
    </div>
  );
};

export default TotalFees;
