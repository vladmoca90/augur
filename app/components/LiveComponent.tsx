"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/augur.module.css";
import { error } from "next/dist/build/output/log";
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
      const response = await fetch(venuesUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Venues data:", data);
      setVenues(data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  }, []);

  useEffect(() => {
    getVenues();
  }, [getVenues]);

  return (
    <section className={styles["live-component"]}>
      <header>
        <h1 className={styles["header"]}>Augur exercise</h1>
      </header>
      {isLoading && <p className="lazy-loading-text">Loading...</p>}
      {error && <p className="error-text">Error loading venues: {error}</p>}
      {!isLoading && !error && (
        <>
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
        </>
      )}

      <div className={styles["map-container"]}></div>
    </section>
  );
}
