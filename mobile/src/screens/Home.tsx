import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

import { DatesFromYearStartProps, generateDatesFromYearBeginning } from "../utils/genareteDatesFromYearBeginning";

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
          {datesFromYearStart.map((date, i) => (
            <HabitDay
              key={i}
              reachedHabitDate={Boolean(date)}
              onPress={() => {
                if (date) navigate('habit', { date: date.toISOString() })
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}