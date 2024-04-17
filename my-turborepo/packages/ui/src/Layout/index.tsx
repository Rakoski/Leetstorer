import React from 'react';
import Header from '../Header/index.tsx';

const Layout = ({ children, onLogout }) => {
    return (
        <div>
            <Header onLogout={onLogout} />
            {children}
        </div>
    );
};

export default Layout;