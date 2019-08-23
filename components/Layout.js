import React from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
};

const Layout = props => {
  const { children } = props;
  return (
    <div>
        {children}
    </div>
  );
};
export default Layout;
