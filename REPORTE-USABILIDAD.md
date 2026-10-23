# Reporte de BrightSteps desde la perspectiva de un usuario

Fecha: 23 de octubre de 2026.

Alcance: revisión de los flujos implementados y del código. El servidor Vite arrancó, pero el navegador de esta sesión no pudo conectarse a localhost. Los hallazgos siguientes se sustentan en la implementación; no equivalen a una prueba visual ni de audio en un dispositivo real. No se modificó la app.

## Problemas de mayor prioridad

### 1. «Puedo borrar todo por tocar Reset una vez» — Alta
- Recorrido: Padres → entrar → Reset.
- El botón ejecuta directamente el borrado de todos los perfiles y su progreso. No hay confirmación, explicación del alcance ni recuperación.
- Como usuario, puedo creer que reinicia la actividad o el perfil actual y perder también los demás niños.
- Propuesta: indicar «Borrar todos los perfiles y el progreso», mostrar el alcance y pedir confirmación antes del borrado.
- Evidencia: `src/components/ParentDashboard.jsx`, botón `onReset`; `src/app/App.jsx`, implementación de `onReset`.

### 2. «Silencié la app, pero la lección de zapatos sigue hablando» — Alta
- Recorrido propuesto: desactivar sonido → Aprender → Atarse los zapatos → Escuchar este paso.
- La lección no recibe el estado global de silencio y llama a `speak` con `soundOff=false`.
- Como cuidador, no puedo confiar en el botón general de silencio para controlar estímulos sonoros.
- Propuesta: aplicar el mismo control de audio a todas las pantallas y detener la voz en curso al silenciar.
- Evidencia: `src/app/App.jsx`, montaje de `ShoeLesson`; `src/screens/Lessons.jsx`, `speakText`.

### 3. «Después de entrar a Padres, queda abierto para el niño» — Alta
- Recorrido: entrar a Padres → Inicio → Padres.
- El desbloqueo permanece activo durante la sesión; salir del panel o cambiar de perfil no lo revoca.
- Además, basta escribir cualquier año que cumpla la edad mínima; el propio campo ofrece 1988 como ejemplo. Es una barrera infantil débil, no una autenticación.
- Propuesta: volver a bloquear al salir y ofrecer un PIN opcional del cuidador.
- Evidencia: `src/app/App.jsx`, `parentUnlocked`; `src/components/ParentDashboard.jsx`, `ParentGate`.

### 4. «Creo que guardó mis cambios, pero puedo perderlos sin aviso» — Alta
- Si el almacenamiento está bloqueado o lleno, la interfaz sigue funcionando, pero los errores de guardado se descartan sin informar al usuario.
- Al volver a abrir la app pueden faltar cambios o progreso que parecían guardados.
- Propuesta: mostrar un aviso de guardado fallido y permitir reintentar o exportar los datos.
- Evidencia: `src/lib/storage.js`, `saveJson` y `saveText`.

## Cosas confusas y obstáculos

### 5. «No puedo cancelar la creación o edición de un perfil» — Media
- Recorrido: Padres → Añadir niño o Editar perfil.
- Se abre el asistente de seis pasos sin botón para cancelar o volver a Inicio. En el primer paso, Atrás está desactivado.
- Como usuario, tengo que completar el proceso o recargar para salir.
- Propuesta: añadir Cancelar y conservar el perfil original hasta guardar.
- Evidencia: `src/components/ProfileSetup.jsx`, `Onboarding`; retorno exclusivo del asistente en `src/app/App.jsx`.

### 6. «Actualizo la página y pierdo dónde estaba» — Media
- La pantalla y la actividad se guardan únicamente en memoria. Al recargar con un perfil existente, se vuelve a Inicio; los pasos del asistente tampoco se conservan.
- La navegación no registra rutas ni historial de pantallas, por lo que el botón Atrás del navegador no representa el recorrido dentro de la app.
- Propuesta: incorporar rutas para las pantallas y permitir reanudar actividades o borradores.
- Evidencia: `src/app/App.jsx`, estados `screen` y `activeActivity`; `src/components/ProfileSetup.jsx`, estados `step` y `form`.

### 7. «La opción Videos muestra imágenes que cambian solas» — Media
- En Atarse los zapatos, Videos reproduce una secuencia de imágenes cada 1,3 segundos; no muestra un video de la acción.
- Para aprender un movimiento manual, el nombre promete más detalle del que entrega, y el avance puede resultar rápido.
- Propuesta: llamarlo «Secuencia automática» y permitir ajustar la velocidad, o incorporar un video demostrativo.
- Evidencia: `src/screens/MediaToggle.jsx`; `src/screens/Lessons.jsx`, `videoTimerRef` y `lesson-video-stage`.

### 8. «La app dice Escuchado aunque la voz haya fallado» — Media
- Los tableros actualizan `lastSpoken` antes de intentar reproducir la voz. No muestran errores de síntesis ni verifican que el audio haya comenzado.
- Si la voz no está disponible, el usuario recibe una confirmación que no representa lo sucedido.
- Propuesta: distinguir entre mensaje seleccionado, reproduciendo y error de audio.
- Evidencia: `src/screens/Communication.jsx`, funciones `speakText`; `src/lib/speech.js`.

### 9. «Al añadir el mensaje 13 desaparece uno anterior» — Media
- Los mensajes personalizados se limitan a los últimos doce con `slice(-12)`. No se informa el límite ni se avisa de que se eliminará el más antiguo.
- Como cuidador, puedo perder una tarjeta importante al añadir otra.
- Propuesta: mostrar el límite y pedir que el usuario elija qué tarjeta sustituir.
- Evidencia: `src/components/ParentDashboard.jsx`, `addCustomMessage`.

### 10. «No entiendo por qué no puedo seguir con el perfil» — Media
- El asistente exige seleccionar un nivel de apoyo y al menos una habilidad de comunicación. No ofrece una opción visible de «No lo sé» en ese flujo ni explica junto al botón desactivado qué falta.
- Como cuidador nuevo, puedo quedar bloqueado o escoger una respuesta solo para avanzar.
- Propuesta: explicar los requisitos pendientes y permitir indicar que no se conoce la respuesta.
- Evidencia: `src/components/ProfileSetup.jsx`, `canContinue` y paso de nivel de apoyo.

## Orden recomendado

Primero: evitar borrados accidentales, respetar el silencio global y avisar cuando no se guardan los datos. Después: cerrar correctamente el área de padres y permitir cancelar el asistente. Por último: mejorar navegación, mensajes de audio y nombres de las funciones.

## Pendiente de probar en pantalla

Legibilidad y contraste con cada fondo; tamaño de botones en móvil; uso con teclado y lector de pantalla; voz en español; juegos completos; audio real y persistencia después de cerrar el navegador. No se emiten conclusiones visuales sobre estas áreas sin probarlas.
