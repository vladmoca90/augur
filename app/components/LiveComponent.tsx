"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/augur.module.css";
import { allUrls } from "./../api/api";
import { Venue } from "../types/venues";
import { DetectionEvent, EventType, Severity, StreamStatus } from "../types/events";
import { EventFilters } from "../types/filters";
import { buildEventStreamUrl } from "./StreamEventComponent";

export default function LiveComponent() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [selectedType, setSelectedType] = useState<EventType | "">("");
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "">("");
  const [events, setEvents] = useState<DetectionEvent[]>([]);
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("connecting");

  const filters: EventFilters = {
    venueId: selectedVenueId,
    type: selectedType,
    severity: selectedSeverity,
  };

  const streamUrl = buildEventStreamUrl(filters);

  const getVenues = useCallback(async () => {
    try {
      const res = await fetch(allUrls.venues);

      if (!res.ok) {
        throw new Error("The data is not valid!");
      }

      const data = await res.json();
      setVenues(data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);

      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getVenues();
  }, [getVenues]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/loading-buffering.gif"
          alt="Loading venues"
          width={150}
          height={150}
        />

        <p className="mt-8 text-center text-xl text-black">Loading venues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-xl text-red-800" role="alert">
        {error}
      </p>
    );
  }

  return (
    <section className="mx-auto w-full w-full overflow-hidden rounded-xl border border-[#403939] bg-white">
      <header>
        <h1 className="m-0 border-b border-[#403939] py-4 text-center text-xl font-semibold uppercase text-black">
          Augur Exercise
        </h1>
      </header>
      <div className="dropdowns-container flex items-center flex-col gap-4 p-4">
        <div className="flex justify-between gap-2 w-full">
          <label htmlFor="venue" className="font-medium text-black">
            Venue
          </label>
          <select
            id="venue"
            value={selectedVenueId}
            onChange={(event) => setSelectedVenueId(event.target.value)}
            className="rounded border border-[#403939] bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All venues</option>

            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between gap-2 w-full">
          <label htmlFor="type" className="font-medium text-black">
            Event type
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className="rounded border border-[#403939] bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All types</option>
            <option value="crowd-density">Crowd density</option>
            <option value="unauthorised-access">Unauthorised access</option>
            <option value="unattended-object">Unattended object</option>
            <option value="fight">Fight</option>
          </select>
        </div>
        <div className="flex justify-between gap-2 w-full">
          <label htmlFor="severity" className="font-medium text-black">
            Severity
          </label>
          <select
            id="severity"
            value={selectedSeverity}
            onChange={(event) => setSelectedSeverity(event.target.value)}
            className="rounded border border-[#403939] bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="map-container overflow-x-auto">
        {JSON.stringify(venues, null, 2)}
      </div>
    </section>
  );
}
