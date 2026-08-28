"use client";
import dynamic from "next/dynamic";
import type { MapComponentProps } from "../types/map";

const LiveMapComponent = dynamic(
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
    <LiveMapComponent
      venues={venues}
      events={events}
      selectedVenueId={selectedVenueId}
    />
  );
}