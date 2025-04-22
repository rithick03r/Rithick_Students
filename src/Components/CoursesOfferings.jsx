import React, { useState } from 'react';

function CoursesOfferings({ courses, courseTypes, courseOfferings, setCourseOfferings }) {
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [editId, setEditId] = useState(null);
  const [editCourseTypeId, setEditCourseTypeId] = useState('');
  const [editCourseId, setEditCourseId] = useState('');
  const [error, setError] = useState('');

  // Filtered course offerings based on selected course type filter
  const [filterCourseTypeId, setFilterCourseTypeId] = useState('');

  const handleAdd = () => {
    if (!selectedCourseTypeId || !selectedCourseId) {
      setError('Please select both course type and course.');
      return;
    }
    if (courseOfferings.some(co => co.courseTypeId === parseInt(selectedCourseTypeId) && co.courseId === parseInt(selectedCourseId))) {
      setError('This course offering already exists.');
      return;
    }
    const newId = courseOfferings.length > 0 ? Math.max(...courseOfferings.map(co => co.id)) + 1 : 1;
    setCourseOfferings([...courseOfferings, {
      id: newId,
      courseTypeId: parseInt(selectedCourseTypeId),
      courseId: parseInt(selectedCourseId),
    }]);
    setSelectedCourseTypeId('');
    setSelectedCourseId('');
    setError('');
  };

  const handleDelete = (id) => {
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditCourseTypeId('');
      setEditCourseId('');
      setError('');
    }
  };

  const handleEdit = (id) => {
    const offering = courseOfferings.find(co => co.id === id);
    if (offering) {
      setEditId(id);
      setEditCourseTypeId(offering.courseTypeId.toString());
      setEditCourseId(offering.courseId.toString());
      setError('');
    }
  };

  const handleUpdate = () => {
    if (!editCourseTypeId || !editCourseId) {
      setError('Please select both course type and course.');
      return;
    }
    if (courseOfferings.some(co => co.courseTypeId === parseInt(editCourseTypeId) && co.courseId === parseInt(editCourseId) && co.id !== editId)) {
      setError('This course offering already exists.');
      return;
    }
    setCourseOfferings(courseOfferings.map(co => co.id === editId ? {
      ...co,
      courseTypeId: parseInt(editCourseTypeId),
      courseId: parseInt(editCourseId),
    } : co));
    setEditId(null);
    setEditCourseTypeId('');
    setEditCourseId('');
    setError('');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditCourseTypeId('');
    setEditCourseId('');
    setError('');
  };

  // Get names for display
  const getCourseTypeName = (id) => {
    const ct = courseTypes.find(ct => ct.id === id);
    return ct ? ct.name : '';
  };

  const getCourseName = (id) => {
    const c = courses.find(c => c.id === id);
    return c ? c.name : '';
  };

  // Filtered offerings based on filterCourseTypeId
  const filteredOfferings = filterCourseTypeId
    ? courseOfferings.filter(co => co.courseTypeId === parseInt(filterCourseTypeId))
    : courseOfferings;

  return (
    <div className="content-card">
      <h2>Course Offerings</h2>

      <div style={{ marginBottom: '30px' }}>
        <label>Filter by Course Type:</label>
        <select
          className="form-select"
          value={filterCourseTypeId}
          onChange={(e) => setFilterCourseTypeId(e.target.value)}
        >
          <option value="">All</option>
          {courseTypes.map(ct => (
            <option key={ct.id} value={ct.id}>{ct.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label>Course Type:</label>
        <select
          className="form-select"
          value={selectedCourseTypeId}
          onChange={(e) => setSelectedCourseTypeId(e.target.value)}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map(ct => (
            <option key={ct.id} value={ct.id}>{ct.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label>Course:</label>
        <select
          className="form-select"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <button className="btn btn-primary" onClick={handleAdd} style={{ width: '80px', height: '30px' }}>
          Add
        </button>
      </div>
      {error && <div className="text-danger mb-3">{error}</div>}

      <div className="course-offerings-list">
        {filteredOfferings.map(co => (
          <div key={co.id} className="course-offering-item d-flex justify-content-between align-items-center">
            {editId === co.id ? (
              <>
                <select
                  className="form-select me-2"
                  value={editCourseTypeId}
                  onChange={(e) => setEditCourseTypeId(e.target.value)}
                >
                  <option value="">Select Course Type</option>
                  {courseTypes.map(ct => (
                    <option key={ct.id} value={ct.id}>{ct.name}</option>
                  ))}
                </select>
                <select
                  className="form-select me-2"
                  value={editCourseId}
                  onChange={(e) => setEditCourseId(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span>{getCourseTypeName(co.courseTypeId)} - {getCourseName(co.courseId)}</span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(co.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(co.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesOfferings;
