import clsx from "clsx";
import dayjs from "dayjs";
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { generateProgressPercentage } from "../utils/generateProgressPercentage";

interface HabitDayProps extends TouchableOpacityProps {
  reachedHabitDate: boolean;
  date?: Date;
  amount?: number;
  completed?: number;
}

const WEEK_DAYS = 7;

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);


export const HabitDay = ({ 
  reachedHabitDate, 
  date,
  amount = 0,
  completed = 0, 
  ...props 
}: HabitDayProps) => {
  const progress = amount > 0 ? generateProgressPercentage(amount, completed) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);
  return (
    <TouchableOpacity
      className={clsx('bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800', {
        'opacity-40': !reachedHabitDate,
        'bg-zinc-900 border-zinc-800': reachedHabitDate && progress === 0,
        'bg-violet-900 border-violet-700': reachedHabitDate && progress > 0 && progress < 20,
        'bg-violet-800 border-violet-600': reachedHabitDate && progress >= 20 && progress < 40,
        'bg-violet-700 border-violet-500': reachedHabitDate && progress >= 40 && progress < 60,
        'bg-violet-600 border-violet-500': reachedHabitDate && progress >= 60 && progress < 80,
        'bg-violet-500 border-violet-400': reachedHabitDate && progress >= 80,
        'border-white border-2': isCurrentDay
      })}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE
      }}
      activeOpacity={0.7}
      {...props}
    />
  )
}