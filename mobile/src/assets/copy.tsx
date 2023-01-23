import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={17}
      height={20}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.21 18.182H5.368V5.455h9.842m0-1.819H5.368c-.474 0-.93.192-1.265.533a1.833 1.833 0 00-.524 1.286v12.727c0 .482.188.945.524 1.286.336.34.79.532 1.265.532h9.842c.475 0 .93-.192 1.266-.532.335-.341.524-.804.524-1.286V5.455c0-.483-.189-.945-.524-1.286a1.775 1.775 0 00-1.265-.533zM12.526 0H1.79C1.315 0 .86.192.524.533A1.833 1.833 0 000 1.818v12.728h1.79V1.818h10.736V0z"
        fill="#fff"
        fillOpacity={0.5}
      />
    </Svg>
  );
}

export default SvgComponent;
