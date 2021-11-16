import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';

const Header = props => {

    const location = useLocation()

    return (
        <header className="header">
            <h1>{props.title}</h1>
            { location.pathname === "/" && <button onClick={props.toggleShowAddTasks} style={props.showAddTasks ? {backgroundColor: 'red'} : {backgroundColor:'green'}}className="btn">{props.showAddTasks ? 'Close' : 'Add'}</button>}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
    showAddTasks: false
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    toggleShowAddTasks: PropTypes.func.isRequired,
    showAddTasks: PropTypes.bool.isRequired
};

export default Header
