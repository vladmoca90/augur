"use client";
import dynamic from "next/dynamic";
import type { DetectionEvent } from "../types/events";
import type { Venue } from "../types/venues";
import { MapComponentProps } from "../types/map";

const LiveMap = dynamic(
  () => import("./LiveMapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] items-center justify-center text-black">
        Loading map...
      </div>
    ),
  },
);

export default function MapComponent({
  venues,
  events,
  selectedVenueId,
}: MapComponentProps) {
  return (
    <LiveMap
      venues={venues}
      events={events}
      selectedVenueId={selectedVenueId}
    />
  );
}