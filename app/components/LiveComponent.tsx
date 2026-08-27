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
      <div className="loading-overlay">
        <Image
          src="/images/loading-spinner.gif"
          alt="Loading..."
          width={150}
          height={150}
          className="loading-spinner"
        />
      </div>
    );
  }
  if (error) {
    return (
      <p className={styles.error} role="alert">
        {error}
      </p>
    );
  }

  return (
    <section className={styles["live-component"]}>
      <header>
        <h1 className={styles["header"]}>Augur exercise</h1>
      </header>
      <div className={styles["filter-container"]}>
        <label htmlFor="venue">Venue</label>
        <select
          id="venue"
          value={selectedVenueId}
          onChange={(e) => setSelectedVenueId(e.target.value)}
        >
          <option value="">Select a venue</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["map-container"]}></div>
    </section>
  );
}
