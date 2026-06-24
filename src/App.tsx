import { useState } from "react";
import { Header } from "./components/Header";
import { HabitFrom } from "./components/HabitFrom";
import { HabitList, type Habit } from "./components/HabitList";

export default function App() {
  const [habits, setHabits] = useState<Habit>([]);

  function addHabit(name: string) {
    // console.log(name);
    // setHabits((prev) => [...prev, { id: crypto.randomUUID(), name }]);
    setHabits((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitFrom addHabit={ addHabit } />
      <HabitList habits={ habits } />
    </div>
  );
}