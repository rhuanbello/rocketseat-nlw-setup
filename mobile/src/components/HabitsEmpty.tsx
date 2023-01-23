import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"

export const HabitsEmpty = () => {
  const { navigate } = useNavigation()

  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito.

      <Text className="text-violet-400 underline text-base active:text-violet-500"
        onPress={() => navigate('new')}  
      > 
        Comece cadastrando um 
      </Text>
    </Text>
  )
}