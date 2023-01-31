import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import CharactersStore from './stores/characters.store';
import App from './App';

const charactersStore = new CharactersStore();

ReactDOM.render(
    <Provider charactersStore={charactersStore}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
