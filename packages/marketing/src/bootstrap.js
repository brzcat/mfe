import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory } from 'history';
//add our main startup code

//Mount function to start up the app
const mount = (el, { onNavigate }) => {
    console.log(`start`)
    //el.innerHTML = 'hi'
    const history = createMemoryHistory();

    //whenever navigation happens it will call the function inside listen
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App history={history}/>, el);

    // return object that container can call
    return {
        onParentNavigate(location) {
            const { pathname: nextPathName} = location;
            const { pathname: currentPathName} = history.location;
            if (nextPathName !== currentPathName) {
                console.log('nextpathname ' + nextPathName)
                history.push(nextPathName);
            }
        }
    }
};
//if we are in development and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')
    if (devRoot) {
        mount(devRoot,{});
    }
}

//we are running thru container and export mount function.
export {mount};