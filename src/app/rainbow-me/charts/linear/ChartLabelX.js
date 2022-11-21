import React, { useContext } from "react";
import { TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  // eslint-disable-next-line import/no-unresolved
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChartContext from "../../helpers/ChartContext";
import test from "../../../data/global";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const storeData = (value) => {
  "Worklet";
  try {
    AsyncStorage.setItem("@value", JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

function ChartLabelFactoryX(style) {
  return function ChartLabel({ format, ...props }) {
    const { [style]: val = 0 } = useContext(ChartContext);
    const formattedValue = useDerivedValue(
      () => {
        return format ? format(val.value) : val.value;
      },
      undefined,
      style + "formattedValue"
    );
    const textProps = useAnimatedStyle(
      () => {
        return {
          text: formattedValue.value,
        };
      },
      undefined,
      style + "textProps"
    );
    return (
      <AnimatedTextInput
        {...props}
        animatedProps={textProps}
        defaultValue={format ? format(val.value) : val.value}
        editable={false}
      />
    );
  };
}

export const ChartLabelX = ChartLabelFactoryX("originalX");
export const ChartLabelY = ChartLabelFactoryX("originalY");
