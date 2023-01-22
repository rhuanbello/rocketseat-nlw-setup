import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { DatesFromYearStartProps, generateDatesFromYearBeginning } from "../utils/genareteDatesFromYearBeginning";

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

let datesFromYearStart: DatesFromYearStartProps[] = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 13 * 7; // 13 weeks * 7 days = 91 days
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

if (amountOfDaysToFill > 0) {
  datesFromYearStart = [
    ...datesFromYearStart,
    ...Array.from({ length: amountOfDaysToFill }, () => false) as false[]
  ]
}

export function Home() {
  const { navigate } = useNavigation();
  const [ loading, setLoading ] = useState(false);
  const [ summary, setSummary ] = useState<SummaryProps[] | null>(null);

  const getSummary = () => {
    setLoading(true);

    api
      .get('/summary')
      .then(({ data }) => {
        console.log('data', data)
        // setSummary(response)
      })
      .catch(( error ) => {
        Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos');
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    // getSummary();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={i}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{
              width: DAY_SIZE
            }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date, i) => {
            const dayInSummary = summary?.find((day) => {
              return date && dayjs(date).isSame(day.date, 'day');
            })

            return (
              <HabitDay
                key={i}
                reachedHabitDate={Boolean(date)}
                {...(date && { date: date })}
                amount={dayInSummary?.amount}
                completed={dayInSummary?.completed}
                onPress={() => {
                  if (date) navigate('habit', { date: date.toISOString() })
                }}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}