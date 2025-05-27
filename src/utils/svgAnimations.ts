/**
 * Biblioteca de generación de animaciones SVG
 * Proporciona funciones para agregar elementos de animación dentro de SVGs
 */

/**
 * Crea un elemento de animación de pulso para SVG
 * @returns String con el elemento de animación SVG
 */
export const createPulseAnimation = (): string => {
  return `
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="scale"
      values="1;1.1;1"
      dur="1.2s"
      begin="indefinite"
      repeatCount="1"
      additive="sum"
    />
  `;
};

/**
 * Crea un elemento de animación de rotación para SVG
 * @returns String con el elemento de animación SVG
 */
export const createRotateAnimation = (): string => {
  return `
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      values="0 50% 50%;360 50% 50%"
      dur="1s"
      begin="indefinite"
      repeatCount="1"
      additive="sum"
    />
  `;
};

/**
 * Crea un elemento de animación de morph/transformación para paths SVG
 * @param originalPath Path original
 * @param targetPath Path objetivo para la transformación
 * @returns String con el elemento de animación SVG
 */
export const createMorphAnimation = (originalPath: string, targetPath: string): string => {
  return `
    <animate
      attributeName="d"
      attributeType="XML"
      values="${originalPath};${targetPath};${originalPath}"
      dur="0.8s"
      begin="indefinite"
      repeatCount="1"
    />
  `;
};

/**
 * Crea un elemento de animación de destello/highlight para SVG
 * @returns String con el elemento de animación SVG
 */
export const createHighlightAnimation = (): string => {
  return `
    <animate
      attributeName="stroke-width"
      values="30;40;30"
      dur="0.6s"
      begin="indefinite"
      repeatCount="1"
    />
    <animate
      attributeName="stroke-opacity"
      values="1;0.8;1"
      dur="0.6s"
      begin="indefinite"
      repeatCount="1"
    />
  `;
};

/**
 * Crea un elemento de animación de rebote para SVG
 * @returns String con el elemento de animación SVG
 */
export const createBounceAnimation = (): string => {
  return `
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="translate"
      values="0 0;0 -10;0 0"
      dur="0.8s"
      begin="indefinite"
      repeatCount="1"
      additive="sum"
    />
  `;
};

/**
 * Genera animaciones para un SVG basado en el tipo especificado
 * @param svgContent Contenido del SVG
 * @param animationType Tipo de animación a aplicar
 * @returns String con el SVG modificado incluyendo animaciones
 */
export const addAnimationToSvg = (
  svgContent: string,
  animationType: string | string[] = 'pulse',
): string => {
  const types = Array.isArray(animationType) ? animationType : [animationType];

  // Buscar el elemento path en el SVG
  const pathMatch = svgContent.match(/<path[^>]*>/);
  if (!pathMatch) return svgContent;

  const originalPath = pathMatch[0];
  let animatedPath = originalPath;

  // Añadir las animaciones necesarias
  if (!animatedPath.endsWith('>')) {
    return svgContent;
  }

  // Eliminar el '>' final para añadir animaciones y luego cerrarlo
  animatedPath = animatedPath.substring(0, animatedPath.length - 1);

  // Añadir todas las animaciones solicitadas
  types.forEach((type) => {
    switch (type) {
      case 'pulse':
        animatedPath += createPulseAnimation();
        break;
      case 'rotate':
        animatedPath += createRotateAnimation();
        break;
      case 'highlight':
        animatedPath += createHighlightAnimation();
        break;
      case 'bounce':
        animatedPath += createBounceAnimation();
        break;
      // Morph necesita más información, se maneja separadamente
      default:
        break;
    }
  });

  // Cerrar el path
  animatedPath += '>';

  // Reemplazar el path original con el animado
  return svgContent.replace(originalPath, animatedPath);
};

/**
 * Procesa un archivo SVG y añade las animaciones especificadas
 * @param svgContent Contenido del SVG
 * @param options Opciones de animación
 * @returns SVG modificado con animaciones
 */
export const processSvgAnimation = (
  svgContent: string,
  options: {
    type?: string | string[];
    duration?: number;
  } = {},
): string => {
  const { type = 'pulse', duration = 0.8 } = options;

  // Asegurarse de que el SVG usa IDs únicos para las animaciones
  const uniqueId = `anim_${Math.random().toString(36).substr(2, 9)}`;

  // Agregar animaciones al SVG
  let modifiedSvg = addAnimationToSvg(svgContent, type);

  // Ajustar la duración de las animaciones si es necesario
  if (duration !== 0.8) {
    modifiedSvg = modifiedSvg.replace(/dur="([^"]+)"/g, `dur="${duration}s"`);
  }

  // Asegurarse de que las animaciones tengan IDs únicos
  modifiedSvg = modifiedSvg.replace(/id="([^"]+)"/g, `id="${uniqueId}_$1"`);

  return modifiedSvg;
};
