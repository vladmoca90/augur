"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/augur.module.css";
import { Venues } from "../types/venues";

const baseUrl = "https://frontend-takehome-server-production.up.railway.app";
const venuesUrl = `${baseUrl}/api/venues`;
const eventsUrl = `${baseUrl}/api/events/stream`;

export default function LiveComponent() {
  const [venues, setVenues] = useState<Venues[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState("");

  const getVenues = useCallback(async () => {
    try {
      const res = await fetch(venuesUrl);

      if (!res.ok) {
        throw new Error("The data is not valid!");
      }

      const data = await res.json();
      setVenues(data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);

      setError(
    error instanceof Error
      ? error.message
      : "Something went wrong"
  );
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
          src="/images/loading-spinner.gif"
          alt="Loading venues"
          width={150}
          height={150}
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
    <section className="mx-auto w-full max-w-[550px] overflow-hidden rounded-xl border border-[#403939] bg-white">
      <header>
        <h1 className="m-0 border-b border-[#403939] py-4 text-center text-xl font-semibold uppercase text-black">
          Augur Exercise
        </h1>
      </header>

      <div className="flex items-center justify-between gap-4 p-4">
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
            setSelectedVenueId(
              event.target.value
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

      <div className="mb-8 h-[480px] w-full bg-gray-100">
        Map goes here
      </div>
    </section>
  );
}