"use client";
import styles from "./Augur.module.css";
import LiveComponent from "./components/LiveComponent";

export default function AugurExercise() {
  return (
    <main className={styles.container}>
      <LiveComponent />
    </main>
  );
}
