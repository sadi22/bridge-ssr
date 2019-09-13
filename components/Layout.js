import React from 'react';
const TIMEOUT = 400

const Layout = props => {
  const { children } = props;
  return (
    <>
        <div className='page-overlay'></div>
        <div className='bridge-container'>
            {children}
        </div>
        
    </>
  );
};
export default Layout;
