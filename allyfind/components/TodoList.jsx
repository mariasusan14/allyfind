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
        const goalsSnapshot = await db.collection('goals').where('userId', '==', auth.currentUser.uid).get();
        const goalsData = goalsSnapshot.docs.map(doc => ({ id: doc.id, goal: doc.data().goal }));
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
      setTasks([...tasks, { id: null, goal: newTask }]);

      // Update goals in the database
      try {
        const docRef = await db.collection('goals').add({
          userId: auth.currentUser.uid,
          goal: newTask,
        });
        // Update the task's id in the state
        const updatedTasks = tasks.map(task => {
          if (task.goal === newTask) {
            return { ...task, id: docRef.id };
          }
          return task;
        });
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error adding goal to database:', error);
      }

      setNewTask('');
    }
  };

  const deleteTask = async (id) => {
    // Update goals in the state
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Delete goal from the database
    try {
      await db.collection('goals').doc(id).delete();
    } catch (error) {
      console.error('Error deleting goal from database:', error);
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index].goal);
  };

  const updateTask = async (id) => {
    // Update goals in the state
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, goal: editedTask };
      }
      return task;
    });
    setTasks(updatedTasks);

    // Update goal in the database
    try {
      await db.collection('goals').doc(id).update({ goal: editedTask });
    } catch (error) {
      console.error('Error updating goal in database:', error);
    }

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
          <li key={task.id}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => updateTask(task.id)}>Update</button>
              </>
            ) : (
              <>
                {task.goal}
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;