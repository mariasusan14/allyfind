import React, { useEffect, useState } from 'react';
import {  findMatches } from './matchingAlgorithm';

const Dashboard = ({ currentUser, allUsers }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Calculate and set matches when currentUser or allUsers change
    const userMatches = findMatches(currentUser, allUsers);
    setMatches(userMatches);
  }, [currentUser, allUsers]);

  return (
    <div>
      <h2>Your Matches</h2>
      <ul>
        {matches.map(({ user, matchScore }) => (
          <li key={user.id}>
            {user.name} - Match Score: {matchScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
