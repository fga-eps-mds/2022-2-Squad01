import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.827 10.387a20.13 20.13 0 008.786 8.786l2.934-2.933c.373-.373.893-.48 1.36-.333 1.493.493 3.093.76 4.76.76A1.333 1.333 0 0124 18v4.667A1.334 1.334 0 0122.667 24 22.667 22.667 0 010 1.333 1.333 1.333 0 011.333 0H6a1.333 1.333 0 011.333 1.333c0 1.667.267 3.267.76 4.76.147.467.04.987-.333 1.36l-2.933 2.934z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
