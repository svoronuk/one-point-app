import React, { Component } from 'react'
import PropTypes from 'prop-types';

/**
 * Render one user
 */
export default class User extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    render() {
        const {user} = this.props;

        return (
            <tr>
                <td style={{border: '1px solid black'}}>{user.firstName}</td>
                <td style={{border: '1px solid black'}}>{user.lastName}</td>
            </tr>
        )
    }
}
