import * as React from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import rootReducer from './modules/reducers';
import App from './components/App';

const store = createStore(rootReducer);
const theme = createMuiTheme();

const AppContainer = () => (
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme} >
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>
);

export default AppContainer;