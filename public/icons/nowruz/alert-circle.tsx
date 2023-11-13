import { SvgProps } from './svg.types';

export const AlertCircle: React.FC<SvgProps> = ({ stroke, fill, width, height }) => {
  return (
    <svg
      width={`${width || 24}`}
      height={`${height || 24}`}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={stroke || 'black'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
