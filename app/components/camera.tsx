import { SVGProps } from 'react';

const SvgCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={50}
    fill="none"
    {...props}
  >
    <rect
      width={60.294}
      height={43.382}
      x={0.368}
      y={6.25}
      stroke="#000"
      strokeWidth={0.735}
      rx={6.985}
    />
    <circle
      cx={30.515}
      cy={27.573}
      r={12.538}
      stroke="#000"
      strokeWidth={0.66}
    />
    <path
      stroke="#000"
      strokeWidth={0.735}
      d="M10.294.367h8.824a3.31 3.31 0 0 1 3.308 3.31V6.25H6.985V3.677a3.31 3.31 0 0 1 3.31-3.31Z"
    />
  </svg>
);
export default SvgCamera;

