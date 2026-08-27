"use client";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import type { DetectionEvent } from "../types/events";
import type { Venue } from "../types/venues";

interface LiveMapProps {
  venues: Venue[];
  events: DetectionEvent[];
  selectedVenueId: string;
}

export default function LiveMap({
  venues,
  events,
  selectedVenueId,
}: LiveMapProps) {
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
      </MapContainer>
    </div>
  );
}