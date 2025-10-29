\*\* Descripción del Proyecto

Este proyecto implementa el clásico juego Snake con un sistema de control innovador que utiliza gestos de manos en lugar de teclado. La aplicación detecta movimientos de la mano a través de la cámara web y los traduce en comandos de dirección para controlar la serpiente.

\*\* Poblema de clasificacion:

El problema de clasificación asociado es identificar la dirección del movimiento (arriba, abajo, izquierda, derecha) basándose en la posición de la mano detectada por la cámara.

Se trata de un problema de clasificación multiclase en tiempo real donde:

Entrada: Las coordenadas (x, y) de la mano en el espacio de la cámara

Salida: Una de las 4 direcciones posibles para mover la serpiente

Reto: Convertir posiciones espaciales continuas en categorías discretas de movimiento de manera precisa y con baja latencia

La solución implementada divide el área de la cámara en zonas y clasifica según en qué zona se encuentra la mano del usuario.

\*\* Modelo utilizado (MediaPipe Hands)

Se utilizó MediaPipe Hands, una biblioteca de detección de manos pre-entrenada

\*\* ¿Por qué MediaPipe Hands?

1. Ya viene listo para usar
2. Es rápido y eficiente
3. Detecta lo que necesitamos
4. Fácil de implementar
