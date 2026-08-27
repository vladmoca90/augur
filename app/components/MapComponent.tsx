"use client";
import dynamic from "next/dynamic";
import type { MapComponentProps } from "../types/map";
import LiveMapComponent from "./LiveMapComponent";

dynamic(() => import("./LiveMapComponent"), {
  ssr: false,
})

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