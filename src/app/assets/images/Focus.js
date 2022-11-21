import * as React from "react";
import Svg, { Path, G } from "react-native-svg";
import color from "../../config/color";

export default ({ size = 1 }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={260.928 * size}
      height={266.929 * size}
      viewBox="0 0 260.928 266.929"
    >
      <G
        data-name="Group 17"
        fill="none"
        stroke={color.primary}
        strokeWidth={5}
      >
        <Path data-name="Path 14" d="M2.5 29.429V2.499h26.928" />
        <Path data-name="Path 15" d="M258.428 29.429V2.499H231.5" />
        <Path data-name="Path 16" d="M2.5 237.5v26.93h26.928" />
        <Path data-name="Path 17" d="M258.428 237.5v26.93H231.5" />
      </G>
    </Svg>
  );
};
