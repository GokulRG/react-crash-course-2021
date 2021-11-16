import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from './components/About';

const App = () => {

  const [tasks, setTasks] = useState([]);

  const [showAddTasks, setShowAddTasks] = useState(false);

  // Consume data from the API
  // The empty array as the second argument to use effect is called a dependency array where in, if that value changes
  // useEffect will re-run. We don't have anything like that. so we're good
  useEffect(() => {

    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    }

    getTasks();
  }, []);

  // Fetch Tasks
  // You can't do an async function directly as an argument to use effect, so create a new function and return result
  const fetchTasks = async () => {
    const results = await fetch('http://localhost:5000/tasks');
    const json = await results.json();
    return json;
  };

  // Add Task
  const addTask = async (text, day, reminder) => {
    if (!text || !day) {
      return;
    }

    const newTask = {
      text,
      day,
      reminder
    };

    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    // Make an API call before filtering from the UI
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    data.reminder = !data.reminder;

    const updateRes = await fetch(`http://localhost:5000/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const updatedTask = await updateRes.json();

    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = updatedTask.reminder;
      }
      return task;
    }));
  }

  return (
    <Router>
      <div className="container">
        <Header toggleShowAddTasks={() => setShowAddTasks(!showAddTasks)} showAddTasks={showAddTasks} />
        <Route path='/' exact render={() => (
          <>
            { showAddTasks && <AddTask addTask={addTask} /> }
            <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} />
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
