import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/config/firebase';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // Fetch goals for the current user
        const goalsSnapshot = await db.collection('goals').where('userId', '==', auth.currentUser.uid).get();
        const goalsData = goalsSnapshot.docs.map(doc => doc.data().goal);
        setTasks(goalsData);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []); // Empty dependency array ensures useEffect runs once after component mounts

  const addTask = async () => {
    if (newTask.trim() !== '') {
      // Update goals in the state
      setTasks([...tasks, newTask]);

      // Update goals in the database
      await db.collection('goals').add({
        userId: auth.currentUser.uid,
        goal: newTask,
      });

      setNewTask('');
    }
  };

  const deleteTask = async (index) => {
    // Update goals in the state
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Delete goal from the database
    const goalsSnapshot = await db.collection('goals').where('userId', '==', auth.currentUser.uid).get();
    goalsSnapshot.forEach(doc => {
      if (doc.data().goal === tasks[index]) {
        doc.ref.delete();
      }
    });
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const updateTask = async () => {
    // Update goals in the state
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editedTask;
    setTasks(updatedTasks);

    // Update goal in the database
    const goalsSnapshot = await db.collection('goals').where('userId', '==', auth.currentUser.uid).get();
    goalsSnapshot.forEach(doc => {
      if (doc.data().goal === tasks[editIndex]) {
        doc.ref.update({ goal: editedTask });
      }
    });

    setEditIndex(null);
    setEditedTask('');
  };

  return (
    <div className="todo-list">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new goal"
      />
      <button onClick={addTask}>Add Goal</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={updateTask}>Update</button>
              </>
            ) : (
              <>
                {task}
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;