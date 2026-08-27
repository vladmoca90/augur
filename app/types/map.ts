import { DetectionEvent } from "./events";
import { Venue } from "./venues";

export interface MapComponentProps {
  venues: Venue[];
  events: DetectionEvent[];
  selectedVenueId: string;
}