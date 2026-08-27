"use client";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { DetectionEvent } from "../types/events";
import type { Venue } from "../types/venues";

interface LiveMapProps {
  venues: Venue[];
  events: DetectionEvent[];
  selectedVenueId: string;
}

function getEventColor(severity: DetectionEvent["severity"]) {
  switch (severity) {
    case "high":
      return "#940303";

    case "medium":
      return "#e49102";

    case "low":
      return "#077d33";

    default:
      return "#0838a1";
  }
}

interface MapControllerProps {
  venue?: Venue;
}

function MapController({
  venue,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (!venue) {
      return;
    }

    map.fitBounds([
      [
        venue.bounds.south,
        venue.bounds.west,
      ],
      [
        venue.bounds.north,
        venue.bounds.east,
      ],
    ]);
  }, [map, venue]);

  return null;
}

export default function LiveMap({
  venues,
  events,
  selectedVenueId,
}: LiveMapProps) {
    const selectedVenue =
  venues.find(
    (venue) =>
      venue.id === selectedVenueId,
  );
  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={[51.5074, -0.1278]}
        zoom={10}
        className="h-full w-full"
         venue={selectedVenue}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <CircleMarker
            key={event.id}
            center={[event.position.lat, event.position.lng]}
            radius={8}
            pathOptions={{
              color: getEventColor(event.severity),
              fillColor: getEventColor(event.severity),
              fillOpacity: 0.8,
            }}
          ></CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
