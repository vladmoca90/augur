# Augur Application Overview

## What the application does

Augur is a live monitoring dashboard that displays detection events at venues on an interactive map. It helps users see where events are happening, check their severity, and focus on a particular venue or event category.

The application displays detections supplied by an external service; it does not perform detection itself.

## Running the application

From the project directory, install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. Internet access is needed to load venue data, receive live events, and display OpenStreetMap tiles.

Other available commands:

- `npm run build`: create a production build.
- `npm run start`: serve an existing production build.
- `npm run lint`: run the configured lint checks.

## Using the dashboard

1. Wait for the venue data and map to load.
2. Choose a venue, or leave **All venues** selected. Selecting a venue fits the map to that venue's boundaries; selecting all venues fits the map around their centers.
3. Optionally select an event type: **Crowd density**, **Unauthorised access**, **Unattended object**, or **Fight**.
4. Optionally select a severity: **Low**, **Medium**, or **High**.
5. Watch for new markers on the map. Low-severity events are green, medium-severity events are orange, and high-severity events are dark red.
6. Click a marker to see the event type, severity, venue name, and event time formatted using the browser's locale.

The three filters can be combined. Selecting an **All** option removes that filter. Changing any filter clears the currently displayed events and starts a new stream using the updated selection, so markers appear as new events arrive.

## How data moves through the application

1. The home page renders the live dashboard.
2. The dashboard fetches the venue list from the external API. Each venue includes an ID, name, center coordinates, and geographic boundaries.
3. The dashboard also opens a Server-Sent Events connection using the browser's `EventSource` API.
4. Selected filters are sent as `venueId`, `type`, and `severity` query parameters on the stream URL. Filtering is requested from the external service.
5. Incoming messages named `detection` are parsed as JSON and added to local React state, newest first.
6. The map renders each retained event as a circle at its latitude and longitude.

Only the most recent 200 received events are retained. Older events are removed as new ones arrive. Events are held in browser memory and are cleared when filters change or the page reloads. The application does not load historical events on startup.

## Loading and connection states

- **Loading venues:** an animation and message appear while the initial venue request is pending.
- **Venue error:** if that request fails, the dashboard displays an error instead of the map.
- **Loading map:** a placeholder appears while the browser loads the map component.
- **Connecting:** the live event connection is being established.
- **Connected:** the connection is open. If no events are retained, the dashboard displays “Waiting for detection events...”.
- **Reconnecting:** a stream error has occurred. The dashboard displays a reconnection message and relies on `EventSource`'s built-in retry behavior. Existing markers remain visible during this interruption.

Messages that cannot be parsed as JSON are logged to the browser console and skipped. The stream connection is closed when its filter URL changes or the dashboard unmounts.

## Main files and responsibilities

| File | Responsibility |
| --- | --- |
| `app/page.tsx` | Home page that renders the dashboard. |
| `app/components/LiveComponent.tsx` | Loads venues, manages filters and events, opens and closes the stream, and displays loading and connection states. |
| `app/components/FilterMapComponent.tsx` | Renders the venue, event type, and severity dropdowns. |
| `app/components/StreamEventComponent.ts` | Builds the stream URL from the selected filters. Despite its name, it is a utility rather than a rendered component. |
| `app/components/MapComponent.tsx` | Loads the interactive map in the browser with server-side rendering disabled. |
| `app/components/LiveMapComponent.tsx` | Displays OpenStreetMap tiles, positions the map, and renders event markers and popups. |
| `app/api/api.ts` | Defines the external API base URL and endpoint URLs. It is configuration, not a backend route. |
| `app/types/` | Defines TypeScript types for venues, events, filters, and map properties. |

## External services and technology

The frontend uses Next.js, React, TypeScript, Tailwind CSS, and React Leaflet/Leaflet. State is managed locally with React hooks.

The API base URL is configured in `app/api/api.ts` as:

```text
https://frontend-takehome-server-production.up.railway.app
```

- `/api/venues` supplies the venue list.
- `/api/events/stream` supplies live detection messages.
- `/api/events` is defined in the configuration but is not currently used by the dashboard.

OpenStreetMap provides the map tiles. This repository implements the frontend dashboard; the external API provides the venue and detection data.
