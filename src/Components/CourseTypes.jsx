import React, { useState } from 'react';

function CourseTypes({ courseTypes, setCourseTypes }) {
  const [newCourseType, setNewCourseType] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!newCourseType.trim()) {
      setError('Course type name cannot be empty.');
      return;
    }
    if (courseTypes.some(ct => ct.name.toLowerCase() === newCourseType.trim().toLowerCase())) {
      setError('Course type name must be unique.');
      return;
    }
    const newId = courseTypes.length > 0 ? Math.max(...courseTypes.map(ct => ct.id)) + 1 : 1;
    setCourseTypes([...courseTypes, { id: newId, name: newCourseType.trim() }]);
    setNewCourseType('');
    setError('');
  };

  const handleDelete = (id) => {
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
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
      setError('Course type name cannot be empty.');
      return;
    }
    if (courseTypes.some(ct => ct.name.toLowerCase() === editName.trim().toLowerCase() && ct.id !== editId)) {
      setError('Course type name must be unique.');
      return;
    }
    setCourseTypes(courseTypes.map(ct => (ct.id === editId ? { ...ct, name: editName.trim() } : ct)));
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
      <h2>Course Types</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="New course type"
          value={newCourseType}
          onChange={(e) => setNewCourseType(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={handleAdd}>Add Course Type</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
      <div className="course-types-list">
        {courseTypes.map((ct) => (
          <div key={ct.id} className="course-type-item d-flex justify-content-between align-items-center">
            {editId === ct.id ? (
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
                <span>{ct.name}</span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(ct.id, ct.name)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ct.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseTypes;
