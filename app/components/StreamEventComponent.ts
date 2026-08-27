import { allUrls } from "../api/api";
import type { EventFilters } from "../types/filters";

export function buildEventStreamUrl(
  filters: EventFilters,
) {
  const params = new URLSearchParams();

  if (filters.venueId) {
    params.set("venueId", filters.venueId);
  }

  if (filters.type) {
    params.set("type", filters.type);
  }

  if (filters.severity) {
    params.set("severity", filters.severity);
  }

  const query = params.toString();

  return query
    ? `${allUrls.eventStream}?${query}`
    : allUrls.eventStream;
}