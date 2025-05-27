import useSvgAnimation from '@/hooks/useSvgAnimation';
import { processSvgAnimation } from '@/utils/svgAnimations';

import React, { useEffect, useState } from 'react';

import Icon, { IconProps } from './Icon';

type AnimationType = 'pulse' | 'rotate' | 'morph' | 'highlight' | 'bounce';

export interface AnimatedIconProps extends IconProps {
  animationType?: AnimationType | AnimationType[];
  animationTrigger?: 'hover' | 'active' | 'auto';
  animationDuration?: number;
  isActive?: boolean;
}

/**
 * Componente de icono animado que extiende el componente Icon regular
 */
const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  svgIcon,
  icon,
  animationType = 'pulse',
  animationTrigger = 'hover',
  animationDuration = 0.8,
  isActive = false,
  ...props
}) => {
  const { svgRef, startAnimation } = useSvgAnimation({
    trigger: animationTrigger,
    type: animationType,
    duration: animationDuration,
  });

  // Iniciar animación cuando isActive cambia a true
  useEffect(() => {
    if (isActive && animationTrigger === 'active') {
      startAnimation();
    }
  }, [isActive, animationTrigger, startAnimation]);

  return (
    <span
      ref={(node) => {
        if (node) {
          // Asignar la referencia al elemento SVG interno
          const svgElement = node.querySelector('svg');
          if (svgElement && svgRef.current !== svgElement) {
            svgRef.current = svgElement;
          }
        }
      }}
    >
      <Icon svgIcon={svgIcon} icon={icon} {...props} />
    </span>
  );
};

export default AnimatedIcon;
