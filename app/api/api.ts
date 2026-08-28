export const baseUrl = "https://frontend-takehome-server-production.up.railway.app";

export const allUrls = {
  venues: `${baseUrl}/api/venues`,
  eventStream: `${baseUrl}/api/events/stream`,
  events: `${baseUrl}/api/events`,
} as const;