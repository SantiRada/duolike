# QA Checklist - DuolikeUX MVP v1.0

## 📋 Pre-Test Setup

- [ ] Instalar dependencias: `npm install`
- [ ] Verificar que no hay errores de TypeScript
- [ ] Limpiar AsyncStorage antes de empezar: reinstalar app o usar botón de reset en Profile
- [ ] Testear en al menos 2 dispositivos (iOS + Android, o real + emulador)

---

## ✅ Test Cases Críticos

### 1. Primer Lanzamiento (First Time User Experience)

**Objetivo**: Verificar que un usuario nuevo puede empezar sin fricción

- [ ] **TC1.1**: App se abre sin crashes
- [ ] **TC1.2**: Home screen muestra Mundo 1 con 8 nodos
- [ ] **TC1.3**: Solo la primera lección (Lección 1-1) está desbloqueada
- [ ] **TC1.4**: Resto de lecciones aparecen bloqueadas con 🔒
- [ ] **TC1.5**: XP = 0, Nivel = 1, Streak = 0, Corazones = 5
- [ ] **TC1.6**: Botón "Continuar" aparece y dirige a Lección 1-1

---

### 2. Flujo de Lección Completa

**Objetivo**: Completar una lección end-to-end

- [ ] **TC2.1**: Al tocar nodo de lección, se abre pantalla de lección
- [ ] **TC2.2**: Se muestra intro narrativa correctamente
- [ ] **TC2.3**: Al tocar "Empezar", se carga el primer ejercicio
- [ ] **TC2.4**: Barra de progreso se muestra correctamente (0% → 100%)
- [ ] **TC2.5**: Contador de corazones visible en header
- [ ] **TC2.6**: Ejercicio se renderiza según su tipo (ej: MultipleChoice muestra opciones)
- [ ] **TC2.7**: Al seleccionar respuesta, botón "Verificar" se habilita
- [ ] **TC2.8**: Al tocar "Verificar" con respuesta vacía, muestra alerta
- [ ] **TC2.9**: Al verificar respuesta CORRECTA:
  - [ ] Modal de feedback verde aparece con mensaje correcto
  - [ ] Muestra "¡Correcto! 🎉"
  - [ ] Se suma XP (+10)
  - [ ] Corazones NO se pierden
- [ ] **TC2.10**: Al verificar respuesta INCORRECTA:
  - [ ] Modal de feedback rojo aparece con mensaje de error
  - [ ] Muestra "Incorrecto"
  - [ ] Se pierde 1 corazón
  - [ ] XP NO se suma
- [ ] **TC2.11**: Al tocar "Continuar" en feedback, avanza al siguiente ejercicio
- [ ] **TC2.12**: Al completar último ejercicio, muestra alerta "¡Lección completada!"
- [ ] **TC2.13**: Se suma XP bonus (+50)
- [ ] **TC2.14**: Se suman monedas (+5)
- [ ] **TC2.15**: Vuelve a Home screen
- [ ] **TC2.16**: Nodo de lección completada muestra ✓
- [ ] **TC2.17**: Siguiente lección se desbloquea automáticamente

---

### 3. Sistema de Progreso y Persistencia

**Objetivo**: Verificar que el progreso se guarda correctamente

- [ ] **TC3.1**: Completar Lección 1-1
- [ ] **TC3.2**: Cerrar app completamente (kill process)
- [ ] **TC3.3**: Reabrir app
- [ ] **TC3.4**: Verificar que:
  - [ ] XP se mantuvo
  - [ ] Nivel se mantuvo
  - [ ] Lección 1-1 sigue marcada como completada
  - [ ] Lección 1-2 sigue desbloqueada
  - [ ] Streak se mantuvo o incrementó (si es nuevo día)

---

### 4. Sistema de XP y Niveles

**Objetivo**: Verificar cálculo correcto de XP

- [ ] **TC4.1**: Empezar con XP = 0, Nivel = 1
- [ ] **TC4.2**: Completar 1 ejercicio correcto → XP += 10
- [ ] **TC4.3**: Completar lección completa → XP += (10 * N ejercicios) + 50
- [ ] **TC4.4**: Al alcanzar 100 XP → Nivel = 2
- [ ] **TC4.5**: Barra de XP se resetea visualmente al subir de nivel
- [ ] **TC4.6**: Nivel se muestra correctamente en Home y Profile

---

### 5. Sistema de Streak

**Objetivo**: Verificar lógica de días consecutivos

**Setup**: Resetear app, completar 1 lección

- [ ] **TC5.1**: Primer día: Streak = 1
- [ ] **TC5.2**: Mismo día (volver a entrar): Streak = 1 (no cambia)
- [ ] **TC5.3**: Simular día siguiente (cambiar fecha del sistema o esperar 24h):
  - [ ] Al abrir app sin completar lección: Streak = 1 (no cambia aún)
  - [ ] Al completar 1 lección: Streak = 2
- [ ] **TC5.4**: Simular saltar 2 días:
  - [ ] Al abrir app: Streak se resetea a 1
- [ ] **TC5.5**: Indicador de Streak muestra 🔥 + número correcto

---

### 6. Sistema de Corazones (Energía)

**Objetivo**: Verificar pérdida y regeneración de corazones

- [ ] **TC6.1**: Empezar con 5 corazones
- [ ] **TC6.2**: Responder 1 ejercicio MAL → Corazones = 4
- [ ] **TC6.3**: Responder 5 ejercicios MAL → Corazones = 0
- [ ] **TC6.4**: Con 0 corazones, ¿se puede continuar? (Según Config, debería permitir pero sin XP)
- [ ] **TC6.5**: Cerrar app, esperar 30+ min, reabrir → Corazones regeneran (si implementado)
  - **Nota MVP**: Regeneración completa al día siguiente es suficiente

---

### 7. Tipos de Ejercicios

**Objetivo**: Verificar que cada tipo funciona correctamente

#### 7.1 Multiple Choice
- [ ] **TC7.1.1**: Se muestran 4 opciones
- [ ] **TC7.1.2**: Se puede seleccionar UNA opción
- [ ] **TC7.1.3**: Opción seleccionada se marca visualmente
- [ ] **TC7.1.4**: Validación funciona (correcto vs incorrecto)

#### 7.2 Fill Blank
- [ ] **TC7.2.1**: Input aparece en lugar de ___
- [ ] **TC7.2.2**: Se puede escribir texto
- [ ] **TC7.2.3**: Validación NO es case-sensitive (según configuración)
- [ ] **TC7.2.4**: Acepta respuesta correcta con espacios extras

#### 7.3 Reorder
- [ ] **TC7.3.1**: Se muestran items con flechas ↑↓
- [ ] **TC7.3.2**: Al tocar ↑, item sube
- [ ] **TC7.3.3**: Al tocar ↓, item baja
- [ ] **TC7.3.4**: Primer item tiene ↑ disabled
- [ ] **TC7.3.5**: Último item tiene ↓ disabled
- [ ] **TC7.3.6**: Validación compara orden correcto

#### 7.4 Match Pairs
- [ ] **TC7.4.1**: Se muestran dos columnas
- [ ] **TC7.4.2**: Al tocar item izquierdo, se selecciona
- [ ] **TC7.4.3**: Al tocar item derecho, se crea par
- [ ] **TC7.4.4**: Par creado se marca visualmente
- [ ] **TC7.4.5**: Se puede rehacer par (tocar otro item derecho)
- [ ] **TC7.4.6**: Validación verifica todos los pares

#### 7.5 Choose Design
- [ ] **TC7.5.1**: Se muestran 2-3 mockups de carteles
- [ ] **TC7.5.2**: Mockups renderizan con colores/texto correctos
- [ ] **TC7.5.3**: Se puede seleccionar un diseño
- [ ] **TC7.5.4**: Diseño seleccionado se marca con borde destacado
- [ ] **TC7.5.5**: Validación funciona

#### 7.6 Highlight
- [ ] **TC7.6.1**: Se muestran bloques de texto separados por |
- [ ] **TC7.6.2**: Se puede tocar un bloque
- [ ] **TC7.6.3**: Bloque seleccionado se destaca
- [ ] **TC7.6.4**: Validación compara texto exacto (case-insensitive)

---

### 8. Modo Práctica

**Objetivo**: Verificar funcionalidad de repaso

- [ ] **TC8.1**: Sin lecciones completadas, Practice muestra mensaje "Completá lecciones primero"
- [ ] **TC8.2**: Después de completar 1 lección, Practice permite empezar
- [ ] **TC8.3**: Al tocar "Empezar a Practicar", carga ejercicios aleatorios
- [ ] **TC8.4**: Muestra hasta 5 ejercicios (o menos si hay menos completados)
- [ ] **TC8.5**: Ejercicios son de los ya completados correctamente
- [ ] **TC8.6**: Al completar práctica, muestra alerta "¡Práctica completada!"
- [ ] **TC8.7**: Se suma XP por ejercicios correctos en práctica

---

### 9. Pantalla de Perfil

**Objetivo**: Verificar visualización de estadísticas

- [ ] **TC9.1**: Muestra XP total
- [ ] **TC9.2**: Muestra nivel actual
- [ ] **TC9.3**: Muestra streak actual
- [ ] **TC9.4**: Muestra lecciones completadas (número)
- [ ] **TC9.5**: Muestra ejercicios realizados (número)
- [ ] **TC9.6**: Muestra precisión (% correctos)
- [ ] **TC9.7**: Muestra corazones actuales / máximos
- [ ] **TC9.8**: Muestra monedas acumuladas
- [ ] **TC9.9**: Botón "Reiniciar Progreso" funciona:
  - [ ] Muestra confirmación
  - [ ] Al confirmar, borra todo el progreso
  - [ ] Vuelve a estado inicial (XP=0, Nivel=1, etc.)

---

### 10. Navegación

**Objetivo**: Verificar que la navegación funciona sin bugs

- [ ] **TC10.1**: Tabs (Home, Practicar, Perfil) funcionan
- [ ] **TC10.2**: Desde Home, tocar nodo → abre lección
- [ ] **TC10.3**: Desde lección, botón Back → vuelve a Home
- [ ] **TC10.4**: Al completar lección, vuelve a Home automáticamente
- [ ] **TC10.5**: No hay crashes al navegar entre tabs rápidamente

---

### 11. Analytics

**Objetivo**: Verificar que los eventos se registran

- [ ] **TC11.1**: Abrir consola de desarrollo
- [ ] **TC11.2**: Al abrir app, ver evento `app_open`
- [ ] **TC11.3**: Al empezar lección, ver evento `lesson_start`
- [ ] **TC11.4**: Al responder ejercicio, ver evento `exercise_answered` con datos correctos
- [ ] **TC11.5**: Al completar lección, ver evento `lesson_complete`
- [ ] **TC11.6**: Al incrementar streak, ver evento `streak_incremented`

---

### 12. Edge Cases

**Objetivo**: Verificar comportamiento en situaciones límite

- [ ] **TC12.1**: Cerrar app a mitad de ejercicio → al reabrir, ¿se pierde progreso de lección? (Esperado: SÍ, ok para MVP)
- [ ] **TC12.2**: Completar lección con 0 corazones → ¿funciona igual?
- [ ] **TC12.3**: Llegar a nivel 10+ → ¿XP bar funciona?
- [ ] **TC12.4**: Streak de 30+ días → ¿se muestra correctamente?
- [ ] **TC12.5**: Completar las 8 lecciones → ¿muestra mensaje de finalización?
- [ ] **TC12.6**: Responder mismo ejercicio en Practice múltiples veces → ¿funciona?

---

### 13. UI/UX Visual

**Objetivo**: Verificar calidad visual

- [ ] **TC13.1**: No hay textos cortados
- [ ] **TC13.2**: Colores tienen buen contraste (legibles)
- [ ] **TC13.3**: Botones tienen tamaño mínimo de tap (44x44pt)
- [ ] **TC13.4**: Modales se cierran correctamente
- [ ] **TC13.5**: Loading states (si hay) funcionan
- [ ] **TC13.6**: En pantallas pequeñas, scrolling funciona
- [ ] **TC13.7**: En pantallas grandes, no se ve roto

---

### 14. Performance

**Objetivo**: Verificar que la app es fluida

- [ ] **TC14.1**: App abre en < 3 segundos
- [ ] **TC14.2**: Navegación entre screens es instantánea
- [ ] **TC14.3**: No hay lag al tocar botones
- [ ] **TC14.4**: Ejercicios con texto largo no lagean
- [ ] **TC14.5**: No hay memory leaks visibles (app no se vuelve lenta después de 30+ min de uso)

---

### 15. Contenido del Mundo 1

**Objetivo**: Verificar que el contenido pedagógico es correcto

- [ ] **TC15.1**: Lección 1: Bienvenida (6 ejercicios) funciona completa
- [ ] **TC15.2**: Lección 2: Legibilidad (6 ejercicios) funciona completa
- [ ] **TC15.3**: Lección 3: Jerarquía (6 ejercicios) funciona completa
- [ ] **TC15.4**: Lección 4: Escaneabilidad (6 ejercicios) funciona completa
- [ ] **TC15.5**: Lección 5: Consistencia (6 ejercicios) funciona completa
- [ ] **TC15.6**: Lección 6: Accesibilidad (6 ejercicios) funciona completa
- [ ] **TC15.7**: Lección 7: Copy Claro (7 ejercicios) funciona completa
- [ ] **TC15.8**: Lección 8: Test Final (7 ejercicios) funciona completa
- [ ] **TC15.9**: Feedback de ejercicios es claro y educativo
- [ ] **TC15.10**: Narrativa tiene sentido y es consistente

---

## 🐛 Bug Report Template

Si encontrás un bug, documentarlo así:

```
**ID**: BUG-XXX
**Severidad**: Crítico / Alto / Medio / Bajo
**Pantalla**: Home / Lesson / Practice / Profile
**Pasos para reproducir**:
1. ...
2. ...
3. ...
**Resultado esperado**: ...
**Resultado actual**: ...
**Screenshot/Video**: (si aplica)
**Dispositivo**: iOS 17 / Android 13 / Web
```

---

## ✅ Definition of Done (DoD)

El MVP está listo para testeo con usuarios cuando:

- [ ] Todos los Test Cases Críticos (TC1-TC10) pasan sin errores
- [ ] Al menos 1 usuario interno completa las 8 lecciones sin ayuda
- [ ] No hay bugs de severidad "Crítico" abiertos
- [ ] Analytics registran eventos correctamente
- [ ] README.md tiene instrucciones claras de instalación
- [ ] App funciona en iOS y Android (o al menos en uno + web)

---

## 📊 Métricas de Calidad (Post-Test)

Después de testear con 5-10 usuarios, medir:

- **Completion Rate**: % que completa 3+ lecciones
- **Accuracy**: % de ejercicios resueltos correctamente
- **Retention D1**: % que vuelve al día siguiente
- **Time per Lesson**: Promedio de minutos por lección
- **Drop-off Points**: En qué lecciones/ejercicios abandonan

---

## 🎯 Prioridad de Fixes

**P0 (Crítico)**: Impide usar la app
- Crashes
- No se puede completar lecciones
- Progreso no se guarda

**P1 (Alto)**: Degrada experiencia significativamente
- Ejercicios que no validan bien
- Feedback incorrecto
- XP no suma

**P2 (Medio)**: Mejoras de UX
- Textos cortados
- Animaciones faltantes
- Copy mejorable

**P3 (Bajo)**: Nice to have
- Colores subjetivos
- Micro-interacciones

---

**Checklist creado para**: DuolikeUX MVP v1.0
**Última actualización**: 2025-01-12
