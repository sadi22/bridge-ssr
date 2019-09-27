import React, {Fragment} from 'react';

const Layout = props => {
  const { children } = props;
  return (
    <>
        <main>{children}</main>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
            position: relative;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }

          #__next {
            height: 100%;
          }

          #page-transition-container {
            overflow: hidden;
            max-width: 100%;
            width: 100%;
            height: 100%;
          }

          main {
            align-items: stretch;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            overflow-scrolling: touch;
            -webkit-overflow-scrolling: touch;
            margin: 0;
          }
        `}</style>
    </>
   
  );
};
export default Layout;
