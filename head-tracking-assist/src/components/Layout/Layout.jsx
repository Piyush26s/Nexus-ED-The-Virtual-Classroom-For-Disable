import React from 'react';
import Header from './Header';
import Sidebar from '../Sidebar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Header />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
