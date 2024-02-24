/*import React, { useEffect, useState } from 'react';
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
*/

import { firebase } from '../src/config/firebase'; // Import your Firebase configuration

// Function to calculate match score
async function calculateMatchScore(currentUser, otherUser) {
  try {
    // Fetch interests and goals arrays for the current user
    const currentUserDetails = await firebase.firestore().collection('Details').doc(currentUser.id).get();
    const currentUserInterests = currentUserDetails.data().interests;
    const currentUserGoals = currentUserDetails.data().goals;

    // Fetch interests and goals arrays for the other user
    const otherUserDetails = await firebase.firestore().collection('Details').doc(otherUser.id).get();
    const otherUserInterests = otherUserDetails.data().interests;
    const otherUserGoals = otherUserDetails.data().goals;

    // Calculate shared interests and goals
    const sharedInterests = currentUserInterests.filter(interest => otherUserInterests.includes(interest));
    const sharedGoals = currentUserGoals.filter(goal => otherUserGoals.includes(goal));

    // Simple scoring: count the number of shared interests and goals
    const matchScore = sharedInterests.length + sharedGoals.length;
    return matchScore;
  } catch (error) {
    console.error('Error calculating match score:', error);
    return 0; // Return 0 in case of an error
  }
}

// Function to find matches for a specific user
async function findMatchesForUser(currentUser) {
  try {
    // Fetch all users from Firestore
    const usersSnapshot = await firebase.firestore().collection('Users').get();
    const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Calculate match scores for each user
    const matches = await Promise.all(
      allUsers
        .filter(user => user.id !== currentUser.id)
        .map(async user => ({ user, matchScore: await calculateMatchScore(currentUser, user) }))
    );

    // Sort users based on match score in descending order
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error('Error finding matches for user:', error);
    return [];
  }
}

// Example usage
const currentUser = {
  id: 'currentUserId',
  // ... other user properties
};

findMatchesForUser(currentUser).then(matches => {
  console.log('Matches for the current user:', matches);
});
