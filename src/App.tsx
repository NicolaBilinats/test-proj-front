import React from 'react';
import { observer } from 'mobx-react';
import Characters from './components/Characters';


const App = observer(() => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Rick & Morty Characters</h1>
            <Characters/>
        </div>
    );
});

export default App;
