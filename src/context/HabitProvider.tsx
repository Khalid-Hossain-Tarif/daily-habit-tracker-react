import { isSameDay } from "date-fns";
import { useState, type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useState<Habit>([]);

  function addHabit(name: string) {
    // setHabits([...habits, { id: crypto.randomUUID(), name }]);
    // setHabits([...habits, { id: crypto.randomUUID(), name }]); // This is not the best way to update state when it depends on the previous state, because it can lead to bugs if multiple updates happen in quick succession. Instead, we should use the functional form of setState, which takes a function that receives the previous state and returns the new state.
    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((h) => h.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((curr) =>
      curr.map((h) => {
        if (h.id !== id) return h;

        const alreadyDone = h.completions.some((c) => isSameDay(c, date));
        const completions = alreadyDone
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date];

        return { ...h, completions };
      }),
    );
  }

  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext>
  );
}
