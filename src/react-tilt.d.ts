declare module 'react-tilt' {
  import { ComponentType, ReactNode } from 'react';

  interface TiltOptions {
    max?: number;
    scale?: number;
    speed?: number;
    perspective?: number;
  }

  interface TiltProps {
    className?: string;
    options?: TiltOptions;
    children?: ReactNode;
  }

  export const Tilt: ComponentType<TiltProps>;
}
