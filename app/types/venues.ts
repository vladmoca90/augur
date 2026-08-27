export interface Coordinates {
  lat: number;
  lng: number;
}

export interface VenueBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Venue {
  id: string;
  name: string;
  center: Coordinates;
  bounds: VenueBounds;
}