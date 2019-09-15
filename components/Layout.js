import React, {Fragment} from 'react';

const Layout = props => {
  const { children } = props;
  return (
    <Fragment>
        <div className={`bridge-container`}>
            {children}
        </div>
    </Fragment>
  );
};
export default Layout;
