import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import { IconStyleVariant, RotationQuarter } from './types';

export interface CoreIconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  inline?: boolean;
  variant?: IconStyleVariant;
  rotation?: RotationQuarter;
}

export function CoreIcon(props: CoreIconProps) {
  const { name, size = 18, color, className, inline = false, variant, rotation = RotationQuarter.None } = props;

  const style: React.CSSProperties = {};
  if (variant === IconStyleVariant.Fill) {
    style.fill = 'currentColor';
  } else if (variant === IconStyleVariant.Stroke) {
    style.fill = 'none';
  }

  return (
    <IconifyIcon
      icon={name}
      width={size}
      height={size}
      color={color}
      className={className}
      inline={inline}
      rotate={rotation}
      style={style}
    />
  );
}

