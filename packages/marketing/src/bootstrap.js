import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
//add our main startup code

//Mount function to start up the app
const mount = (el) => {
    console.log(`start`)
    //el.innerHTML = 'hi'
    ReactDOM.render(<App/>, el)
};
//if we are in development and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')
    if (devRoot) {
        mount(devRoot);
    }

}

//we are running thru container and export mount function.
export {mount};