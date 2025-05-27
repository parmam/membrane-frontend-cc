import fs from 'fs';
import path from 'path';

import { processSvgAnimation } from './svgAnimations';

/**
 * Esta función es para uso en tiempo de desarrollo/build
 * Procesa un directorio de archivos SVG y les añade animaciones
 *
 * @param inputDir Directorio de entrada con SVGs originales
 * @param outputDir Directorio de salida para SVGs animados
 * @param animationType Tipo de animación a aplicar
 */
export const processSvgDirectory = (
  inputDir: string,
  outputDir: string,
  animationType: string | string[] = 'pulse',
): void => {
  // Esta función está diseñada para usarse en un script de Node.js
  // No es para usarse en el frontend
  console.log(`Procesando SVGs de ${inputDir} a ${outputDir}`);

  // Asegurarse de que el directorio de salida exista
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Leer todos los archivos en el directorio de entrada
  const files = fs.readdirSync(inputDir);

  // Procesar cada archivo SVG
  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.svg') {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      try {
        // Leer el contenido del SVG
        const svgContent = fs.readFileSync(inputPath, 'utf8');

        // Procesar el SVG y agregar animaciones
        const animatedSvg = processSvgAnimation(svgContent, {
          type: animationType,
        });

        // Escribir el SVG animado al directorio de salida
        fs.writeFileSync(outputPath, animatedSvg);

        console.log(`Procesado con éxito: ${file}`);
      } catch (error) {
        console.error(`Error procesando ${file}:`, error);
      }
    }
  });

  console.log('Procesamiento completado');
};

// Nota: Esta función está pensada para usarse en tiempo de build,
// pero para este ejercicio modificaremos los SVGs en tiempo de ejecución
