import type { DetectionEvent } from "./events";
import type { Venue } from "./venues";

export interface MapComponentProps {
  venues: Venue[];
  events: DetectionEvent[];
  selectedVenueId: string;
}