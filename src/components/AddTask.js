import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AddTask = ({ addTask }) => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const [textStyle, setTextStyle] = useState({});
    const [dayStyle, setDayStyle] = useState({});

    const submitTask = (e) => {
        e.preventDefault();

        if (!text || text.trim().length === 0) {
            setTextStyle({border: '1px solid red'});
        } else {
            setTextStyle({});
        }

        if (!day || day.trim().length === 0) {
            setDayStyle({border: '1px solid red'});
        } else {
            setDayStyle({});
        }

        if (!text || text.trim().length === 0 || !day || !day.trim().length === 0) {
            return;
        }

        addTask(text, day, reminder);
        resetState();
    }

    const resetState = () => {
        setText('');
        setDay('');
        setReminder(false);
    }

    const onTextChange = (e) => {
        if (e.target.value && e.target.value.trim().length > 0) {
            setTextStyle({});
        } else {
            setTextStyle({border: '1px solid red'});
        }

        setText(e.target.value);
    }

    const onDayChange = (e) => {
        if (e.target.value && e.target.value.trim().length > 0) {
            setDayStyle({});
        } else {
            setDayStyle({border: '1px solid red'});
        }

        setDay(e.target.value);
    }

    return (
        <form className="add-form" onSubmit={(e) => submitTask(e)}>
            <div className="form-control">
                <label>Task</label>
                <input style={textStyle} type="text" placeholder="Add Task Title" value={text} onChange={(e) => onTextChange(e)} />
            </div>
            <div className="form-control">
                <label>Day and Time</label>
                <input style={dayStyle} type="text" placeholder="Add Day and Time" value={day} onChange={(e) => onDayChange(e)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input onClick={(e) => setReminder(e.currentTarget.checked)} type="checkbox" defaultChecked={reminder} />
            </div>
            <input className="btn btn-block" type="submit" value="Save Task" />
        </form>
    )
}

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired
}

export default AddTask
