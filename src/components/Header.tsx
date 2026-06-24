import { format, isSameDay } from "date-fns";
import { useHabits } from "../context/useHabits";
import { Button } from "./Button";

type HeaderProps = {
  visibleDates: Date[];
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
};

export function Header({ visibleDates, onPrevWeek, onNextWeek }: HeaderProps) {
  const { habits } = useHabits();
  const doneToday = habits?.filter((h) =>
    h.completions.some((c) => isSameDay(c, new Date())),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates[visibleDates.length - 1], "MMM d")}`;

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-sm text-zinc-400">
          {doneToday} / {habits?.length} done today
        </span>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>

        <div className="flex items-center gap-3">
          <Button onClick={onPrevWeek}>Prev</Button>
          <Button
            onClick={onNextWeek}
            disabled={visibleDates.some((d) => isSameDay(d, new Date()))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
