

 function calculateMatchScore(user1, user2) {
  const sharedInterests = user1.interests.filter(interest => user2.interests.includes(interest));
  const sharedGoals = user1.goals.filter(goal => user2.goals.includes(goal));

  // Simple scoring: count the number of shared interests and goals
  const matchScore = sharedInterests.length + sharedGoals.length;
  return matchScore;
}



export function findMatches(currentUser, allUsers) {
  const matches = [];

  allUsers.forEach(user => {
    if (user.id !== currentUser.id) {
      const matchScore = calculateMatchScore(currentUser, user);
      matches.push({ user, matchScore });
    }
  });

  // Sort matches by match score in descending order
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}
