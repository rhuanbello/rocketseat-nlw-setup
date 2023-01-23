import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface ProgressBarProps {
  progress?: number;
}

export const ProgressBar = ({ progress = 0 }: ProgressBarProps) => {
  const sharedProgress = useSharedValue(progress);

  useEffect(() => {
    sharedProgress.value = withTiming(progress);
  }, [progress])
  

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View
        className="h-3 rounded-xl bg-violet-600"
        style={animatedStyle}
      />
    </View>
  )
}