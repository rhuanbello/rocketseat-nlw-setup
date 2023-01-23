import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";

export interface HabitDayProps {
  date?: Date;
  completed?: number;
  amount?: number;
  reachedHabitDate: boolean;

  getSummary: () => void;
}

export const HabitDay = ({ reachedHabitDate, completed = 0, amount = 0, date, getSummary }: HabitDayProps) => {
  const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);
  
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background`, {
          'opacity-40 cursor-not-allowed pointer-events-none': !reachedHabitDate,
          'bg-zinc-900 border-zinc-800': reachedHabitDate && progress === 0,
          'bg-violet-900 border-violet-700': reachedHabitDate && progress > 0 && progress < 20,
          'bg-violet-800 border-violet-600': reachedHabitDate && progress >= 20 && progress < 40,
          'bg-violet-700 border-violet-500': reachedHabitDate && progress >= 40 && progress < 60,
          'bg-violet-600 border-violet-500': reachedHabitDate && progress >= 60 && progress < 80,
          'bg-violet-500 border-violet-400': reachedHabitDate && progress >= 80,
          'border-white border-2': isCurrentDay
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={progress} />

          <HabitsList date={date} onCompletedChange={() => getSummary()} />
          
          <Popover.Arrow className="fill-zinc-900" height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}