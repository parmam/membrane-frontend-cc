import { useCallback, useEffect, useRef } from 'react';

type AnimationType = 'pulse' | 'rotate' | 'morph' | 'highlight' | 'bounce';

interface UseSvgAnimationOptions {
  trigger?: 'hover' | 'active' | 'auto';
  type?: AnimationType | AnimationType[];
  duration?: number;
  delay?: number;
}

/**
 * Hook personalizado para gestionar animaciones SVG
 *
 * @param options Opciones de configuración para la animación
 * @returns Objeto con referencias y funciones para controlar la animación
 */
const useSvgAnimation = (options: UseSvgAnimationOptions = {}) => {
  const { trigger = 'hover', type = 'pulse', duration = 0.8, delay = 0 } = options;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const animationsRef = useRef<SVGAnimateElement[]>([]);

  // Función para iniciar la animación
  const startAnimation = useCallback(() => {
    if (!svgRef.current || !animationsRef.current.length) return;

    animationsRef.current.forEach((anim) => {
      // Reiniciar la animación
      anim.beginElement();
    });
  }, []);

  // Función para detener la animación
  const stopAnimation = useCallback(() => {
    if (!svgRef.current || !animationsRef.current.length) return;

    animationsRef.current.forEach((anim) => {
      try {
        anim.endElement();
      } catch (e) {
        // Algunas implementaciones de navegador no soportan endElement
        // Ignoramos el error
      }
    });
  }, []);

  // Función para recolectar referencias a las animaciones cuando el SVG es renderizado
  const collectAnimations = useCallback(() => {
    if (!svgRef.current) return;

    // Encontrar todas las animaciones dentro del SVG
    const animations = svgRef.current.querySelectorAll('animate, animateTransform, animateMotion');
    animationsRef.current = Array.from(animations) as SVGAnimateElement[];

    // Si es animación automática, comenzar inmediatamente
    if (trigger === 'auto') {
      startAnimation();
    }
  }, [trigger, startAnimation]);

  // Configurar event listeners según el trigger
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    collectAnimations();

    if (trigger === 'hover') {
      svg.addEventListener('mouseenter', startAnimation);
      svg.addEventListener('mouseleave', stopAnimation);
    } else if (trigger === 'active') {
      // La animación se controlará externamente con startAnimation
    }

    return () => {
      if (trigger === 'hover') {
        svg.removeEventListener('mouseenter', startAnimation);
        svg.removeEventListener('mouseleave', stopAnimation);
      }
    };
  }, [trigger, collectAnimations, startAnimation, stopAnimation]);

  return {
    svgRef,
    startAnimation,
    stopAnimation,
    collectAnimations,
  };
};

export default useSvgAnimation;
