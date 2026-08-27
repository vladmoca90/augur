import type { Severity } from "./events";

export interface EventFilters {
  venueId: string;
  type: string;
  severity: Severity | "";
}