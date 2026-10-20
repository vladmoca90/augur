import { act, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import dynamic from "next/dynamic";
import MapComponent from "./MapComponent";
import type { MapComponentProps } from "../types/map";

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn(() => <div>Live map</div>)),
}));

jest.mock("./LiveMapComponent", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockDynamic = jest.mocked(dynamic);
const mockLiveMap = mockDynamic.mock.results[0].value as jest.Mock;
const [loadMap, options] = mockDynamic.mock.calls[0] as unknown as [
  () => Promise<{ default: ComponentType<MapComponentProps> }>,
  { ssr: boolean; loading: ComponentType<{ error?: Error }> },
];

const props: MapComponentProps = {
  venues: [{
    id: "venue-1",
    name: "Main venue",
    center: { lat: 51.5, lng: -0.1 },
    bounds: { north: 51.6, south: 51.4, east: 0, west: -0.2 },
  }],
  events: [{
    id: "event-1",
    venueId: "venue-1",
    timestamp: "2026-10-20T12:00:00Z",
    position: { lat: 51.5, lng: -0.1 },
    type: "crowd-density",
    severity: "high",
  }],
  selectedVenueId: "venue-1",
};

describe("MapComponent", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    mockLiveMap.mockClear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    Reflect.deleteProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT");
  });

  it("loads LiveMapComponent with server rendering disabled", async () => {
    expect(options.ssr).toBe(false);
    const loaded = await loadMap();
    const expected = await import("./LiveMapComponent");
    expect(loaded.default).toBe(expected.default);
  });

  it.each([undefined, new Error("Map chunk failed to load")])(
    "renders the loading placeholder even when loading reports %s",
    async (error) => {
      const Loading = options.loading;
      await act(async () => root.render(<Loading error={error} />));
      expect(container.textContent).toBe("Loading map...");
      expect(container.firstElementChild?.classList.contains("h-[500px]")).toBe(true);
    },
  );

  it("passes venues, events and the selected venue to the live map", async () => {
    await act(async () => root.render(<MapComponent {...props} />));
    expect(container.textContent).toBe("Live map");
    const received = mockLiveMap.mock.lastCall![0];
    expect(received.venues).toBe(props.venues);
    expect(received.events).toBe(props.events);
    expect(received.selectedVenueId).toBe("venue-1");
  });

  it("forwards updated data and selection, including empty data", async () => {
    await act(async () => root.render(<MapComponent {...props} />));
    const updated: MapComponentProps = {
      venues: [],
      events: [],
      selectedVenueId: "",
    };
    await act(async () => root.render(<MapComponent {...updated} />));
    expect(mockLiveMap.mock.lastCall![0]).toEqual(updated);
    expect(container.textContent).toBe("Live map");
  });
});
