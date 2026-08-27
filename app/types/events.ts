import type { Coordinates } from "./venues";

export type Severity =
  "low" |
  "medium" |
  "high";

export type EventType =
  | "crowd-density"
  | "unauthorised-access"
  | "unattended-object"
  | "fight";

export interface DetectionEvent {
  id: string;
  venueId: string;
  timestamp: string;
  position: Coordinates;
  type: string;
  severity: Severity;
}