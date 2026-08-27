"use client";
import type {
  EventType,
  Severity,
} from "../types/events";
import type { Venue } from "../types/venues";

interface FiltersComponentProps {
  venues: Venue[];
  selectedVenueId: string;
  selectedType: EventType | "";
  selectedSeverity: Severity | "";
  onVenueChange: (
    venueId: string,
  ) => void;
  onTypeChange: (
    type: EventType | "",
  ) => void;
  onSeverityChange: (
    severity: Severity | "",
  ) => void;
}

export default function FiltersComponent({
  venues,
  selectedVenueId,
  selectedType,
  selectedSeverity,
  onVenueChange,
  onTypeChange,
  onSeverityChange,
}: FiltersComponentProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex w-full justify-between gap-2">
        <label
          htmlFor="venue"
          className="font-medium text-black"
        >
          Venue
        </label>

        <select
          id="venue"
          value={selectedVenueId}
          onChange={(event) =>
            onVenueChange(
              event.target.value,
            )
          }
          className="rounded border border-[#403939] bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">
            All venues
          </option>

          {venues.map((venue) => (
            <option
              key={venue.id}
              value={venue.id}
            >
              {venue.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full justify-between gap-2">
        <label
          htmlFor="type"
          className="font-medium text-black"
        >
          Event type
        </label>
        <select
          id="type"
          value={selectedType}
          onChange={(event) =>
            onTypeChange(
              event.target.value as
                | EventType
                | "",
            )
          }
          className="rounded border border-[#403939] bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">
            All types
          </option>
          <option value="crowd-density">
            Crowd density
          </option>
          <option value="unauthorised-access">
            Unauthorised access
          </option>
          <option value="unattended-object">
            Unattended object
          </option>
          <option value="fight">
            Fight
          </option>
        </select>
      </div>

      <div className="flex w-full justify-between gap-2">
        <label
          htmlFor="severity"
          className="font-medium text-black"
        >
          Severity
        </label>

        <select
          id="severity"
          value={selectedSeverity}
          onChange={(event) =>
            onSeverityChange(
              event.target.value as
                | Severity
                | "",
            )
          }
          className="rounded border border-[#403939] bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">
            All severities
          </option>
          <option value="low">
            Low
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="high">
            High
          </option>
        </select>
      </div>
    </div>
  );
}