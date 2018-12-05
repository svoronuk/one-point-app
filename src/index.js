import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'

document.body.onload = showEntities;

/**
 * Initial rendering
 */
function showEntities(){
    let container = document.getElementById('root');
    if(container === null){
        container = document.createElement("div");
        document.body.appendChild(container);
    }
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        container
    )
}

