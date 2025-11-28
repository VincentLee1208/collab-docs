import React from 'react';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px',
      }}
    >
      <div
        style={{
          width: 'min(900px, 100%)',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          padding: '24px 32px',
        }}
      >

        {/* Editor will go here */}
        <div>Editor placeholder</div>
      </div>
    </div>
  );
}

export default App;
