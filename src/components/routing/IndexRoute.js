import React from 'react';
import { Route} from 'react-router-dom';


import Index from '../page/index';


const IndexRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Index>
          <Component {...matchProps} />
        </Index>
      )}
    />
  );
};
export default IndexRoute;