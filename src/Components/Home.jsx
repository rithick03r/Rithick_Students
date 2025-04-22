import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'COURSE TYPES',
      text: 'Edit Individual, Group or Special Course Types',
      path: '/courseTypes',
    },
    {
      title: 'COURSES',
      text: 'Modify Courses like English, Urdu, Hindi, etc.',
      path: '/courses',
    },
    {
      title: 'COURSE OFFERINGS',
      text: 'Modify Courses associated with Course Types',
      path: '/courseOfferings',
    },
    {
      title: 'STUDENT REGISTRATIONS',
      text: 'Allow Students to register for Course Offerings',
      path: '/studentRegistrations',
    },
  ];

  return (
    <div className="cards-container">
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="card"
            onClick={() => navigate(card.path)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
