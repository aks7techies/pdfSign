import React from 'react';

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100vw',
            height: '100vh',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <img
                src="../assets/images/loader.gif" // Update with the correct path to your loader image
                alt="Loading..."
                style={{ width: 120, height: 120 }}
            />
        </div>
    );
};

export default Loader;