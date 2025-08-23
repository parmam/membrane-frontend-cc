# Progreso del Refactoring del Store

Este documento trackea el progreso del refactoring completo del store de Redux, siguiendo la arquitectura manual propuesta (reducers puros, action types constantes, action creators, thunks, enums para status).

Trabajamos en la rama actual. El progreso se actualiza iterativamente después de cada módulo completado.

### General Progress

Completed: 16/20 modules

## Lista de Módulos y Status

| Módulo           | Status  | Fecha Inicio   | Fecha Fin | Notas                                                                                                       |
| ---------------- | ------- | -------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| auth             | Done    | [Fecha inicio] | [Hoy]     | Refactor completo para auth, pero con algunos linter errors pendientes de resolución manual en authSlice.ts |
| users            | Done    | [Fecha]        | [Hoy]     | Refactor completado                                                                                         |
| roles            | Done    | [Fecha]        | [Hoy]     | Refactor completado, con fixes de linter                                                                    |
| permissions      | Done    | [Fecha]        | [Hoy]     | Refactor completado para permissions, módulo simple sin paginación                                          |
| deviceModels     | Done    | [Fecha]        | [Hoy]     | Refactor completado para deviceModels                                                                       |
| devices          | Done    | [Fecha]        | [Hoy]     | Refactor completado para devices                                                                            |
| connectionTypes  | Done    | [Fecha]        | [Hoy]     | Refactor completado para connectionTypes, módulo simple sin paginación                                      |
| groups           | Done    | [Fecha]        | [Hoy]     | Refactor completado para groups                                                                             |
| deviceFirmwares  | Done    | [Fecha]        | [Hoy]     | Refactor completado para deviceFirmwares                                                                    |
| drivers          | Done    | -              | -         | Get drivers                                                                                                 |
| eventTypes       | Done    | -              | -         | CRUD para event types                                                                                       |
| shifts           | Done    | -              | -         | CRUD para shifts                                                                                            |
| events           | Done    | -              | -         | CRUD para events                                                                                            |
| files            | Done    | -              | -         | CRUD para files, including upload                                                                           |
| maps             | Done    | -              | -         | CRUD para maps, add/remove device                                                                           |
| places           | Done    | -              | -         | CRUD para places                                                                                            |
| deviceVendors    | Pending | -              | -         | CRUD para device vendors                                                                                    |
| deviceTypes      | Pending | -              | -         | Get device types                                                                                            |
| deviceStatus     | Pending | -              | -         | Get device statuses                                                                                         |
| deviceMonitoring | Pending | -              | -         | Get monitoring, last status, uptime, initial data thunk                                                     |

## Notas

- Cada módulo será refactorizado secuencialmente.
- Después de cada módulo, actualizar este documento.
- Al final, ajustar store/index.ts y componentes dependientes.
- Riesgos: Ajustes en componentes que usen el store.
