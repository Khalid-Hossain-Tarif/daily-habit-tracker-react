import { Button } from "./Button";

export function HabitFrom() {
  return (
    <form className="flex gap-2">
      <input
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."
      />

      <Button className="py-2 px-5">Add Habit</Button>
    </form>
  );
}
