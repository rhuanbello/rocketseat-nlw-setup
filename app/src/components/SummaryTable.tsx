import { SummaryDatesProps } from "../types/summaryDates";
import { generateDatesFromYearBeginning } from "../utils/genareteDatesFromYearBeginning"
import { HabitDay } from "./HabitDay"

const weekDays = [
  'D', 'S', 'T', 'Q', 'Q', 'S', 'S'
]

let summaryDates: SummaryDatesProps[] = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks * 7 days = 126 days
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

if (amountOfDaysToFill > 0) {
  summaryDates = [
    ...summaryDates,
    ...Array.from({ length: amountOfDaysToFill }, () => false) as false[]
  ]
}

export const SummaryTable = () => {
  return (
    <div className="w-full flex" >
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, i) => (
          <HabitDay
            key={i}
            reachedHabitDate={Boolean(date)}
            amount={5}
            completed={Math.round(Math.random() * 5)}
          />
        ))}
      </div>
    </div >
  )
}