import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";
import { generateProgressPercentage } from '../utils/generateProgressPercentage'
import clsx from "clsx";

interface HabitProps {
  date: string;
}

interface HabitInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
  }>,
  completedHabits: string[];
}

export const Habit = () => {
  const [loading, setLoading] = useState(false);
  const [habitInfo, setHabitInfo] = useState<HabitInfoProps | null>(null);

  const route = useRoute();
  const { date } = route.params as HabitProps;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress = habitInfo?.possibleHabits.length ? generateProgressPercentage(
    habitInfo.possibleHabits.length, 
    habitInfo.completedHabits.length) 
  : 0;

   const getHabits = () => {
    setLoading(true);

    api
      .get('/day', {
        params: { date }
      })
      .then(({ data }) => {
        setHabitInfo(data)
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Ops', 'Não foi possível buscar os hábitos');
      })
      .finally(() => setLoading(false))
  }

  const patchToggleHabit = (habitId: string) => {
    api
      .patch(`/habit/${habitId}/toggle`)
      .then(() => {
        handleToggleHabit(habitId);
      })
      .catch((error) => {
        console.log(error) 
        Alert.alert('Ops', 'Não foi possível alterar o hábito');
      })
      .finally(() => setLoading(false))
  }

  const handleToggleHabit = (habitId: string) => {
    const completedHabits = [...habitInfo?.completedHabits!];
    const index = completedHabits.findIndex((x) => x === habitId);

    if (index === -1) {
      completedHabits.push(habitId);
    } else {
      completedHabits.splice(index, 1);
    }

    setHabitInfo((previousState) => ({
      ...previousState!,
      completedHabits
    }));
  }

  useEffect(() => {
    getHabits();
  }, [])

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          'opacity-50': isDateInPast
        })}>
          {habitInfo?.possibleHabits.length ? (
            habitInfo?.possibleHabits?.map(({ id, title }) => (
              <Checkbox
                key={id}
                title={title}
                checked={habitInfo?.completedHabits?.includes(id)}
                disabled={isDateInPast}
                onPress={() => patchToggleHabit(id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {
          isDateInPast && (
            <Text className="text-white mt-10 text-center">
              Você não pode editar hábitos de uma data passada.
            </Text>
          )
        }
      </ScrollView>
    </View>
  );
}