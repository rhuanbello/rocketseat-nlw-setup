import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type HabitsListProps = {
  date?: Date;
  onCompletedChange: () => void;
}

type HabitsInfoProps = {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>,

  completedHabits: string[];

}

export const HabitsList = ({ date, onCompletedChange }: HabitsListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps>();

  const getDay = () => {
    api
      .get('day', { 
        params: {
          date: date?.toISOString()
        }
      })
      .then(({ data }) => {
        setHabitsInfo(data)
      })
  }

  const patchToggleHabit = (id: string) => {
    api
      .patch(`habits/${id}/toggle`)
      .then(({ data }) => {
        getDay();
        onCompletedChange();
      })
  }

  useEffect(() => {
    getDay();
  }, []);

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits?.map(({ id, title }) => (
        <Checkbox.Root
          id={id}
          className="flex items-center gap-3 group focus:outline-none"
          onCheckedChange={() => patchToggleHabit(id)}
          checked={habitsInfo.completedHabits.includes(id)}
          disabled={isDateInPast  }
        >
          <div 
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background"
          >
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
  
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {title}
          </span>
       </Checkbox.Root>
      ))}

     
    </div>
  )
}