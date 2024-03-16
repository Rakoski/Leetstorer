import React from 'react';
import Header from '../Header/index.tsx';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default Layout;