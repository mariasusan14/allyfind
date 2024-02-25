import { useState, useEffect } from 'react';
import { db, auth } from '../src/config/firebase';
import { getDocs } from '@firebase/firestore';
//import { getDoc, collection } from 'firebase/firestore';


  /*const [bestMatch, setBestMatch] = useState(null);

  const findBestMatch = async () => {
    try {
      const userId = auth.currentUser.uid;

      // Step 1: Retrieve Current User Details using getDoc
      const currentUserDetailsRef = collection(db, 'details', userId);
      const currentUserDetailsSnap = await getDoc(currentUserDetailsRef);
      const currentUserDetails = currentUserDetailsSnap.data();
      const currentUserQualities = currentUserDetails.partnerQualities;
      
      // Step 2: Find Potential Partners using getDoc
      const potentialPartnersSnapshot = await getDoc(collection(db, 'details'));

      // Step 3: Calculate Matching Scores
      let bestMatchUserId = null;
      let maxMatchingScore = 0;

      potentialPartnersSnapshot.forEach(partnerDoc => {
        const partnerQualities = partnerDoc.data().userQualities;

        // Step 4: Calculate Matching Score
        const intersection = currentUserQualities.filter(quality => partnerQualities.includes(quality));
        const matchingScore = intersection.length;
        // Step 5: Find the Best Match
        if (matchingScore > maxMatchingScore) {
          maxMatchingScore = matchingScore;
          bestMatchUserId = partnerDoc.data().userId;
        }
      });

      setBestMatch(bestMatchUserId);
    } catch (error) {
      console.error('Error finding the best match:', error);
    }
  };

  useEffect(() => {
    findBestMatch();
  }, []); // Empty dependency array ensures that the effect runs only once after the component mounts

  const handleGoToStudyRoom = () => {
    // Add logic to navigate to the study room or perform other actions
    console.log('Navigating to study room for:', bestMatch);
  }; */
export const CalculateMatchScore = () => {
    const [userIds, setUserIds] = useState([]);
    const detailsref=collection(db,'details');
    useEffect(() => {
      const fetchUserIds = async () => {
        try {
          const detailsSnapshot = await getDocs(detailsref);
          const userIdsData = detailsSnapshot.docs.map((doc) => ({
             ...doc.data().userId,
             id: doc.id
          }));
          setUserIds(userIdsData);
        } catch (error) {
          console.error('Error fetching userIds:', error);
        }
      };
  
      fetchUserIds();
    }, [detailsref]);
   const bestMatch=userIds[2];
  return (
    <div>
      {userIds.map((ids)=>{
        <div>
          <h1>{ids.user.Id}</h1>
        </div>
      })}
    </div>
  );
      }

    