# Plan de Implementación: Decoración y Animación de Halloween

Implementar una experiencia temática interactiva de Halloween para **Roos Capital**, con telarañas detalladas en las esquinas y laterales, junto con arañas interactivas que bajan en hilos, se balancean y caminan libremente con reacción al cursor.

---

## 1. Componente `HalloweenDecorations.tsx`
Crear un componente dedicado e independiente (`src/components/HalloweenDecorations.tsx`) que administre:
- **Telarañas en los bordes y esquinas laterales:**
  - Telarañas en las esquinas superiores y bordes laterales (izquierda y derecha).
  - SVGs de alta fidelidad con hilos finos en tono blanco-plata translúcido y sutil brillo tenue acorde a la estética elegante de la marca.
  - Efecto de suave oscilación con el viento usando transiciones CSS / Framer Motion.
- **Arañas colgantes con hilos de seda:**
  - Arañas que descienden del techo o esquinas en un hilo elástico invisible/plateado.
  - Al acercar el cursor del mouse (o tocar en móvil), la araña se asusta y trepa rápidamente hacia arriba por su hilo o se balancea vigorosamente.
- **Arañas caminando por el sitio:**
  - Arañas que recorren la pantalla de manera orgánica (en bordes y áreas visibles).
  - Animación fluida de 8 patitas articuladas mediante SVG + Canvas/CSS.
  - Detección de proximidad al cursor: si el usuario acerca el mouse o hace clic cerca, la araña cambia de dirección y acelera (huye divertidamente).
- **Control de interacción:**
  - `pointer-events: none` general para que **nunca interfiera** con botones, enlaces ni clicks en la plataforma.
  - Event listener de ratón global (`mousemove`, `touchmove`) con `requestAnimationFrame` para calcular la interacción y huida sin ralentizar la interfaz (60fps garantizados).

---

## 2. Integración en `src/App.tsx`
- Importar y renderizar `<HalloweenDecorations />` a nivel raíz de la aplicación, manteniéndose siempre activo durante la navegación sin bloquear la interacción existente ni el rendimiento móvil.

---

## 3. Verificación y Optimización
- Comprobar que no genera lag en el scroll ni en el hover de las tarjetas.
- Comprobar correcta adaptación responsiva tanto en teléfonos móviles como en monitores de escritorio.
- Ejecutar compilación (`compile_applet`) y verificación de linting (`lint_applet`).
