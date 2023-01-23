import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors"
import clsx from 'clsx'
import Animated, {  ZoomIn, ZoomOut } from 'react-native-reanimated'

type CheckboxProps = {
  title: string;
  checked?: boolean;
} & TouchableOpacityProps


export const Checkbox = ({ title, checked, ...props }: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...props}
    >
      <Animated.View
        className={clsx('h-8 w-8 rounded-lg', {
          'items-center justify-center bg-green-500': checked,
          'bg-zinc-800': !checked
        })}
        entering={ZoomIn}
        exiting={ZoomOut}
      >
        {checked && (
          <Feather
            name='check'
            size={20}
            color={colors.white}
          />
        )}
      </Animated.View>

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}