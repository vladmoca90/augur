# NOTES

## Approach

- I focused on how to build and create the map and its functionality according to the data from the APIs:
- Venues are loaded from `https://frontend-takehome-server-production.up.railway.app/api/venues`, which returns an array of objects containing the venue name, coordinates, and bounds.
- The live map uses `https://frontend-takehome-server-production.up.railway.app/api/events/stream`, which provides dynamic live data.

## Server-Sent Events

- I used **EventSource** because the API provides Server-Sent Events.
- Every time a new filter is selected, the EventSource connection is updated using the selected filters.
- EventSource's native reconnection behaviour is used when the stream disconnects, while the UI displays the current stream status.

### State Management

- I used the `useState` hook instead of Redux or another state-management library.
- The reason for this is that the application does not require any complex state management, and I believe local state is enough.

## Mapping

- I used the React Leaflet library for the map because a 2D map is required for this case.

## Event Display

- Events are displayed on the map as coloured markers according to their severity and location (latitude and longitude).
- The severity colours are high (#940303), medium (#e49102), low (#077d33), and default (#0838a1).

## Event Retention

- I added a limit of 200 events for this map.
- The reason was to prevent the map from being overloaded with an unlimited number of events and also to prevent increasing browser memory usage.
- It is also important for users to be able to see the events clearly on the map, so having a limit is better.

## Trade-offs

- The priority was to make sure the live map displays the events properly and without issues.
- The filters had to work correctly, and the events should not be stored indefinitely.

## With More Time

- improving the styling of the app.
- would consider 3D libraries if the requirements are needed.
- adding more tests across the entire application, using both Jest and Playwright.