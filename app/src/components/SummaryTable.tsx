import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Summary } from "../types/summary";
import { SummaryDatesProps } from "../types/summary";
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
  const [summary, setSummary] = useState<Summary[]>([])

  const getSummary = () => {
    api
      .get('summary')
      .then(({ data }) => {
        setSummary(data)
      })
  }

  useEffect(() => {
    getSummary();
  }, []);

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
        {summaryDates.map((date, i) => {
          const dayInSummary = summary.find((day) => {
            return date && dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={i}
              reachedHabitDate={Boolean(date)}
              {...(date && { date: date })}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}
      </div>
    </div >
  )
}