import { useState } from 'react';
import MainCanvas from './components/MainCanvas';

function App() {
  return (
    <>
      <h1
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <MainCanvas />
      </h1>
    </>
  );
}

export default App;
