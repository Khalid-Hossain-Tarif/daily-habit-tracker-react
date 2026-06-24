import { useState } from "react";
import { Header } from "./components/Header";
import { HabitFrom } from "./components/HabitFrom";
import { HabitList, type Habit } from "./components/HabitList";
import { isSameDay } from "date-fns";
import { HabitProvider } from "./context/HabitProvider";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header />
        <HabitFrom />
        <HabitList />
      </HabitProvider>
    </div>
  );
}
