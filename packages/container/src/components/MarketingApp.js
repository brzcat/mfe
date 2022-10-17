import {mount} from 'marketing/MarketingApp';
import React, {useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();
    useEffect(() => {
        mount(ref.current, {
            onNavigate: (location) => {
                const {pathname: nextPathName} = location;
                // check current path name and make sure our current path and next are different.
                const {pathName} = history.location;
                if (pathName !== nextPathName) {
                    history.push(nextPathName);
                }
            }
        });
    });

    return <div ref={ref}/>;
};
