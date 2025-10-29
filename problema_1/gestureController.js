class GestureController {
  constructor() {
    this.hands = null;
    this.camera = null;
    this.lastDirection = { x: 0, y: 0 };
    this.currentDirection = { x: 0, y: 0 };
    this.isInitialized = false;
    
    this.initHandTracking();
  }

  initHandTracking() {
    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.hands.onResults(this.onHandResults.bind(this));

    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement });
      },
      width: 640,
      height: 480
    });

    camera.start();
    this.isInitialized = true;
  }

  get videoElement() {
    if (!this._videoElement) {
      this._videoElement = document.createElement('video');
      this._videoElement.style.position = 'fixed';
      this._videoElement.style.top = '10px';
      this._videoElement.style.right = '10px';
      this._videoElement.style.width = '200px';
      this._videoElement.style.zIndex = '1000';
      document.body.appendChild(this._videoElement);
    }
    return this._videoElement;
  }

  onHandResults(results) {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      document.getElementById('status').textContent = 'No se detecta mano';
      return;
    }

    const landmarks = results.multiHandLandmarks[0];
    this.updateDirection(landmarks);
    this.updateStatusDisplay(landmarks);
  }

 updateDirection(landmarks) {
  const wrist = landmarks[0];
  
  const zoneWidth = 0.3;
  
  if (wrist.x > 0.7) {
    this.currentDirection = { x: -1, y: 0 };
  }
  else if (wrist.x < 0.3) {
    this.currentDirection = { x: 1, y: 0 };
  }
  else if (wrist.y < 0.3) {
    this.currentDirection = { x: 0, y: -1 };
  }
  else if (wrist.y > 0.7) {
    this.currentDirection = { x: 0, y: 1 };
  }
  
  if (this.currentDirection.x !== this.lastDirection.x || 
      this.currentDirection.y !== this.lastDirection.y) {
    this.lastDirection = { ...this.currentDirection };
    this.applyDirectionToSnake();
  }
}

  updateStatusDisplay(landmarks) {
    const wrist = landmarks[0];
    let directionText = '';
    
    if (this.currentDirection.x === 1) directionText = '➡️ DERECHA';
    else if (this.currentDirection.x === -1) directionText = '⬅️ IZQUIERDA';
    else if (this.currentDirection.y === -1) directionText = '⬆️ ARRIBA';
    else if (this.currentDirection.y === 1) directionText = '⬇️ ABAJO';
    else directionText = 'CENTRO';

    document.getElementById('status').textContent = 
      `Mano detectada - Dirección: ${directionText}`;
  }

  applyDirectionToSnake() {
    if (window.snake && this.currentDirection.x !== 0 || this.currentDirection.y !== 0) {
      window.snake.setDir(this.currentDirection.x, this.currentDirection.y);
    }
  }
}

let gestureController;

function setupGestureControl() {
  gestureController = new GestureController();
}

window.addEventListener('load', setupGestureControl);