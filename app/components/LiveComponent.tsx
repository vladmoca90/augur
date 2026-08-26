"use client";
import styles from "../styles/augur.module.css";

const baseUrl = "https://frontend-takehome-server-production.up.railway.app";
const venuesUrl = `${baseUrl}/api/venues`;
const eventsUrl = `${baseUrl}/api/events/stream`;

export default function LiveComponent() {
  return (
    <section className={styles["live-component"]}>
      <header>
        <h1 className={styles["header"]}>Augur exercise</h1>
      </header>
      <div className={styles["map-container"]}>

      </div>
    </section>
  );
}
