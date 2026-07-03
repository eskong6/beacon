import { useEffect, useRef, useState } from 'react';
import MapFrame from './components/MapFrame.jsx';
import beaconIcon from './assets/beaconIcon.png';
import profileIcon from './assets/profileIcon.png';

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
    emergencyPhone: '(562) 985-4101',
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
    emergencyPhone: '(949) 824-5223',
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
    emergencyPhone: '(657) 278-2515',
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
    emergencyPhone: '(858) 534-4357',
  },
};

function App() {
  const [selectedSchool, setSelectedSchool] = useState('CSULB');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const position = schools[selectedSchool].position;

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <MapFrame center={position} schools={schools} selectedSchool={selectedSchool} />

      <div className="fixed inset-x-0 top-0 z-20 flex h-20 items-center justify-between gap-3 bg-black px-6">
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            aria-label="Profile"
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
            onClick={() => setIsProfileMenuOpen((open) => !open)}
            className="flex h-15 w-15 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
          >
            <img src={profileIcon} alt="" className="h-10 w-10" />
          </button>

          {isProfileMenuOpen && (
            <div
              role="menu"
              className="absolute left-0 top-full mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors duration-150 hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" />
                  <circle cx="12" cy="7.5" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Profile
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors duration-150 hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4 shrink-0">
                  <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                  />
                </svg>
                Settings
              </button>

              <div className="my-1 h-px bg-white/10" />

              <button
                type="button"
                role="menuitem"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 transition-colors duration-150 hover:bg-red-500/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5-5-5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12H9" />
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <img src={beaconIcon} alt="" className="h-9 w-9" />
          <h1 className="text-3xl font-bold text-white">BEACON</h1>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <a
          href={`tel:${schools[selectedSchool].emergencyPhone.replace(/[^\d+]/g, '')}`}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 py-3 pl-3 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:border-red-500/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
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
                d="M3 5.5c0-1.1.9-2 2-2h2.2c.5 0 .95.35 1.06.85l.7 3.2a1.1 1.1 0 0 1-.3 1.03L7.3 10a12.5 12.5 0 0 0 6.7 6.7l1.42-1.36c.28-.27.68-.38 1.03-.3l3.2.7c.5.11.85.56.85 1.06V19c0 1.1-.9 2-2 2h-1C9.6 21 3 14.4 3 6.5v-1Z"
              />
            </svg>
          </div>

          <div className="min-w-[150px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Emergency
            </p>
            <p className="text-sm font-semibold text-white">
              {schools[selectedSchool].emergencyPhone}
            </p>
          </div>
        </a>

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
