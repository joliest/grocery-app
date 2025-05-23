import * as React from 'react';
import {Outlet} from 'react-router-dom';
import DefaultLayout from './components/appbar/DefaultLayout';

const App = () => {
    return (
        <DefaultLayout>
            <Outlet />
        </DefaultLayout>
    );
}

export default App;
