import React, {Component} from 'react'
import User from './user'
import Loader from '../common/loader'
import Error from '../common/error'
import {connect} from 'react-redux'
import {usersSelector, fetchAllUsers, loadingSelector, errorSelector} from "../../reducers/users";
import {generateKey} from "../../services/helper";

/**
 * Render list of users
 */
class UsersList extends Component {
    static propTypes = {};

    /**
     * Get all users
     */
    componentDidMount() {
        const {fetchAllUsers} = this.props;
        fetchAllUsers();
    }

    /**
     * Get array of users
     * @returns {OrderedMap<K, any>}
     */
    generateUsers = () => this.props.users.map(user => <User user={user} key={generateKey(...user)}/>)

    render() {
        const {error, loading} = this.props;

        if (error) return Error(error);

        if (loading) return Loader();

        return (
            <table>
                <tbody>
                {this.generateUsers()}
                </tbody>
            </table>
        )
    }
}

export default connect(
    (state) => ({
        users: usersSelector(state),
        loading: loadingSelector(state),
        error: errorSelector(state)
    }),
    {fetchAllUsers}
)(UsersList)