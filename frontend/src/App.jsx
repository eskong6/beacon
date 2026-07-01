import { useState } from 'react';
import MapFrame from './components/MapFrame.jsx';

const schools = {
  CSULB: {
    label: 'California State University Long Beach',
    position: { lat: 33.7830, lng: -118.1129 },
    bounds: {
      north: 33.7910,
      south: 33.7755,
      east: -118.1035,
      west: -118.1245,
    },
  },
  UCI: {
    label: 'University of California Irvine',
    position: { lat: 33.6405, lng: -117.8389 },
    bounds: {
      north: 33.6540,
      south: 33.6290,
      east: -117.8215,
      west: -117.8580,
    },
  },
};

function App() {
  const [selectedSchool, setSelectedSchool] = useState('CSULB');
  const position = schools[selectedSchool].position;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-5 py-6">
        <h1 className="text-3xl font-bold text-white">BEACON</h1>
      </div>
      <MapFrame center={position} schools={schools} selectedSchool={selectedSchool} />
      <div className="fixed bottom-14 right-6 z-30 min-w-[240px] rounded-full border border-white/10 bg-slate-950/95 px-4 py-3 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Campus</p>
            <p className="text-sm font-semibold text-white">{schools[selectedSchool].label}</p>
          </div>
          <select
            id="school-select"
            value={selectedSchool}
            onChange={(event) => setSelectedSchool(event.target.value)}
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-sky-500"
          >
            <option value="CSULB">CSULB</option>
            <option value="UCI">UCI</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
