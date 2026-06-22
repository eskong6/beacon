import React from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

export default function MapFrame() {
  // Center coordinates (e.g., Austin, Texas)
  const position = { lat: 30.2672, lng: -97.7431 };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        defaultZoom={13}
        defaultCenter={position}
        mapId="YOUR_MAP_ID" // Required for Advanced Markers
      >
        <AdvancedMarker position={position}>
          <Pin background={'#FBBC05'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      </Map>
    </div>
  );
} 