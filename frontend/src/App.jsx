import { useState } from 'react';
import MapFrame from './components/MapFrame.jsx';
import beaconIcon from './assets/beaconIcon.png';

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
  CSUF: {
    label: 'California State University Fullerton',
    position: { lat: 33.8806, lng: -117.8853 },
    bounds: {
      north: 33.8886,
      south: 33.8726,
      east: -117.8733,
      west: -117.8973,
    },
  },
  UCSD: {
    label: 'University of California San Diego',
    position: { lat: 32.8788, lng: -117.2366 },
    bounds: {
      north: 32.8938,
      south: 32.8638,
      east: -117.2166,
      west: -117.2566,
    },
  },
};

function App() {
  const [selectedSchool, setSelectedSchool] = useState('CSULB');
  const position = schools[selectedSchool].position;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <MapFrame center={position} schools={schools} selectedSchool={selectedSchool} />

      <div className="fixed inset-x-0 top-0 z-20 flex h-20 items-center justify-end gap-3 bg-black px-6">
        <img src={beaconIcon} alt="" className="h-9 w-9" />
        <h1 className="text-3xl font-bold text-white">BEACON</h1>
      </div>

      <div className="fixed bottom-6 right-6 z-30">
        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 py-3 pl-3 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:border-sky-500/40">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
              />
              <circle cx="12" cy="9.5" r="2.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="min-w-[150px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Campus
            </p>
            <p className="truncate text-sm font-semibold text-white">
              {schools[selectedSchool].label}
            </p>
          </div>

          <div className="relative">
            <select
              id="school-select"
              value={selectedSchool}
              onChange={(event) => setSelectedSchool(event.target.value)}
              className="peer appearance-none rounded-xl border border-slate-700/80 bg-slate-950/80 py-2 pl-3 pr-8 text-sm font-medium text-white outline-none transition-colors duration-200 hover:border-slate-500 focus:border-sky-500"
            >
              <option value="CSULB">CSULB</option>
              <option value="UCI">UCI</option>
              <option value="CSUF">CSUF</option>
              <option value="UCSD">UCSD</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 transition-transform duration-200 peer-focus:rotate-180 peer-focus:text-sky-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
