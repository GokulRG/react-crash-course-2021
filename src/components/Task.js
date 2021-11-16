import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types'

const Task = ({ task, deleteTask, toggleReminder }) => {

    const getTaskStyle = () => {
        return task.reminder ? 'task reminder' : 'task';
    };

    return (
        <div onDoubleClick={() => toggleReminder(task.id)} className={getTaskStyle()}>
            <h3>{task.text} <MdClose onClick={() => deleteTask(task.id)} style={{ color: 'red', cursor: 'pointer' }} /> </h3>
            <p>{task.day}</p>
        </div>
    );
};

Task.defaultProps = {
    task: {}
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default Task;