import * as ReactDOM from 'react-dom';
import * as React from 'react';
import AppContainer from './AppContainer';

window.addEventListener('load', () => {
    ReactDOM.render(<AppContainer />, document.getElementById('root'));
});