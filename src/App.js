import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CourseTypes from './Components/CourseTypes';
import Courses from './Components/Courses';
import CoursesOfferings from './Components/CoursesOfferings';
import StudentRegistrations from './Components/StudentRegistrations';
import Footer from './Components/Footer';
import Home from './Components/Home';

function App() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Urdu' },
  ]);

  const [courseTypes, setCourseTypes] = useState([
    { id: 1, name: 'Individual' },
    { id: 2, name: 'Group' },
    { id: 3, name: 'Special' },
  ]);

  const [courseOfferings, setCourseOfferings] = useState([]);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="container flex-grow-1 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courseTypes"
              element={
                <CourseTypes
                  courseTypes={courseTypes}
                  setCourseTypes={setCourseTypes}
                />
              }
            />
            <Route
              path="/courses"
              element={<Courses courses={courses} setCourses={setCourses} />}
            />
            <Route
              path="/courseOfferings"
              element={
                <CoursesOfferings
                  courses={courses}
                  courseTypes={courseTypes}
                  courseOfferings={courseOfferings}
                  setCourseOfferings={setCourseOfferings}
                />
              }
            />
            <Route
              path="/studentRegistrations"
              element={
                <StudentRegistrations
                  courses={courses}
                  courseTypes={courseTypes}
                  courseOfferings={courseOfferings}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
