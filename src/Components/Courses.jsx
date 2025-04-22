import React, { useState } from 'react';

function Courses({ courses, setCourses }) {
  const [newCourse, setNewCourse] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!newCourse.trim()) {
      setError('Course name cannot be empty.');
      return;
    }
    if (courses.some(c => c.name.toLowerCase() === newCourse.trim().toLowerCase())) {
      setError('Course name must be unique.');
      return;
    }
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: newCourse.trim() }]);
    setNewCourse('');
    setError('');
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditName('');
      setError('');
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
    setError('');
  };

  const handleUpdate = () => {
    if (!editName.trim()) {
      setError('Course name cannot be empty.');
      return;
    }
    if (courses.some(c => c.name.toLowerCase() === editName.trim().toLowerCase() && c.id !== editId)) {
      setError('Course name must be unique.');
      return;
    }
    setCourses(courses.map(c => (c.id === editId ? { ...c, name: editName.trim() } : c)));
    setEditId(null);
    setEditName('');
    setError('');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName('');
    setError('');
  };

  return (
    <div className="content-card">
      <h2>Courses</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="New course"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={handleAdd}>Add Course</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
      <div className="courses-list">
        {courses.map((c) => (
          <div key={c.id} className="course-item d-flex justify-content-between align-items-center">
            {editId === c.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-control me-2"
                />
                <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span>{c.name}</span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c.id, c.name)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
