import { combineReducers } from 'redux'
import userReducer, { moduleName as userModule } from '../reducers/users'

export default combineReducers({
    [userModule]: userReducer,
})
