import type { EventType, Severity} from "./events";

export interface EventFilters {
  venueId: string;
  type: EventType | "";
  severity: Severity | "";
}