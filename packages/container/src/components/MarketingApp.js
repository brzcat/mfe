import {mount} from 'marketing/MarketingApp';
import React, {useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    //browser history
    const history = useHistory();
    // only run useEffect once
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: (location) => {
                const {pathname: nextPathName} = location;
                // check current path name and make sure our current path and next are different.
                const {pathName} = history.location;
                if (pathName !== nextPathName) {
                    history.push(nextPathName);
                }
            }
        });

       history.listen(onParentNavigate)
    }, []);

    return <div ref={ref}/>;
};
