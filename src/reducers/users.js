import {all, takeEvery, put, call} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import * as api from '../services/api'
import {responseJSONToUsers} from '../services/helper'
import {APP_NAME as app, DEFAULT_USER_ERROR_MESSAGE} from '../constants'
import {t} from "../services/helper";
import {logError} from "../services/error-logger";

/**
 * Constants
 * */
export const moduleName = 'users';
const prefix = `${app}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_ERROR = `${prefix}/FETCH_ALL_ERROR`;


/**
 * Reducer
 * */
/**
 * Storage template
 * @type {*|Immutable.Record.Factory<{loading: boolean, error: null, users: Immutable.OrderedMap | Immutable.OrderedMap<any, any> | Immutable.OrderedMap<string, any>}>}
 */
export const ReducerRecord = Record({
    loading: false,
    error: null,
    users: new OrderedMap()
});

/**
 * User template
 * @type {*|Immutable.Record.Factory<{userId: null, firstName: null, lastName: null}>}
 */
export const EventRecord = Record({
    userId: null,
    firstName: null,
    lastName: null
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, error} = action;

    switch (type) {
        case FETCH_ALL_START:
            return state.set('loading', true);

        case FETCH_ALL_SUCCESS:
            // Transform response to required data format
            const entities = responseJSONToUsers(payload, EventRecord);

            return entities === null
                ?  state.set('loading', false)
                    .set('error', t(DEFAULT_USER_ERROR_MESSAGE))
                : state.set('loading', false)
                    .set('users', entities);

        case FETCH_ALL_ERROR:
            logError(error, 2);

            return state.set('loading', false).set('error', t(DEFAULT_USER_ERROR_MESSAGE));

        default:
            return state;
    }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName];

export const usersSelector = createSelector(
    stateSelector,
    (state) => state.users.valueSeq().toArray()
);
export const loadingSelector = createSelector(
    stateSelector,
    (state) => state.loading
);
export const errorSelector = createSelector(
    stateSelector,
    (state) => state.error
);

/**
 * Action Creators
 * */

export function fetchAllUsers() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
    /**
     * Start fetching users
     */
    yield put({
        type: FETCH_ALL_START
    });
    try {
        // Fetch
        const data = yield call(api.fetchAllUsers);

        // Success
        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data
        })
    } catch (error) {
        // Error
        yield put({
            type: FETCH_ALL_ERROR,
            error
        })
    }
}

export function* saga() {
    yield all([
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    ])
}
