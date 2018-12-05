import React, {Component} from 'react'
import UsersList from './components/users/users-list'

/**
 * Base component which is render required components. for now it is <User/>
 */
export default class App extends Component{
    render() {
        return <div>
            <UsersList />
        </div>
    }
}
