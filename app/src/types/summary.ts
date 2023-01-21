export interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export type SummaryDatesProps = Date | false;
