import { Button } from "./Button";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  startOfWeek,
} from "date-fns";

export function HabitList() {
  const habits = [{ id: "1", name: "Drink water" }];

  if (habits.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        No habits added yet. Add one above to get started!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => {
        return <HabitItem key={habit.id} habit={habit} />;
      })}
    </div>
  );
}

type HabitItemProps = {
  habit: { id: string; name: string };
};

function HabitItem({ habit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">🔥 {habit.streak}</span>
        </div>

        <Button variant="destructive">Delete</Button>
      </div>

      <div className="flex gap-1.5">
        {visibleDates.map((date) => {
          return (
            <Button
              key={date.toISOString()}
              disabled={true}
              className="grow flex flex-col gap-1  items-center rounded-lg text-xs"
            >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span>{format(date, "d")}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
