
import React, { useState } from 'react';
import Scholarships from './Scholarships';
import TotalFees from './TotalFees';
import logo from './logo.png';

const StudentDetails = () => {
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('studentDetails');

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8086/api/enrolled-courses/${studentId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setErrorMessage('Student not found.');
          setStudentDetails(null);
        } else {
          throw new Error('Failed to fetch student details.');
        }
      } else {
        const data = await response.json();
        console.log(data);
        if (data === null || data === undefined || data.length === 0) {
          setErrorMessage('Student not found.');
          setStudentDetails(null);
        } else {
          setStudentDetails(data);
          setErrorMessage('');
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching student details. Please check the student ID.');
      setStudentDetails(null);
    }
  };

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    if (tab === 'studentDetails' && studentId) {
      await fetchStudentDetails(studentId);
    }
  };

  const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid black',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  const tableCellStyle = {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid black',
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px', // Add padding to the container
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '50px',
          }}
        />
        <h1 style={{ textAlign: 'center', marginLeft: '20px' }}>Student Information System</h1>
      </div>

      <h2 style={{ textAlign: 'center' }}>Enter Student ID:</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', border: '1px solid #ccc' }}
        />
      </div>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{errorMessage}</p>}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => handleTabChange('studentDetails')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'studentDetails' ? '#007bff' : '#eee',
            color: activeTab === 'studentDetails' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
            fontSize: activeTab === 'studentDetails' ? '16px' : '14px', // Adjust font size for active tab
          }}
        >
          Student Details
        </button>
        <button
          onClick={() => handleTabChange('scholarships')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'scholarships' ? '#007bff' : '#eee',
            color: activeTab === 'scholarships' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
            fontSize: activeTab === 'scholarships' ? '16px' : '14px', // Adjust font size for active tab
          }}
        >
          Scholarships
        </button>
        <button
          onClick={() => handleTabChange('totalFees')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'totalFees' ? '#007bff' : '#eee',
            color: activeTab === 'totalFees' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: activeTab === 'totalFees' ? '16px' : '14px', // Adjust font size for active tab
          }}
        >
          Total Fees
        </button>
      </div>

      {activeTab === 'studentDetails' && (
        <div style={{ marginTop: '20px', overflowX: 'auto' }}>
          {studentDetails && studentDetails.length > 0 ? (
            <>
              <h3>Student Details:</h3>
              <p><strong>Student ID:</strong> {studentDetails[0].studentId}</p>
              <p><strong>First Name:</strong> {studentDetails[0].firstName}</p>
              <p><strong>Last Name:</strong> {studentDetails[0].lastName}</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '100%' }}>
                  <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                      <th style={tableHeaderStyle}>Subject ID</th>
                      <th style={tableHeaderStyle}>Subject Name</th>
                      <th style={tableHeaderStyle}>Grade</th>
                      <th style={tableHeaderStyle}>Academic Year</th>
                      <th style={tableHeaderStyle}>Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentDetails.map((course) => (
                      <tr key={course.subjectId}>
                        <td style={tableCellStyle}>{course.subjectId}</td>
                        <td style={tableCellStyle}>{course.subjectName}</td>
                        <td style={tableCellStyle}>{course.grade}</td>
                        <td style={tableCellStyle}>{course.academicYear}</td>
                        <td style={tableCellStyle}>{course.fees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : errorMessage ? (
            <p style={{ textAlign: 'center' }}>{errorMessage}</p>
          ) : (
            <p style={{ textAlign: 'center' }}>No student details available.</p>
          )}
        </div>
      )}

      {activeTab === 'scholarships' && <Scholarships studentId={studentId} />}

      {activeTab === 'totalFees' && <TotalFees studentId={studentId} />}
    </div>
  );
};

export default StudentDetails;