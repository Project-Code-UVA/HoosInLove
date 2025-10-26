import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export default function ChatIcon({ height = 30.5 }) {
  const width = (41 / 32) * height; // maintain original aspect ratio

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 41 32"
      fill="none"
    >
      <Rect
        x="0.805894"
        y="0.805894"
        width="38.5182"
        height="24.1768"
        rx="12.0884"
        fill="#002562"
        stroke="#002562"
        strokeWidth="1.61179"
      />
      <Path
        d="M29.2848 24.9644C29.2848 24.9644 34.4869 28.3696 37.7797 30.6326C41.0725 32.8957 35.4458 22.0133 35.4458 22.0133"
        stroke="#002562"
        strokeWidth="1.61179"
      />
      <Path
        d="M35.1137 22.565L29.3809 24.9827C29.3809 24.9827 37.2635 29.0122 37.9801 29.8181C38.6968 30.624 35.1137 22.565 35.1137 22.565Z"
        fill="#002562"
        stroke="#002562"
        strokeWidth="1.61179"
      />
    </Svg>
  );
}
