"use client";
import styles from "./styles/augur.module.css";
import LiveComponent from "./components/LiveComponent";

export default function AugurExercise() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8">
      <LiveComponent />
    </main>
  );
}
