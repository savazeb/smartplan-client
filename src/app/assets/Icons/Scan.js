import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import color from "../../config/color";

export default ({ size }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15.902 15.246"
    >
      <G data-name="Group 5" fill="none" stroke={color.primary} strokeWidth={2}>
        <Path data-name="Path 10" d="M1 4.139V.999h3.141" />
        <Path data-name="Path 11" d="M14.903 4.139V.999h-3.141" />
        <Path data-name="Path 12" d="M14.903 11.105v3.14h-3.141" />
        <Path data-name="Path 13" d="M1 11.105v3.14h3.141" />
        <Path data-name="Line 8" d="M.67 7.678h14.375" />
      </G>
    </Svg>
  );
};
