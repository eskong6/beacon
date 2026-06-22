import { useState } from 'react'
import MapFrame from './components/MapFrame.jsx';

function App() {
  return (
    <div className="bg-blue-500 text-white p-5">
      <h1 className="text-3xl font-bold">
        Beacon
      </h1>
      <MapFrame>
      </MapFrame>
    </div>
  );
}

export default App;