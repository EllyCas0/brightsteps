# Aplicación React

## Ejecutar

```sh
npm install
npm run dev
```

Vite imprime la URL local disponible. Para generar la versión de producción: `npm run build`. Para revisarla: `npm run preview`.

## Organización

- `src/main.jsx`: monta React y carga los estilos globales.
- `src/app/App.jsx`: coordina navegación, estado y pantallas cargadas bajo demanda.
- `src/screens/`: pantallas y experiencias de actividades.
- `src/components/`: componentes reutilizables, controles de perfil y panel de padres.
- `src/services/profiles.js`: normalización de perfiles, migración de datos guardados y personalización.
- `src/services/progress.js`: normalización de progreso, días activos y claves de almacenamiento por perfil.
- `src/lib/`: utilidades compartidas de almacenamiento, colecciones y voz.
- `src/data/`: contenido separado por responsabilidad:
  - `catalog.js`: categorías, actividades y secciones de aprendizaje.
  - `games.js`: configuración de juegos y utilidades de cartas.
  - `guidedActivities.js`: actividades guiadas.
  - `lessons.js`: pasos de lecciones.
  - `speechBoards.js` y `communication.js`: tableros y contenido de comunicación.
  - `profileCore.js`: valores predeterminados y opciones de perfil.
  - `resources.js`: consejos para padres.
  - `imageAssets.js`: registro de imágenes y alias utilizados por `VisualAsset`.
  - `backgroundTopics.jsx`: temas de fondo.
  - `translations.js`: textos y contexto de idioma.
- `src/styles/`: estilos separados por área; `responsive.css` se importa al final.

`appData.jsx` conserva las exportaciones de compatibilidad. El código nuevo debe importar directamente el módulo que necesita para evitar dependencias con todo el catálogo.

## Imágenes

Las imágenes se importan desde `src/assets/` para que Vite gestione sus URLs y versiones:

```text
assets/
  avatars/                personajes y expresiones
  backgrounds-by-topic/   fondos temáticos
  theme-icons/            iconos del selector de fondos
  images/
    calm/                 respiración, yoga y calma
    communication/        comunicación y apoyo
    emotions/             expresiones emocionales
    learning/             aprendizaje y juegos
    objects/              objetos, animales y naturaleza
    routines/             hábitos y pasos de cuidado personal
```

Para añadir una imagen, guarda el archivo con nombre descriptivo en su carpeta, impórtalo en `src/data/imageAssets.js` y añade su clave a `imageAssets`. Usa `<VisualAsset imageKey="Tu clave" />` en los componentes. Conserva las claves existentes: algunas también identifican contenido y preferencias guardadas.

Para añadir una actividad, registra su entrada en `catalog.js`, su configuración en el módulo correspondiente y sus traducciones en `translations.js`. Para añadir una pantalla, créala en `screens/` y conecta su navegación en `app/App.jsx`; mantén la carga con `lazy` cuando corresponda.

La lógica de datos y persistencia pertenece a `services/` o `lib/`; los componentes se encargan de presentarla y de manejar la interacción.
