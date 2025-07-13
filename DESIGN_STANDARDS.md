# Estándares de Diseño - Membrane Frontend

## Índice

1. [Introducción](#introducción)
2. [Sistema de Colores](#sistema-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado](#espaciado)
5. [Breakpoints](#breakpoints)
6. [Componentes](#componentes)
7. [Layouts](#layouts)
8. [Animaciones y Transiciones](#animaciones-y-transiciones)
9. [Convenciones CSS](#convenciones-css)
10. [Accesibilidad](#accesibilidad)
11. [Responsividad](#responsividad)
12. [Patrones de Desarrollo](#patrones-de-desarrollo)

---

## Introducción

Este documento establece los estándares de diseño para el proyecto Membrane Frontend, un sistema de gestión de dispositivos con soporte para temas claro y oscuro. El proyecto utiliza CSS Modules, CSS Custom Properties (variables) y TypeScript para mantener consistencia y escalabilidad.

## Sistema de Colores

### Paleta Principal

#### Tema Oscuro (Por defecto)

```css
/* Primarios */
--color-primary-main: #bd790b --color-primary-light: #e5a040 --color-primary-dark: #8a5a0a
  /* Secundarios */ --color-secondary-main: #ff9a4e --color-secondary-light: #ffbc85
  --color-secondary-dark: #dd7e2d /* Backgrounds */ --color-background-default: #0d0604
  --color-background-paper: #322e2c /* Textos */ --color-text-primary: #ffffff
  --color-text-secondary: #cccccc;
```

#### Tema Claro

```css
/* Backgrounds */
--color-background-default: #f5f5f5 --color-background-paper: #ffffff /* Textos */
  --color-text-primary: #333333 --color-text-secondary: #666666;
```

### Colores de Estado

```css
/* Éxito */
--color-success-main: #18d22b --color-success-light: #5ae768 --color-success-dark: #0fad21
  /* Error */ --color-error-main: #d32f2f --color-error-light: #ef5350 --color-error-dark: #b71c1c
  /* Divisores */ --color-divider: #e0e0e0 (claro) / rgb(87, 72, 49) (oscuro);
```

### Reglas de Uso

1. **Siempre usar variables CSS** en lugar de valores hardcoded
2. **Primario**: Para elementos principales como botones CTA, links activos
3. **Secundario**: Para elementos de soporte y accents
4. **Estados**: Success para confirmaciones, Error para alertas
5. **Textos**: Primary para contenido principal, Secondary para metadatos

## Tipografía

### Fuente Principal

```css
--font-family:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Escalas de Tamaño

```css
--font-size-xs: 0.75rem /* 12px */ --font-size-sm: 0.875rem /* 14px */ --font-size-md: 1rem
  /* 16px */ --font-size-lg: 1.25rem /* 20px */ --font-size-xl: 1.5rem /* 24px */;
```

### Pesos de Fuente

```css
--font-weight-light: 300 --font-weight-regular: 400 --font-weight-medium: 500
  --font-weight-bold: 700;
```

### Variantes de Typography

| Variante    | Tamaño   | Peso    | Uso                   |
| ----------- | -------- | ------- | --------------------- |
| `h1`        | 2.5rem   | light   | Títulos principales   |
| `h2`        | 2rem     | light   | Títulos de sección    |
| `h3`        | 1.75rem  | regular | Subtítulos            |
| `h4`        | 1.5rem   | regular | Títulos de tarjetas   |
| `h5`        | 1.25rem  | medium  | Encabezados menores   |
| `h6`        | 1rem     | medium  | Labels importantes    |
| `body1`     | 1rem     | regular | Texto principal       |
| `body2`     | 0.875rem | regular | Texto secundario      |
| `subtitle1` | 1rem     | medium  | Subtítulos destacados |
| `subtitle2` | 0.875rem | medium  | Subtítulos menores    |
| `caption`   | 0.75rem  | regular | Metadatos             |
| `overline`  | 0.75rem  | regular | Labels uppercase      |

## Espaciado

### Sistema de Espaciado

```css
--spacing-xs: 0.25rem /* 4px */ --spacing-sm: 0.5rem /* 8px */ --spacing-md: 1rem /* 16px */
  --spacing-lg: 1.5rem /* 24px */ --spacing-xl: 2rem /* 32px */;
```

### Reglas de Aplicación

1. **Containers principales**: `--spacing-xl` (32px)
2. **Elementos de formulario**: `--spacing-md` (16px)
3. **Elementos relacionados**: `--spacing-sm` (8px)
4. **Elementos muy cercanos**: `--spacing-xs` (4px)

## Breakpoints

### Definición de Breakpoints

```css
--breakpoint-xs: 600px --breakpoint-sm: 900px --breakpoint-md: 1200px --breakpoint-lg: 1536px
  --breakpoint-xl: 1920px;
```

### Uso en Media Queries

```css
@media (max-width: 768px) {
  /* Mobile */
}
@media (max-width: 900px) {
  /* Tablet */
}
@media (max-width: 1200px) {
  /* Desktop pequeño */
}
```

## Componentes

### Button

#### Variantes

- **contained**: Botón sólido con sombra
- **outlined**: Botón con borde
- **text**: Botón solo texto

#### Colores

- **primary**: Color primario del tema
- **secondary**: Color secundario del tema

#### Tamaños

- **small**: Padding reducido
- **medium**: Tamaño estándar
- **large**: Padding aumentado

#### Estructura

```typescript
interface ButtonProps {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
```

### Input

#### Características

- Label siempre visible
- Estados: normal, focus, error, disabled
- Feedback visual inmediato
- Compatibilidad con forwardRef

#### Estructura

```typescript
interface InputProps {
  label: string;
  error?: boolean;
  onChange?: (value: string) => void;
}
```

### Typography

#### Uso

```tsx
<Typography variant='h1' color='primary' align='center'>
  Título Principal
</Typography>
```

### Box

#### Propósito

Componente utilitario para layout flex similar a Material-UI Box

#### Props Principales

```typescript
interface BoxProps {
  display?: 'flex' | 'block' | 'inline' | 'inline-block';
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  gap?: number | string;
  padding?: number | string;
  margin?: number | string;
}
```

## Layouts

### MainLayout

#### Estructura

```
┌─────────────────────────────────────┐
│            Header (62px)            │
├─────────────┬───────────────────────┤
│   Sidebar   │                       │
│   (250px)   │    Content Area       │
│             │                       │
│             │                       │
└─────────────┴───────────────────────┘
```

#### Comportamiento Responsive

- **Desktop**: Sidebar fijo, content con margen
- **Tablet**: Sidebar overlay con backdrop
- **Mobile**: Sidebar drawer, content full-width

### AuthLayout

#### Características

- Centrado vertical y horizontal
- Fondo con gradiente o imagen
- Formulario con max-width limitado

## Animaciones y Transiciones

### Configuración Global

```css
--transition-duration: 0.3s;
--transition-timing: ease;
--transition-theme:
  background-color var(--transition-duration) var(--transition-timing),
  color var(--transition-duration) var(--transition-timing),
  border-color var(--transition-duration) var(--transition-timing);
```

### Patrones de Animación

#### Hover States

```css
.element:hover {
  background-color: rgba(128, 128, 128, 0.1);
  transition: background-color 0.2s ease;
}
```

#### Transform Animations

```css
.element {
  transition: transform 0.2s ease;
}

.element:hover {
  transform: scale(1.05);
}
```

### Animaciones Específicas

#### Dropdown Fade In

```css
@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

#### Loading Spinner

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

## Convenciones CSS

### Naming Convention

- **CSS Modules**: `ComponentName.module.css`
- **Classes**: camelCase para JS compatibility
- **Variables**: kebab-case con prefijo `--`

### Estructura de Archivos

```
src/view/
├── elements/          # Componentes básicos
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
├── components/        # Componentes compuestos
├── prototypes/        # Componentes específicos
└── layouts/           # Layouts principales
```

### Organización CSS

```css
/* 1. Estilos base */
.component {
  /* Layout */
  display: flex;
  position: relative;

  /* Dimensiones */
  width: 100%;
  height: auto;

  /* Espaciado */
  margin: 0;
  padding: var(--spacing-md);

  /* Tipografía */
  font-family: var(--font-family);
  font-size: var(--font-size-md);

  /* Colores */
  color: var(--color-text-primary);
  background-color: var(--color-background-paper);

  /* Efectos */
  border: 1px solid var(--color-divider);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Animaciones */
  transition: var(--transition-theme);
}

/* 2. Modificadores */
.component.variant {
}
.component.size {
}
.component.color {
}

/* 3. Estados */
.component:hover {
}
.component:focus {
}
.component:active {
}
.component:disabled {
}

/* 4. Media queries */
@media (max-width: 768px) {
  .component {
  }
}
```

## Accesibilidad

### Contraste

- **AA**: Mínimo 4.5:1 para texto normal
- **AAA**: Preferible 7:1 para texto normal
- **AA Large**: 3:1 para texto grande (18px+)

### Navegación por Teclado

- **Tab order**: Lógico y predecible
- **Focus visible**: Siempre visible
- **Escape**: Cierra modals y dropdowns

### ARIA Labels

```tsx
<button aria-label="Cerrar modal">
  <CloseIcon />
</button>

<input aria-describedby="email-error" />
<div id="email-error" role="alert">
  Email requerido
</div>
```

### Roles Semánticos

```tsx
<nav role="navigation">
<main role="main">
<aside role="complementary">
<div role="alert">
```

## Responsividad

### Principios Mobile-First

```css
/* Base (mobile) */
.component {
  padding: var(--spacing-sm);
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-lg);
  }
}
```

### Patrones de Layout

#### Cards Responsive

```css
.cardContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .cardContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cardContainer {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### Tablas Responsive

- **Desktop**: Tabla tradicional
- **Tablet**: Tabla con scroll horizontal
- **Mobile**: Cards apiladas

## Patrones de Desarrollo

### Componente Básico

```typescript
import { FunctionComponent } from 'react';
import clsx from 'clsx';
import styles from './Component.module.css';

interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

const Component: FunctionComponent<ComponentProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
  ...props
}) => {
  const classNames = clsx(
    styles.component,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <div className={classNames} {...props}>
      {/* Contenido */}
    </div>
  );
};

export default Component;
```

### Uso de CSS Variables

```css
/* Definir variables locales */
.component {
  --local-color: var(--color-primary-main);
  --local-size: var(--spacing-md);

  color: var(--local-color);
  padding: var(--local-size);
}

/* Modificar variables por contexto */
.component.secondary {
  --local-color: var(--color-secondary-main);
}
```

### Theming

```typescript
// Theme toggle
const toggleTheme = () => {
  document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme');
};
```

### Testing de Estilos

```typescript
// Test de clases CSS
expect(component).toHaveClass('component');
expect(component).toHaveClass('primary');

// Test de estilos computados
expect(component).toHaveStyle({
  color: 'var(--color-primary-main)',
  padding: 'var(--spacing-md)',
});
```

---

## Conclusión

Estos estándares aseguran:

- **Consistencia**: Todos los componentes siguen los mismos patrones
- **Escalabilidad**: Fácil agregar nuevos componentes
- **Mantenibilidad**: Cambios centralizados en variables
- **Accesibilidad**: Cumple con estándares web
- **Responsividad**: Funciona en todos los dispositivos

Para cualquier duda o propuesta de mejora, consultar con el equipo de desarrollo.
