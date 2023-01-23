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
        d="M6.96 0h10.08C20.88 0 24 3.12 24 6.96v10.08A6.96 6.96 0 0117.04 24H6.96C3.12 24 0 20.88 0 17.04V6.96A6.96 6.96 0 016.96 0zm-.24 2.4A4.32 4.32 0 002.4 6.72v10.56a4.317 4.317 0 004.32 4.32h10.56a4.32 4.32 0 004.32-4.32V6.72a4.317 4.317 0 00-4.32-4.32H6.72zM18.3 4.2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 6a6 6 0 110 12 6 6 0 010-12zm0 2.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
