# DuolikeUX - MVP v1.0

App móvil de aprendizaje gamificado para enseñar **UX/UI Design** mediante micro-lecciones narrativas tipo Duolingo.

---

## 🎯 Objetivo del MVP

Validar si el formato de "aprender diseño jugando" engancha a usuarios iniciales y si logran asimilar conceptos básicos de UI/UX.

**Métricas de éxito**:
- ≥60% de usuarios completan 3+ lecciones en primera sesión
- ≥30% regresan al día siguiente (D1 retention)
- ≥70% de ejercicios resueltos correctamente

---

## 📦 Contenido del MVP

### Mundo 1: "La Taberna del Último Pixel"
- **8 lecciones** completas
- **~50 ejercicios** interactivos (6-7 por lección)
- **6 tipos de ejercicios**: multiple choice, fill blank, reorder, match pairs, choose design, highlight

### Conceptos enseñados:
1. Introducción y objetivos
2. Legibilidad
3. Jerarquía visual
4. Escaneabilidad
5. Consistencia
6. Accesibilidad básica
7. Copy claro
8. Evaluación final (A/B testing)

---

## 🛠️ Stack Tecnológico

- **React Native** (Expo SDK 51+)
- **TypeScript** (strict mode)
- **Expo Router** v3 (navegación)
- **Zustand** (state management)
- **AsyncStorage** (persistencia local)

---

## 🚀 Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- npm o yarn

### Pasos

1. **Instalar dependencias**:
```bash
npm install
```

2. **Iniciar el servidor de desarrollo**:
```bash
npm start
```

3. **Ejecutar en dispositivo/emulador**:
- **iOS**: Presioná `i` o ejecutá `npm run ios`
- **Android**: Presioná `a` o ejecutá `npm run android`
- **Web** (para testeo rápido): Presioná `w` o ejecutá `npm run web`

4. **Escanear QR con Expo Go** (en dispositivo físico):
- Descargá Expo Go desde App Store o Google Play
- Escaneá el QR que aparece en la terminal

---

## 📁 Estructura del Proyecto

```
duolike/
├── app/                        # Pantallas (Expo Router)
│   ├── (tabs)/                # Tab navigation
│   │   ├── index.tsx         # Home (ruta de progreso)
│   │   ├── practice.tsx      # Modo práctica
│   │   └── profile.tsx       # Perfil del usuario
│   ├── lesson/[id].tsx       # Pantalla de lección dinámica
│   └── _layout.tsx           # Layout raíz
├── components/
│   ├── exercises/            # Componentes por tipo de ejercicio
│   ├── game/                 # Componentes de gamificación
│   └── ui/                   # Componentes UI base
├── data/
│   └── worlds/
│       └── world-1-taberna.json  # Contenido del Mundo 1
├── lib/
│   ├── stores/               # Zustand stores
│   ├── analytics.ts          # Logger de eventos
│   ├── persistence.ts        # AsyncStorage helpers
│   └── exerciseEngine.ts     # Motor de validación
├── types/
│   └── index.ts              # TypeScript interfaces
└── constants/
    ├── Colors.ts
    └── Config.ts
```

---

## 🎮 Features Implementadas

### ✅ Core Features
- [x] Ruta de progreso con nodos (bloqueados/disponibles/completados)
- [x] Sistema de XP y niveles
- [x] Streak (días consecutivos)
- [x] Sistema de corazones (energía)
- [x] 8 lecciones completas con narrativa
- [x] 6 tipos de ejercicios diferentes
- [x] Feedback inmediato por ejercicio
- [x] Persistencia local (AsyncStorage)
- [x] Modo práctica (repaso de ejercicios completados)
- [x] Perfil con estadísticas
- [x] Analytics logger (preparado para Firebase/Amplitude)

### 🎨 Tipos de Ejercicios
1. **Multiple Choice**: Elegir 1 de 4 opciones
2. **Fill Blank**: Completar hueco en frase
3. **Reorder**: Ordenar elementos (con flechas)
4. **Match Pairs**: Emparejar conceptos
5. **Choose Design**: Comparar mockups visuales de carteles
6. **Highlight**: Seleccionar parte correcta de un texto

---

## 📊 Analytics Implementados

Eventos trackeados (local, exportables):
- `app_open`
- `lesson_start`
- `exercise_answered` (con correct/incorrect, timeSpentMs, conceptTag)
- `lesson_complete`
- `streak_incremented` / `streak_broken`
- `practice_started` / `practice_complete`
- `dropoff_point`

**Acceso a eventos**: Ver en consola durante desarrollo. En Profile screen se puede agregar botón para exportar eventos a JSON.

---

## 🧪 Testing del MVP

### User Flow Crítico
1. Abrir app → ver Home con ruta de lecciones
2. Tocar "Continuar" → ir a Lección 1
3. Leer intro narrativa → empezar
4. Completar 6 ejercicios → recibir feedback inmediato
5. Completar lección → ganar XP y monedas
6. Volver a Home → ver siguiente lección desbloqueada
7. Repetir para 3+ lecciones
8. Ir a "Practicar" → repasar ejercicios anteriores
9. Ir a "Perfil" → ver estadísticas

### Puntos de Validación
- ¿Se entienden los ejercicios sin tutorial?
- ¿El feedback ayuda a aprender?
- ¿La narrativa engancha?
- ¿El streak motiva a volver?
- ¿El progreso visual es claro?

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
rm -rf node_modules
npm install
```

### Error: "Metro bundler cache"
```bash
npm start -- --clear
```

### Error de tipos TypeScript
```bash
npm run type-check
```

### AsyncStorage no persiste
- Verificar que los stores llamen `hydrate()` en `_layout.tsx`

---

## 📝 Próximos Pasos (Post-MVP)

### v1.1 - Mejoras Inmediatas
- [ ] Animaciones de transición
- [ ] Sonidos de feedback
- [ ] Onboarding inicial (2-3 pantallas)
- [ ] Modo oscuro

### v2.0 - Expansión
- [ ] Mundo 2: UX Research
- [ ] Mundo 3: UX Writing
- [ ] Sistema de logros (badges)
- [ ] Tienda de items con monedas
- [ ] Login y sincronización en la nube
- [ ] Leaderboards
- [ ] Compartir progreso en redes

### v3.0 - Monetización
- [ ] Suscripción premium
- [ ] Contenido exclusivo
- [ ] Certificados al completar mundos

---

## 👥 Créditos

**Producto diseñado por**: Equipo completo simulado (PM + Game Designer + UX/UI + Tech Lead + QA)

**MVP desarrollado para**: Testing inicial con usuarios reales

**Versión**: 1.0.0

---

## 📄 Licencia

Este proyecto es un MVP de demostración educativa.

---

## 🆘 Soporte

Para reportar bugs o sugerir features, crear un issue en el repositorio.

