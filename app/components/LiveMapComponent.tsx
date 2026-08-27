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

interface MapControllerProps {
  venue?: Venue;
  venues: Venue[];
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

function MapController({
  venue,
  venues,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (venue) {
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

      return;
    }

    if (venues.length > 0) {
      const venueCenters = venues.map(
        (venue) =>
          [
            venue.center.lat,
            venue.center.lng,
          ] as [number, number],
      );

      map.fitBounds(venueCenters, {
        padding: [30, 30],
      });
    }
  }, [map, venue, venues]);

  return null;
}

export default function LiveMap({
  venues,
  events,
  selectedVenueId,
}: LiveMapProps) {
  const selectedVenue = venues.find(
    (venue) => venue.id === selectedVenueId,
  );

  const getVenueName = (venueId: string) => {
    return (
      venues.find(
        (venue) => venue.id === venueId,
      )?.name ?? venueId
    );
  };

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={[51.5074, -0.1278]}
        zoom={10}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          venue={selectedVenue}
          venues={venues}
        />

        {events.map((event) => (
          <CircleMarker
            key={event.id}
            center={[
              event.position.lat,
              event.position.lng,
            ]}
            radius={8}
            pathOptions={{
              color: getEventColor(
                event.severity,
              ),
              fillColor: getEventColor(
                event.severity,
              ),
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <div>
                <strong>
                  {event.type}
                </strong>

                <p>
                  Severity: {event.severity}
                </p>

                <p>
                  Venue:{" "}
                  {getVenueName(
                    event.venueId,
                  )}
                </p>

                <p>
                  {new Date(
                    event.timestamp,
                  ).toLocaleTimeString()}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}