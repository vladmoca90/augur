"use client";
import {
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { allUrls } from "../api/api";
import {
  DetectionEvent,
  EventType,
  Severity,
  StreamStatus,
} from "../types/events";
import loadingImage from "../images/loading-buffering.gif";
import type { Venue } from "../types/venues";
import type { EventFilters } from "../types/filters";
import { buildEventStreamUrl } from "./StreamEventComponent";
import FiltersComponent from "./FilterMapComponent";
import MapComponent from "./MapComponent";

export default function LiveComponent() {
  const [venues, setVenues] =
    useState<Venue[]>([]);

  const [events, setEvents] =
    useState<DetectionEvent[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [selectedVenueId, setSelectedVenueId] =
    useState("");

  const [selectedType, setSelectedType] =
    useState<EventType | "">("");

  const [
    selectedSeverity,
    setSelectedSeverity,
  ] = useState<Severity | "">("");

  const [streamStatus, setStreamStatus] =
    useState<StreamStatus>("connecting");

  const [streamError, setStreamError] =
    useState<string | null>(null);

  const filters: EventFilters = {
    venueId: selectedVenueId,
    type: selectedType,
    severity: selectedSeverity,
  };

  const streamUrl =
    buildEventStreamUrl(filters);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response =
          await fetch(allUrls.venues);

        if (!response.ok) {
          throw new Error(
            "Failed to load venues.",
          );
        }

        const data: Venue[] =
          await response.json();

        setVenues(data);
      } catch (error) {
        console.error(
          "Failed to fetch venues:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong",
        );
      } finally {
        setIsLoading(false);
      }
    };

    getVenues();
  }, []);

  useEffect(() => {
    setEvents([]);
    setStreamStatus("connecting");
    setStreamError(null);

    const eventSource =
      new EventSource(streamUrl);

    eventSource.onopen = () => {
      setStreamStatus("connected");
      setStreamError(null);
    };

    eventSource.addEventListener(
      "detection",
      (
        event: MessageEvent<string>,
      ) => {
        try {
          const detectionEvent =
            JSON.parse(
              event.data,
            ) as DetectionEvent;

          setEvents(
            (currentEvents) =>
              [
                detectionEvent,
                ...currentEvents,
              ].slice(0, 200),
          );
        } catch (error) {
          console.error(
            "Invalid detection event:",
            error,
          );
        }
      },
    );

    eventSource.onerror = () => {
      setStreamStatus(
        "reconnecting",
      );

      setStreamError(
        "Live stream disconnected. Reconnecting...",
      );
    };

    return () => {
      eventSource.close();
    };
  }, [streamUrl]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          src={loadingImage}
          alt="Loading venues"
          width={120}
          height={120}
        />

        <p className="mt-8 text-center text-xl text-black">
          Loading venues...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p
        className="text-center text-xl text-red-800"
        role="alert"
      >
        {error}
      </p>
    );
  }

  return (
    <section className="mx-auto mt-4 w-full overflow-hidden border border-[#403939] bg-white md:max-w-[768px] lg:max-w-[992px]">
      <header>
        <h1 className="border-b border-[#403939] py-4 text-center text-xl font-semibold uppercase text-black">
          Augur Exercise
        </h1>
      </header>

      <FiltersComponent
        venues={venues}
        selectedVenueId={
          selectedVenueId
        }
        selectedType={
          selectedType
        }
        selectedSeverity={
          selectedSeverity
        }
        onVenueChange={
          setSelectedVenueId
        }
        onTypeChange={
          setSelectedType
        }
        onSeverityChange={
          setSelectedSeverity
        }
      />

      <div className="border-t border-[#403939] p-4 text-black">
        <p>
          Stream status:{" "}
          <strong>
            {streamStatus}
          </strong>
        </p>

        {streamError && (
          <p
            className="mt-2 text-red-700"
            role="alert"
          >
            {streamError}
          </p>
        )}
      </div>

      {events.length === 0 &&
        streamStatus ===
          "connected" && (
          <p
            className="border-t border-[#403939] p-4 text-center text-black"
            aria-live="polite"
          >
            Waiting for detection
            events...
          </p>
        )}

      <div className="border-t border-[#403939]">
        <MapComponent
          venues={venues}
          events={events}
          selectedVenueId={
            selectedVenueId
          }
        />
      </div>
    </section>
  );
}