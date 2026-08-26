"use client";
import styles from "./styles/augur.module.css";
import LiveComponent from "./components/LiveComponent";

export default function AugurExercise() {
  return (
    <main className={styles.container}>
      <LiveComponent />
    </main>
  );
}
