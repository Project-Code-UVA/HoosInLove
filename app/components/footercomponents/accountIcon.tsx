import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function AccountIcon({ size = 22 }) {
  return (
    <Svg
      width={size}
      height={(size * 31) / 22}
      viewBox="0 0 22 31"
      fill="none"
    >
      <Circle cx="10.8376" cy="6.77184" r="6.77184" fill="#002562" />
      <Path
        d="M0.565796 30.5C2.2817 16.6585 4.78808 12.9743 11.5658 12.5C17.7475 13.6144 19.1944 18.717 20.5658 30.5H0.565796Z"
        fill="#002562"
        stroke="#002562"
      />
    </Svg>
  );
}
