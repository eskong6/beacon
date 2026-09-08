import { useEffect, useState } from 'react';
import { Map, AdvancedMarker, InfoWindow, Pin, useMap } from '@vis.gl/react-google-maps';

function CampusBoxes({ schools, selectedSchool }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !window.google?.maps) {
      return undefined;
    }

    const rectangles = Object.entries(schools).map(([schoolKey, school]) => {
      const isSelected = schoolKey === selectedSchool;
      const rectangle = new window.google.maps.Rectangle({
        bounds: school.bounds,
        clickable: false,
        fillColor: isSelected ? '#38bdf8' : '#fbbf24',
        fillOpacity: isSelected ? 0.16 : 0.1,
        map,
        strokeColor: isSelected ? '#0ea5e9' : '#f59e0b',
        strokeOpacity: 0.95,
        strokeWeight: isSelected ? 3 : 2,
        zIndex: 1,
      });

      return rectangle;
    });

    return () => {
      rectangles.forEach((rectangle) => rectangle.setMap(null));
    };
  }, [map, schools, selectedSchool]);

  return null;
}

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    map.panTo(center);
  }, [map, center]);

  return null;
}

function ZoomControls() {
  const map = useMap();

  const changeZoom = (amount) => {
    if (!map) {
      return;
    }

    const currentZoom = map.getZoom() ?? 15;
    map.setZoom(Math.min(21, Math.max(10, currentZoom + amount)));
  };

  return (
    <div className="fixed right-6 top-24 z-10 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <button
        type="button"
        aria-label="Zoom in"
        title="Zoom in"
        onClick={() => changeZoom(1)}
        className="flex h-11 w-11 items-center justify-center text-2xl text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-400"
      >
        +
      </button>
      <div className="h-px bg-white/10" />
      <button
        type="button"
        aria-label="Zoom out"
        title="Zoom out"
        onClick={() => changeZoom(-1)}
        className="flex h-11 w-11 items-center justify-center text-2xl text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-400"
      >
        −
      </button>
    </div>
  );
}

function IncidentMarker({ incident }) {
  const [isHovered, setIsHovered] = useState(false);
  const position = { lat: incident.lat, lng: incident.lng };

  return (
    <>
      <AdvancedMarker
        position={position}
        zIndex={1000}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Pin background="#EF4444" glyphColor="#000" borderColor="#000" />
      </AdvancedMarker>

      {isHovered && (
        <InfoWindow position={position} pixelOffset={[0, -38]}>
          <div className="w-52 text-slate-900">
            <p className="font-bold">{incident.title}</p>
            <p className="mt-1">{incident.description}</p>
            <p className="mt-2 text-slate-600">{incident.type}</p>
            <p className="text-slate-600">
              {new Date(incident.timestamp).toLocaleString()}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}


export default function MapFrame({
  center,
  schools,
  selectedSchool,
  incidents
 }) {
  const mapOptions = {
    disableDefaultUI: true,
    draggable: true,
    scrollwheel: true,
    gestureHandling: 'greedy',
    zoomControl: false,
    clickableIcons: false,
    mapTypeId: 'satellite',
  };

  return (
    <div className="fixed inset-0 h-full w-full">
      <Map
        defaultZoom={15}
        defaultCenter={center}
        options={mapOptions}
        mapId="YOUR_MAP_ID"
      >
        <CampusBoxes schools={schools} selectedSchool={selectedSchool} />
        <RecenterMap center={center} />
        <ZoomControls />
        <AdvancedMarker position={center}>
          <Pin background={'#FBBC05'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
        {incidents.map((incident) => (
          <IncidentMarker key={incident.id} incident={incident} />
        ))}
      </Map>
    </div>
  );
} 
