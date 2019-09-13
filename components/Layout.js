import React from 'react';
const Layout = props => {
  const { children } = props;
  return (
    <div className='bridge-container'>
        {children}
    </div>
  );
};
export default Layout;
