interface HabitDayProps {
  // completed: number;
  reachedHabitDate: boolean;
}

export const HabitDay = ({ reachedHabitDate }: HabitDayProps) => {
  return (
    <div className={`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg ${!reachedHabitDate && 'opacity-40 cursor-not-allowed'}`} />
  )
}