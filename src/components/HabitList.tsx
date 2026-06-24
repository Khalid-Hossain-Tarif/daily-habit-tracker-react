import { useHabits, type Habit } from "../context/useHabits";
import { Button } from "./Button";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
  subDays,
} from "date-fns";

export function HabitList() {
  const { habits } = useHabits();

  if (habits?.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        No habits added yet. Add one above to get started!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits?.map((habit) => {
        return <HabitItem key={habit.id} habit={habit} />;
      })}
    </div>
  );
}

type HabitItemProps = {
  habit: Habit;
};

function HabitItem({ habit }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits();

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streak = getStreak(habit.completions);

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          {streak !== 0 && (
            <span className="text-sm text-amber-400">🔥 {streak}</span>
          )}
        </div>

        <Button onClick={() => deleteHabit(habit.id)} variant="destructive">
          Delete
        </Button>
      </div>

      <div className="flex gap-1.5">
        {visibleDates.map((date) => {
          return (
            <Button
              key={date.toISOString()}
              onClick={() => toggleHabit(habit.id, date)}
              className="grow flex flex-col gap-1  items-center rounded-lg text-xs"
              variant={
                habit.completions.some((d) => isSameDay(d, date))
                  ? "primary"
                  : "secondary"
              }
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

function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some((c) => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}
