import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";

interface HabitDayProps {
  completed: number;
  amount: number;
  reachedHabitDate: boolean;
}

export const HabitDay = ({ reachedHabitDate, completed, amount }: HabitDayProps) => {
  const info = {
    day: 'terça-feira',
    date: '01/01',
  }

  const progress = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg`, {
          'opacity-40 cursor-not-allowed': !reachedHabitDate,
          'bg-zinc-900 border-zinc-800': reachedHabitDate && progress === 0,
          'bg-violet-900 border-violet-700': reachedHabitDate && progress > 0 && progress < 20,
          'bg-violet-800 border-violet-600': reachedHabitDate && progress >= 20 && progress < 40,
          'bg-violet-700 border-violet-500': reachedHabitDate && progress >= 40 && progress < 60,
          'bg-violet-600 border-violet-500': reachedHabitDate && progress >= 60 && progress < 80,
          'bg-violet-500 border-violet-400': reachedHabitDate && progress >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{info.day}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{info.date}</span>

          <ProgressBar progress={progress} />

          <Popover.Arrow className="fill-zinc-900" height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}