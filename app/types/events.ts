import type { Coordinates } from "./venues";

export type Severity = "low" | "medium" | "high";

export interface DetectionEvent {
  id: string;
  venueId: string;
  timestamp: string;
  position: Coordinates;
  type: string;
  severity: Severity;
}