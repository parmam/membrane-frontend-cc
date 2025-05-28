## 1. Introduction and Overview

### 1.1. Purpose of this Document

This document provides a comprehensive overview of the `membrane-frontend-cc` project's design, architecture, and components. It serves as a guide for developers to understand the project structure, coding standards, and core functionalities, facilitating easier onboarding and maintenance.

### 1.2. Project Overview

`membrane-frontend-cc` is a modern web application designed to provide a user interface for [TODO: Briefly describe the main purpose of the application, e.g., "managing and monitoring IoT devices", "a customer control panel", etc. This information should ideally be obtained from project stakeholders or existing high-level documentation if available. For now, a placeholder is used.].

The primary goals of this frontend application are:
*   To offer a responsive and intuitive user experience.
*   To ensure reliable and efficient interaction with backend services.
*   To provide a scalable and maintainable codebase.

### 1.3. Technologies Used

The project leverages a modern technology stack, including:
*   **Core Framework:** React (v19) with TypeScript
*   **Build Tool & Development Server:** Vite
*   **Routing:** `react-router-dom`
*   **State Management:**
    *   `@tanstack/react-query` for server state management (data fetching, caching).
    *   `zustand` for client state management.
*   **HTTP Client:** `axios`
*   **Forms:** `react-hook-form`
*   **Internationalization (i18n):** `i18next` with `react-i18next`
*   **Styling:** Custom CSS (details in Theming section), `clsx` for conditional classnames.
*   **Icons:** FontAwesome
*   **Linting & Formatting:** ESLint and Prettier
*   **Pre-commit Hooks:** Husky
*   **Package Manager:** npm (inferred from `package-lock.json`)

---
## 2. Project Setup and Build Process

### 2.1. Development Environment Setup

To set up the development environment, clone the repository and install the dependencies:

```bash
# Clone the repository (replace with actual repository URL)
# git clone <repository_url>
# cd membrane-frontend-cc

# Install dependencies (assuming npm from package-lock.json)
npm install
```

### 2.2. Available Scripts

The `package.json` file defines the following key scripts for development and production:

*   **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR) for a fast development experience.
*   **`npm run build`**: Compiles the TypeScript code (`tsc -b`) and then builds the application for production using Vite. The output is typically generated in a `dist/` directory.
*   **`npm run lint`**: Lints the codebase using ESLint to identify and report on patterns in JavaScript and TypeScript code.
*   **`npm run lint:fix`**: Lints the codebase and automatically fixes fixable issues.
*   **`npm run format`**: Formats the code using Prettier to ensure consistent code style across the project.
*   **`npm run preview`**: Serves the production build locally to preview the application before deployment.
*   **`prepare`**: This script runs `husky install` automatically after `npm install` to set up Git hooks.

### 2.3. Build Process

The project uses Vite for its build process. Vite provides a fast and lean development experience and bundles the application for production.
*   **Development:** Vite serves code over native ES modules, enabling extremely fast HMR.
*   **Production:** `vite build` bundles the code with Rollup, pre-configured to output highly optimized static assets for production.
*   The `vite.config.ts` file contains the Vite configuration, including plugins like `@vitejs/plugin-react` for React support and `vite-plugin-svgr` for handling SVG files as React components. It also defines path aliases for cleaner imports.

---
## 3. Architecture Overview

### 3.1. Overall Architecture

The `membrane-frontend-cc` application follows a **component-based architecture**, primarily driven by the React library. The UI is built as a tree of reusable components that manage their own state and lifecycle.

It's a **client-side rendered (CSR)** application where Vite bundles the JavaScript, HTML, and CSS, which are then loaded and executed by the user's browser. The application interacts with backend services via HTTP requests (using `axios`) to fetch and submit data.

### 3.2. Key Libraries and Their Roles

*   **React (`react`, `react-dom`):** The core library for building the user interface with components.
*   **Vite (`vite`):** The build tool and development server, providing fast HMR and optimized production builds.
*   **TypeScript (`typescript`):** Adds static typing to JavaScript, improving code quality and maintainability.
*   **React Router (`react-router-dom`):** Handles client-side routing and navigation within the application. It allows defining different views (pages) based on the URL, as seen in `src/navigation/Routes.tsx`.
*   **TanStack Query (`@tanstack/react-query`):** Manages server state. It simplifies fetching, caching, synchronizing, and updating data from the server, providing hooks for data queries and mutations. This helps in managing asynchronous operations and keeping the UI consistent with backend data.
*   **Zustand (`zustand`):** A small, fast, and scalable bearbones state management solution. It is likely used for managing global or cross-component client-side state that isn't directly tied to server data (e.g., UI state like theme preferences, modal visibility, etc.).
*   **Axios (`axios`):** A promise-based HTTP client for making requests to backend APIs.
*   **React Hook Form (`react-hook-form`):** Used for managing forms, handling validation, and submission logic efficiently.
*   **i18next (`i18next`, `react-i18next`):** Provides internationalization capabilities, allowing the application to be translated into multiple languages.
*   **FontAwesome (`@fortawesome/react-fontawesome`, etc.):** Used for incorporating scalable vector icons into the application.

### 3.3. Application Flow

1.  **Initialization:** The application starts with `src/main.tsx`, which renders the main `App` component.
2.  **Providers:** `App.tsx` wraps the core application logic with several providers:
    *   `I18nProvider`: For internationalization.
    *   `ThemeProvider`: For UI theming.
    *   `QueryClientProvider`: For `@tanstack/react-query`.
3.  **Routing:** The `Routes` component (`src/navigation/Routes.tsx`) defines the application's routes using `react-router-dom`. It maps URL paths to specific page components (found in `src/pages/`).
4.  **Layouts:** Most pages are rendered within a `MainLayout` component, which likely provides a consistent structure (e.g., header, sidebar, content area).
5.  **Pages & Components:** Each page component renders its specific content, often composed of smaller, reusable UI components from `src/view/components/` and `src/view/elements/`.
6.  **Data Interaction:** Components and pages use hooks from `@tanstack/react-query` to fetch and update data from the backend. Client-side state is managed by Zustand stores or component-local state.
7.  **User Interaction:** Users interact with UI elements, triggering event handlers that may lead to state changes, API calls, or navigation.

---
## 4. Directory Structure

The `src/` directory contains the core source code of the application. Here's an overview of its main subdirectories:

*   **`src/assets/`**: Contains static assets like images, icons (SVG files are prominent here), and fonts.
    *   `src/assets/icons/`: Specifically stores SVG icons, categorized into `outlined` and `solid` variants. `index.ts` likely exports them for easier usage.
*   **`src/hooks/`**: Holds custom React hooks that encapsulate reusable logic and stateful behavior (e.g., `useWindowSize`, `useSvgAnimation`).
*   **`src/i18n/`**: Manages internationalization (i18n) settings.
    *   `src/i18n/locales/`: Contains JSON files for different languages (e.g., `en.json`, `es.json`).
    *   `I18nProvider.tsx`: The React context provider for i18n.
    *   `config.ts`: Configuration for `i18next`.
*   **`src/main.tsx`**: The main entry point of the application that renders the root `App` component.
*   **`src/models/`**: Defines data structures or TypeScript types/interfaces representing business domain entities or complex data objects (e.g., `Error.ts`, `Ui.ts`).
*   **`src/navigation/`**: Contains routing-related files.
    *   `Routes.tsx`: Defines all application routes using `react-router-dom`.
*   **`src/pages/`**: Each file or subdirectory typically represents a distinct page or view in the application (e.g., `HomePage.tsx`, `UsersPage.tsx`). Some pages also have their own CSS modules (e.g., `LatestStatesPage.module.css`).
*   **`src/theme/`**: Manages application-wide styling and theming.
    *   `theme.css`: Global styles or CSS variables.
    *   `theme.ts`: Theme configuration object (likely for a CSS-in-JS solution or context).
    *   `ThemeProvider.tsx`: React context provider for applying themes.
    *   `useTheme.ts`: Custom hook to access theme context.
*   **`src/types/`**: Contains shared TypeScript type definitions and interfaces used across the application (e.g., `ErrorMap.ts`).
*   **`src/utils/`**: Includes utility functions and helpers that can be used throughout the project (e.g., `field-validations.ts`, `svgAnimations.ts`).
*   **`src/view/`**: This directory appears to be the primary location for UI-related code, further organized into:
    *   **`src/view/components/`**: Contains reusable UI components that are composed of multiple elements and may have more complex logic (e.g., `SearchBar`, `Table`, `DateSelector`). These are likely application-specific composite components.
    *   **`src/view/elements/`**: Contains foundational UI elements or "atoms" – basic building blocks for the UI (e.g., `Button`, `Input`, `Icon`, `Typography`). These are often wrappers around native HTML elements or provide base styling.
    *   **`src/view/layouts/`**: Defines layout components that structure the overall appearance of pages (e.g., `MainLayout`, `AuthLayout`).
    *   **`src/view/prototypes/`**: This directory might contain components or page sections that are specific feature implementations or larger UI compositions, possibly candidates for becoming pages or more generic components later (e.g., `Forms`, `Headers`, `LastStatus`, `Monitoring`, `Sidebar`, `Users` sections).

Other important files/directories in the root:

*   **`.husky/`**: Configuration for Husky, used for Git hooks (e.g., pre-commit).
*   **`public/`**: Static assets that are directly served by the web server (e.g., `vite.svg`, `favicon.ico`).
*   **`package.json`**: Lists project dependencies, scripts, and metadata.
*   **`vite.config.ts`**: Configuration for the Vite build tool.
*   **`tsconfig.json`**: TypeScript compiler options.
*   **`eslint.config.js`**: ESLint configuration.
*   **`.prettierrc`**: Prettier configuration.
*   **`vercel.json`**: Configuration for deploying to Vercel.

---
## 5. Core Features and Modules

This section details the main features of the application, implemented through pages, reusable components, and custom hooks.

### 5.1. Pages (`src/pages/`)

The application's primary views are defined as React components within the `src/pages/` directory. Routing is managed by `src/navigation/Routes.tsx`. Key pages include:

*   **`AuthPage.tsx`**: Handles user authentication (login, registration, etc.).
*   **`HomePage.tsx`**: The main landing page after authentication.
*   **`DashboardPage.tsx`**: Displays an overview or dashboard with key metrics and information.
*   **`MonitoringPage.tsx`**: Provides tools and views for monitoring aspects of the system.
*   **`LatestStatesPage.tsx`**: Shows the most recent status or states of entities within the system.
*   **Admin Section Pages**:
    *   **`UsersPage.tsx`**: For managing users.
    *   **`RolesPage.tsx`**: For managing user roles and permissions.
    *   **`SitesPage.tsx`**: For managing sites or locations.
    *   **`GroupsPage.tsx`**: For managing groups (e.g., of devices or users).
    *   **`DevicesPage.tsx`**: For managing devices.
    *   **`BrandsPage.tsx`**: For managing brands (e.g., of devices).
    *   **`ModelsPage.tsx`**: For managing models (e.g., of devices).
    *   **`FirmwaresPage.tsx`**: For managing firmwares for devices.

    *(Note: Many admin pages have corresponding Spanish route aliases, e.g., `usuarios` for `users`)*

### 5.2. Key UI Components (`src/view/`)

The application utilizes a range of reusable UI components, primarily located in `src/view/components/` (composite components) and `src/view/elements/` (foundational elements).

**Key Elements (`src/view/elements/`)**:
*   **`Box`**: A layout component, likely for creating styled containers or applying spacing.
*   **`Button`**: Standard button element with various styles and functionalities.
*   **`Dropdown`**: For creating dropdown menus or select lists.
*   **`Icon`**: A component to display icons, likely integrating FontAwesome.
*   **`Input`**: Standard input field for forms.
*   **`InputError`**: Displays error messages for input fields.
*   **`Logo`**: Displays the application logo.
*   **`Option`**: Represents an option within a `Select` or `Dropdown`.
*   **`Select`**: A custom select input component.
*   **`Spinner`**: For indicating loading states.
*   **`Table`**: Components for displaying data in tabular format (`Table`, `Th`, `Td`, `Tr`, etc.).
*   **`ToggleButton`**: A switch-like button for toggling states.
*   **`Typography`**: For consistent text styling (headings, paragraphs, etc.).

**Key Components (`src/view/components/`)**:
*   **`ContentTitles`**: Likely for displaying standardized page or section titles.
*   **`DateSelector`**: A component for picking dates or date ranges.
*   **`Fields`**: A collection of specialized form field components (e.g., `InputField`, `SelectField`).
*   **`LanguageSelector`**: Allows users to switch the application language.
*   **`SearchBar`**: Provides a search input field with associated logic.
*   **`Table`**: A more complex table component, possibly with features like pagination, sorting, and filtering, building upon elements from `src/view/elements/Table/`.
*   **`ThemeToggle`**: Allows users to switch between different UI themes (e.g., light/dark).

**Layouts (`src/view/layouts/`)**:
*   **`MainLayout`**: The primary layout for most authenticated pages, likely including common elements like a header, navigation sidebar, and content area.
*   **`AuthLayout`**: A layout specifically for authentication pages (e.g., login, signup).
*   **`OverFullWindow`**: A layout that likely spans the entire viewport, possibly for modals or special views.

**Prototypes (`src/view/prototypes/`)**:
This directory contains components that seem to be larger, feature-specific UI sections. These might be complex, non-reusable components or candidates for future refactoring into more generic components or pages. Examples include:
*   `Forms/DefaultForm`, `Forms/FormGroup`
*   `Headers/MainHeader`, `Headers/SecondaryHeader`
*   `LastStatus/...` (various components related to displaying latest statuses)
*   `Monitoring/...` (various components for the monitoring section)
*   `Sidebar/Sidebar`
*   `Users/...` (components for user management UI sections)

### 5.3. Custom Hooks (`src/hooks/`)

Custom React hooks are used to share stateful logic across components:

*   **`useNonInitialEffect.ts`**: Likely a variation of `useEffect` that doesn't run on the initial render.
*   **`useSvgAnimation.ts`**: Possibly for applying animations to SVG elements.
*   **`useWindowSize.ts`**: Tracks browser window dimensions, allowing components to adapt to different screen sizes.

---
## 6. State Management

The application employs a combination of libraries for managing different types of state: server state and client state.

### 6.1. Server State (`@tanstack/react-query`)

For managing data that comes from the server, its caching, and synchronization, the application uses **`@tanstack/react-query`** (formerly React Query).

*   **Purpose**: Simplifies fetching, caching, synchronizing, and updating server data. It helps in avoiding manual management of loading states, errors, and data staleness.
*   **Core Concepts**:
    *   **Queries**: Used for fetching data. `useQuery` is the primary hook for this. React Query automatically handles caching, background refetching, and stale-while-revalidate logic.
    *   **Mutations**: Used for creating, updating, or deleting data. `useMutation` is the hook for these operations. It provides helpers for optimistic updates and handling success/error states.
    *   **Query Invalidation**: Allows marking cached data as stale, triggering refetches when necessary (e.g., after a mutation).
    *   **Caching**: Data is cached in memory, reducing redundant API calls and improving UI responsiveness.
*   **Setup**: A `QueryClient` is instantiated and provided at the top level of the application via `QueryClientProvider` in `App.tsx`.

### 6.2. Client State (`zustand`)

For managing global or cross-component client-side state that is not directly tied to server data, the application uses **`zustand`**.

*   **Purpose**: Provides a minimalistic and straightforward way to manage state that needs to be shared across different parts of the application without prop drilling. Examples could include UI state such as theme preferences, visibility of modals or sidebars, or other application-wide settings.
*   **Core Concepts**:
    *   **Stores**: State is organized into stores. A store is a hook that components can subscribe to.
    *   **Actions**: Stores define actions (functions) that can be used to update the state.
    *   **Simplicity**: Zustand is known for its simple API and minimal boilerplate.
*   **Usage**: While specific store implementations are not detailed here, typical usage involves creating a store using `create` from `zustand` and then using the generated hook in components to access and update state. Path aliases in `vite.config.ts` and `tsconfig.json` include `'@store': path.resolve(__dirname, './src/store')`, suggesting that Zustand stores are likely defined within the `src/store/` directory, although this directory was not listed in the initial `ls()` output. If this directory exists, it would contain the Zustand store definitions. If not, Zustand might be used in a more decentralized way or the alias is a leftover from a previous structure.

### 6.3. Local Component State (`useState`, `useReducer`)

For state that is local to a single component and doesn't need to be shared, React's built-in hooks like `useState` and `useReducer` are used. This is the standard approach for managing component-level concerns like form inputs, toggles, or UI element visibility within that component.

---
## 7. Theming

The application supports UI theming, allowing for a consistent look and feel and potentially offering different visual styles (e.g., light and dark modes). The theming system is primarily managed within the `src/theme/` directory.

### 7.1. Core Theming Files

*   **`src/theme/theme.css`**: This file likely contains global CSS styles, CSS custom properties (variables) for theming, or base styles for HTML elements. These variables can be swapped out to change themes.
*   **`src/theme/theme.ts`**: This TypeScript file might define theme objects, containing key-value pairs for theme properties like colors, fonts, spacing, etc. These objects can be used by components or a theme provider.
*   **`src/theme/ThemeProvider.tsx`**: This component is a React Context Provider that wraps the application (as seen in `App.tsx`). It's responsible for making the current theme accessible to all components in the component tree. It likely manages the current theme state and provides functions to update it.
*   **`src/theme/useTheme.ts`**: A custom hook that allows components to easily access the current theme object and potentially the function to change themes provided by `ThemeProvider`.
*   **`src/theme/Constants.ts`**: This file might store constant values related to theming, such as theme names or specific breakpoint sizes.

### 7.2. Theme Switching

*   The presence of a `ThemeToggle` component (identified in `src/view/components/ThemeToggle/`) suggests that users can switch between themes (e.g., light and dark mode).
*   This toggle component would typically use the `useTheme` hook to get the current theme and the function to set a new theme.

### 7.3. Usage in Components

Components can consume theme values (e.g., colors, font sizes) in several ways:
*   **CSS Custom Properties:** If `theme.css` defines CSS variables, components can use these variables in their stylesheets (e.g., `background-color: var(--primary-color);`). `ThemeProvider` might update these variables on the root element.
*   **Styled Components / CSS-in-JS (if applicable):** If a CSS-in-JS library were in use (not explicitly listed in `package.json`'s main dependencies, but possible), `ThemeProvider` would directly pass the theme object to styled components.
*   **Inline Styles or Class Names:** Components might use the `useTheme` hook to get theme values and apply them via inline styles or by conditionally applying class names.

The primary mechanism seems to be CSS-based, likely using CSS custom properties defined in `theme.css` and managed/switched via JavaScript through the `ThemeProvider` and `useTheme` hook.

---
## 8. Internationalization (i18n)

The application is designed to support multiple languages using the `i18next` framework and its related libraries. The setup is primarily located within the `src/i18n/` directory.

### 8.1. Core i18n Files and Libraries

*   **`i18next`**: The core internationalization library.
*   **`react-i18next`**: Provides React bindings for `i18next` (e.g., `useTranslation` hook, `Trans` component).
*   **`i18next-browser-languagedetector`**: Detects the user's language from various sources (e.g., browser settings, localStorage).
*   **`i18next-http-backend`**: Loads translation files from a backend or public folder.

Key files in `src/i18n/`:
*   **`src/i18n/locales/`**: This directory contains the translation files, typically in JSON format. Each file (e.g., `en.json`, `es.json`) holds key-value pairs for a specific language.
*   **`src/i18n/config.ts`**: This file likely contains the `i18next` configuration, including initialization options, backend settings, language detection order, fallback languages, and interpolation settings.
*   **`src/i18n/I18nProvider.tsx`**: A React component that wraps the application (as seen in `App.tsx`). It initializes `i18next` and makes the translation context available to all components using the `I18nextProvider` from `react-i18next`.
*   **`src/i18n/index.ts`**: Likely exports the configured `i18next` instance or related utilities.

### 8.2. Usage

*   **Translation Files**: Textual content that needs translation is stored as values associated with keys in the JSON files within `src/i18n/locales/`.
*   **`useTranslation` Hook**: Components use the `useTranslation` hook from `react-i18next` to get access to the `t` function, which translates keys into the current language's strings.
    ```typescript jsx
    // Example usage in a component
    import { useTranslation } from 'react-i18next';

    function MyComponent() {
      const { t } = useTranslation();
      return <p>{t('myKey')}</p>; // 'myKey' would be defined in en.json, es.json, etc.
    }
    ```
*   **Language Switching**: The application likely provides a way for users to switch languages, possibly through the `LanguageSelector` component (identified in `src/view/components/LanguageSelector/`). This component would use `i18next.changeLanguage()` to change the active language.
*   **Route Aliases**: As seen in `src/navigation/Routes.tsx`, some routes have both English and Spanish aliases (e.g., `/monitoring` and `/monitoreo`). While this provides language-specific URLs, the content within the pages themselves is handled by `i18next`.

### 8.3. Adding New Languages or Translations

1.  **Create Locale File**: Add a new JSON file for the language in `src/i18n/locales/` (e.g., `fr.json` for French).
2.  **Update Configuration**: Add the new language to the `i18next` configuration in `src/i18n/config.ts` (e.g., in the `supportedLngs` array).
3.  **Translate Keys**: Populate the new JSON file with translations for all existing keys.
4.  **Update Language Selector**: Ensure the new language is available in any UI elements used for language selection.

---
