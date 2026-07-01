import { useEffect } from 'react';
import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

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
      });

      return rectangle;
    });

    return () => {
      rectangles.forEach((rectangle) => rectangle.setMap(null));
    };
  }, [map, schools, selectedSchool]);

  return null;
}

export default function MapFrame({ center, schools, selectedSchool }) {
  const mapOptions = {
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    gestureHandling: 'none',
    zoomControl: false,
    clickableIcons: false,
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        defaultZoom={15}
        defaultCenter={center}
        center={center}
        options={mapOptions}
        mapId="YOUR_MAP_ID"
      >
        <CampusBoxes schools={schools} selectedSchool={selectedSchool} />
        <AdvancedMarker position={center}>
          <Pin background={'#FBBC05'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      </Map>
    </div>
  );
} 
