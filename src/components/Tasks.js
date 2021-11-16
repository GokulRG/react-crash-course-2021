import PropTypes from 'prop-types';
import Task from './Task';

const Tasks = ({ tasks, deleteTask, toggleReminder }) => {

    const displayTasks = () => {
        return tasks.map(task => {
            return <Task key={task.id} task={task} deleteTask={deleteTask} toggleReminder={toggleReminder} />
        });
    }

    return (
        <>
            {tasks.length > 0 ? displayTasks() : <h3>No Tasks to Show</h3>}
        </>
    );
};

Tasks.defaultProps = {
    tasks: []
};

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleReminder: PropTypes.func.isRequired
};

export default Tasks;