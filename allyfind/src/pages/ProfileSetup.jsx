import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection,addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase'

 function ProfileSetup() {
  const qualities = [
    { name: 'Empathy', value: 'empathy' },
    { name: 'Punctual', value: 'punctual' },
    { name: 'Open-mindedness', value: 'open-mindedness' },
    { name: 'Self-awareness', value: 'self-awareness' },
    { name: 'Humility', value: 'humility' },
    { name: 'Adaptability', value: 'adaptability' },
    { name: 'Focused', value: 'focused' },
    { name: 'Integrity', value: 'integrity' },
    { name: 'Responsibility', value: 'responsibility' },
    { name: 'Positivity', value: 'positivity' },
  ];

  const [selectedQualities, setSelectedQualities] = useState([]);
  const [partnerSelectedQualities, setPartnerSelectedQualities] = useState([]);
  const userId=auth.currentUser.uid  
  const [goal,setGoal] = useState('')

  const handleCheckboxChange = (value) => {
    if (selectedQualities.includes(value)) {
      setSelectedQualities(selectedQualities.filter((item) => item !== value));
    } else {
      setSelectedQualities([...selectedQualities, value]);
    }
  };

  const handlePartnerCheckboxChange = (value) => {
    if (partnerSelectedQualities.includes(value)) {
      setPartnerSelectedQualities(partnerSelectedQualities.filter((item) => item !== value));
    } else {
      setPartnerSelectedQualities([...partnerSelectedQualities, value]);
    }
  };
  const storeUserArray = async () => {
    try {
      const userDocRef = doc(db, 'details', userId); 
      await setDoc(userDocRef, { userQualities: selectedQualities }, { merge: true });
  
      console.log('Array stored successfully!');
    } catch (error) {
      console.error('Error storing array:', error);
    }
  };
  const storePartnerArray = async () => {
    try {
      const userDocRef = doc(db, 'details', userId); 
      await setDoc(userDocRef, { partnerQualities: partnerSelectedQualities }, { merge: true });
  
      console.log('Array stored successfully!');
    } catch (error) {
      console.error('Error storing array:', error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    storeUserArray();
    storePartnerArray();
    console.log('Your Qualities:', selectedQualities); //do backend
    console.log('Partner Qualities:', partnerSelectedQualities); 
    console.log(currentUser.uId);
    const detailsRef=collection(db,details);
try{
    await addDoc(detailsRef, {
      userId: auth.currentUser.uid,
      userQualities: selectedQualities,
      partnerQualities: partnerSelectedQualities,
      //userId: auth?.currentUser?.uid,
    });
    
  } catch (err) {
    console.error(err);
  }
    console.log('Your goal:',goal);
  };
  

  return (
    <div>
      <div className='user'>
      <h2>Tell us about yourself</h2>
      <form onSubmit={handleSubmit}>
        <h3>What is your goal?</h3>
        <input
        type='text'
        placeholder='eg: I want to be consistent with my 100DaysOfCode Challenge'
        value={goal}
        onChange={(e) =>setGoal(e.target.value)}>
        </input>
        <h3>Your Qualities</h3>
        {qualities.map((quality) => (
          <div key={quality.value}>
            <label>
              <input
                type="checkbox"
                name={quality.value}
                value={quality.value}
                checked={selectedQualities.includes(quality.value)}
                onChange={() => handleCheckboxChange(quality.value)}
              />{' '}
              {quality.name}
            </label>
          </div>
        ))}
       
      </form>
      </div>
      <div className='partner'>
      <h2>How do you want your partner to be</h2>
      <form onSubmit={handleSubmit}>
        <h3>Partner Qualities</h3>
        {qualities.map((partnerQuality) => (
          <div key={partnerQuality.value}>
            <label>
              <input
                type="checkbox"
                name={partnerQuality.value}
                value={partnerQuality.value}
                checked={partnerSelectedQualities.includes(partnerQuality.value)}
                onChange={() => handlePartnerCheckboxChange(partnerQuality.value)}
              />{' '}
              {partnerQuality.name}
            </label>
          </div>
        ))}
       
      </form>
      </div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ProfileSetup;