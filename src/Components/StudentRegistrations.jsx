import React, { useState } from 'react';

function StudentRegistrations({ courses, courseTypes, courseOfferings }) {
  const [registrations, setRegistrations] = useState([]);
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');

  const getCourseTypeName = (id) => {
    const ct = courseTypes.find(ct => ct.id === id);
    return ct ? ct.name : '';
  };

  const getCourseName = (id) => {
    const c = courses.find(c => c.id === id);
    return c ? c.name : '';
  };

  const getOfferingName = (offering) => {
    return `${getCourseTypeName(offering.courseTypeId)} - ${getCourseName(offering.courseId)}`;
  };

  const handleRegister = () => {
    setError('');
    if (!selectedOfferingId) {
      setError('Please select a course offering.');
      return;
    }
    if (!studentName.trim()) {
      setError('Student name cannot be empty.');
      return;
    }

    // Check if student already registered for this offering
    if (registrations.some(r => r.offeringId === parseInt(selectedOfferingId) && r.studentName.toLowerCase() === studentName.trim().toLowerCase())) {
      setError('Student already registered for this course offering.');
      return;
    }

    const offering = courseOfferings.find(co => co.id === parseInt(selectedOfferingId));
    const courseName = getCourseName(offering.courseId);
    const courseTypeName = getCourseTypeName(offering.courseTypeId);

    const newRegistration = {
      id: Date.now(),
      offeringId: parseInt(selectedOfferingId),
      studentName: studentName.trim(),
      courseName,
      courseTypeName,
    };

    setRegistrations([...registrations, newRegistration]);
    setStudentName('');
    setSelectedOfferingId('');
  };

  return (
    <div className="content-card">
      <h2>Student Registrations</h2>

      <div style={{ marginBottom: '30px' }}>
        <label>Select Course Offering:</label>
        <select className="form-select" value={selectedOfferingId} onChange={(e) => setSelectedOfferingId(e.target.value)}>
          <option value="">Select Offering</option>
          {courseOfferings.map(co => (
            <option key={co.id} value={co.id}>{getOfferingName(co)}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label>Student Name:</label>
        <input
          type="text"
          className="form-control"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student name"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <button className="btn btn-primary" onClick={handleRegister} style={{ width: '80px', height: '30px' }}>
          Register
        </button>
      </div>
      {error && <div className="text-danger mb-3">{error}</div>}

      {registrations.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h4>Registered Students</h4>
            <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>ID</th>
                <th style={{ padding: '10px' }}>Student Name</th>
                <th style={{ padding: '10px' }}>Course Type</th>
                <th style={{ padding: '10px' }}>Course Offering</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r, index) => (
                <tr key={r.id}>
                  <td style={{ padding: '10px' }}>{index + 1}</td>
                  <td style={{ padding: '10px' }}>{r.studentName}</td>
                  <td style={{ padding: '10px' }}>{r.courseTypeName}</td>
                  <td style={{ padding: '10px' }}>{r.courseName}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentRegistrations;
