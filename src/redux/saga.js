import {spawn} from 'redux-saga/effects'
import {saga as userSaga} from '../reducers/users'

export default function* () {
    yield spawn(userSaga)
}
