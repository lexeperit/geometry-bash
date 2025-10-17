/* ========================================
   GEOMETRY BASH - JUEGO INTERACTIVO V3
   ======================================== */

// Estado del juego
const gameState = {
    currentStep: 0,
    password: '',
    pattern: [],
    userPattern: [],
    savedPassword: '',
    savedPattern: [],
    isTraining: false,
    isVerifying: false
};

// Definición de figuras geométricas - PATRONES CORREGIDOS
const geometricShapes = {
    square: {
        name: 'Cuadrado',
        pattern: ['1', '3', '9', '7', '1'],
        description: 'Comienza en la esquina superior izquierda y dibuja un cuadrado cerrando al final'
    },
    triangle: {
        name: 'Triángulo',
        pattern: ['2', '7', '3', '2'],
        description: 'Dibuja un triángulo comenzando desde arriba y ciérralo'
    },
    line: {
        name: 'Línea Vertical',
        pattern: ['2', '5', '8'],
        description: 'Una línea recta de arriba hacia abajo por el centro'
    },
    zigzag: {
        name: 'Zig-Zag',
        pattern: ['1', '5', '9', '5', '1'],
        description: 'Un movimiento en zig-zag que cierra en el punto de inicio'
    },
    cross: {
        name: 'Cruz',
        pattern: ['2', '5', '8', '5', '4', '5', '6', '5'],
        description: 'Dibuja una cruz simétrica volviendo al centro'
    },
    diamond: {
        name: 'Rombo',
        pattern: ['2', '4', '8', '6', '2'],
        description: 'Un rombo centrado que se cierra correctamente'
    },
    spiral: {
        name: 'Espiral',
        pattern: ['5', '6', '9', '8', '7', '4', '1', '2', '3', '5'],
        description: 'Una espiral desde el centro hacia afuera y de vuelta al centro'
    },
    doubleSquare: {
        name: 'Cuadrado Doble',
        pattern: ['1', '3', '9', '7', '1', '2', '3', '6', '9'],
        description: 'Dos cuadrados conectados en movimiento continuo'
    }
};

// Pasos del juego ampliados
const gameSteps = [
    {
        title: 'Nivel 1 - "El Cuadrado Básico"',
        instruction: 'Comencemos con algo simple. Dibuja un <strong>CUADRADO</strong> en el teclado.<br>Sigue el patrón mostrado 1, 3, 9, 7, 1.',
        expectedPattern: geometricShapes.square.pattern,
        shape: 'square',
        isTraining: true,
        showShape: true
    },
    {
        title: 'Nivel 2 - "El Triángulo"',
        instruction: '¡Excelente! Ahora dibuja un <strong>TRIÁNGULO</strong>.<br>Observa la figura objetivo y replica el movimiento 2, 7, 3, 2.',
        expectedPattern: geometricShapes.triangle.pattern,
        shape: 'triangle',
        isTraining: true,
        showShape: true
    },
    {
        title: 'Nivel 3 - "La Línea"',
        instruction: 'Perfecto. Ahora algo más simple: una <strong>LÍNEA VERTICAL</strong> por el centro 2, 5 , 8.',
        expectedPattern: geometricShapes.line.pattern,
        shape: 'line',
        isTraining: true,
        showShape: true
    },
    {
        title: 'Nivel 4 - "El Zig-Zag"',
        instruction: 'Aumentamos la complejidad. Dibuja un <strong>ZIG-ZAG</strong> en diagonal 1, 5, 9, 5, 1.',
        expectedPattern: geometricShapes.zigzag.pattern,
        shape: 'zigzag',
        isTraining: true,
        showShape: true
    },
    {
        title: 'Nivel 5 - "La Cruz"',
        instruction: 'Ahora una figura más compleja: la <strong>CRUZ</strong>. Nota que pasas por el centro varias veces y terminas en el centro 2, 5, 8, 5, 4, 5, 6, 5',
        expectedPattern: geometricShapes.cross.pattern,
        shape: 'cross',
        isTraining: true,
        showShape: true
    },
    {
        title: 'Nivel 6 - "El Rombo"',
        instruction: '¡Casi experto! Dibuja un <strong>ROMBO</strong> perfecto 2, 4, 8, 6, 2.',
        expectedPattern: geometricShapes.diamond.pattern,
        shape: 'diamond',
        isTraining: true,
        showShape: true
    },
   {
       title: 'Nivel 7 - "Espiral"',
      instruction: '¡Vámos! Lo estás haciendo bien, ahora intenta con una <strong>ESPIRAL</strong> desde el centro hacia afuera 5, 6, 9, 8, 7, 4, 1, 2, 3, 5.',
      expectedPattern: geometricShapes.spiral.pattern,
      shape: 'spiral',
      isTraining:true,
      showShape:true
    },
    {
        title: 'Nivel 8 - "Cuadrado Doble"',
        instruction: '¡Probemos si recuerdas los cuadrados... ahora dibuja un <strong>CUADRADO DOBLE</strong> 1, 3, 9, 7, 1, 2, 3, 6, 9.',
        expectedPattern: geometricShapes.doubleSquare.pattern,
        shape: 'doubleSquare',
        isTraining:true,
        showShape:true
    },
    {
        title: 'Nivel 9 - "Combinación Libre"',
        instruction: '¡Ahora es tu turno! Combina <strong>DOS O MÁS FIGURAS</strong> que aprendiste.<br>Ejemplo: Cuadrado + Triángulo, o inventa tu propio patrón.<br><strong>Objetivo: mínimo 10 dígitos.</strong>',
        minLength: 10,
        isTraining: false,
        showShape: false
    },
    {
        title: 'Nivel 11 - "Creación Avanzada"',
        instruction: 'Excelente progreso. Ahora crea un patrón más complejo.<br><strong>Objetivo: mínimo 14 dígitos.</strong><br>Piensa en movimientos únicos y memorables.',
        minLength: 14,
        isTraining: false,
        showShape: false
    },
    {
        title: 'Prueba Final - "Confirma tu Memoria"',
        instruction: '¡El momento de la verdad! El tablero será borrado.<br><strong>Reproduce tu patrón avanzado de memoria.</strong>',
        isVerifying: true,
        showShape: false
    }
];

// Audio Context para efectos de sonido
let audioContext;
let soundEnabled = true;

// Configuración del canvas para dibujar patrones
let canvas, ctx, shapeCanvas, shapeCtx;
let numpadKeys = {};

// Tiempos de descifrado (basados en ataques de fuerza bruta, solo números)
const crackTimes = [
    { length: 0, time: 'Sin datos', level: 0 },
    { length: 1, time: 'Instantáneo', level: 5 },
    { length: 2, time: 'Instantáneo', level: 10 },
    { length: 3, time: 'Instantáneo', level: 15 },
    { length: 4, time: 'Instantáneo', level: 20 },
    { length: 5, time: '0.1 segundos', level: 22 },
    { length: 6, time: '4 segundos', level: 25 },
    { length: 7, time: '37 segundos', level: 30 },
    { length: 8, time: '6 minutos', level: 35 },
    { length: 9, time: '1 hora', level: 40 },
    { length: 10, time: '10 horas', level: 50 },
    { length: 11, time: '4 días', level: 58 },
    { length: 12, time: '42 días', level: 65 },
    { length: 13, time: '1 año', level: 72 },
    { length: 14, time: '11 años', level: 80 },
    { length: 15, time: '114 años', level: 87 },
    { length: 16, time: '1,140 años', level: 92 },
    { length: 17, time: '11,400 años', level: 95 },
    { length: 18, time: '114,000 años', level: 98 },
    { length: 19, time: '1.14 millones de años', level: 99 },
    { length: 20, time: '11.4 millones de años', level: 100 }
];

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    initializeAudio();
    initializeCanvas();
    initializeShapeCanvas();
    initializeNumpad();
    initializeButtons();
    updateInstructions();
});

function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio inicializado correctamente');
    } catch (e) {
        console.warn('Web Audio API no soportada', e);
        soundEnabled = false;
    }
}

function playKeySound(frequency = 440) {
    if (!soundEnabled || !audioContext) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
        console.warn('Error reproduciendo sonido', e);
    }
}

function playSuccessSound() {
    if (!soundEnabled || !audioContext) return;

    try {
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (acorde mayor)

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = freq;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 100);
        });
    } catch (e) {
        console.warn('Error reproduciendo sonido de éxito', e);
    }
}

function playErrorSound() {
    if (!soundEnabled || !audioContext) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.warn('Error reproduciendo sonido de error', e);
    }
}

function initializeCanvas() {
    canvas = document.getElementById('patternCanvas');
    ctx = canvas.getContext('2d');

    // Configurar tamaño del canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function initializeShapeCanvas() {
    shapeCanvas = document.getElementById('shapeCanvas');
    shapeCtx = shapeCanvas.getContext('2d');

    // Sincronizar tamaño con el container del numpad
    const container = document.querySelector('.numpad-container');
    shapeCanvas.width = container.offsetWidth;
    shapeCanvas.height = container.offsetHeight;

    // Redibujar cuando cambia el tamaño
    window.addEventListener('resize', resizeShapeCanvas);
}

function resizeShapeCanvas() {
    const container = document.querySelector('.numpad-container');
    shapeCanvas.width = container.offsetWidth;
    shapeCanvas.height = container.offsetHeight;
    
    const step = gameSteps[gameState.currentStep];
    if (step.showShape && step.shape) {
        drawShapeGuide(step.shape);
    }
}

function resizeCanvas() {
    const container = document.querySelector('.numpad-container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    redrawPattern();
}

function initializeNumpad() {
    const keys = document.querySelectorAll('.num-key[data-num]');

    keys.forEach(key => {
        const num = key.getAttribute('data-num');
        const rect = key.getBoundingClientRect();
        const containerRect = document.querySelector('.numpad-container').getBoundingClientRect();

        // Guardar posición relativa de cada tecla
        numpadKeys[num] = {
            element: key,
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
        };

        // Agregar event listener
        key.addEventListener('click', () => handleKeyPress(num));
    });

    // Actualizar posiciones en resize
    window.addEventListener('resize', updateKeyPositions);
}

function updateKeyPositions() {
    const keys = document.querySelectorAll('.num-key[data-num]');
    const containerRect = document.querySelector('.numpad-container').getBoundingClientRect();

    keys.forEach(key => {
        const num = key.getAttribute('data-num');
        const rect = key.getBoundingClientRect();
        numpadKeys[num].x = rect.left - containerRect.left + rect.width / 2;
        numpadKeys[num].y = rect.top - containerRect.top + rect.height / 2;
    });

    redrawPattern();
}

function initializeButtons() {
    // Botón "Comenzar entrenamiento"
    document.getElementById('startBtn').addEventListener('click', () => {
        document.getElementById('challenge').scrollIntoView({ behavior: 'smooth' });
    });

    // Botón "Borrar"
    document.getElementById('clearBtn').addEventListener('click', clearPattern);

    // Botón "Siguiente"
    document.getElementById('nextBtn').addEventListener('click', nextStep);

    // Botón "Reintentar"
    document.getElementById('restartBtn').addEventListener('click', restartGame);

    // Botón "Explorar la teoría"
    document.getElementById('exploreTheoryBtn').addEventListener('click', () => {
        document.getElementById('theory').scrollIntoView({ behavior: 'smooth' });
    });
}

/* ========================================
   VISUALIZACIÓN DE FIGURAS GEOMÉTRICAS
   ======================================== */
function drawShapeGuide(shapeName) {
    const shape = geometricShapes[shapeName];
    if (!shape) return;

    // Limpiar canvas
    shapeCtx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);

    // Configurar estilo
    shapeCtx.strokeStyle = '#00ffff';
    shapeCtx.lineWidth = 3;
    shapeCtx.lineCap = 'round';
    shapeCtx.shadowBlur = 10;
    shapeCtx.shadowColor = '#00ffff';
    shapeCtx.fillStyle = '#00ffff';

    // USAR LAS MISMAS POSICIONES DINÁMICAS QUE EL NUMPAD REAL
    const positions = {
        '1': { x: numpadKeys['1'].x, y: numpadKeys['1'].y },
        '2': { x: numpadKeys['2'].x, y: numpadKeys['2'].y },
        '3': { x: numpadKeys['3'].x, y: numpadKeys['3'].y },
        '4': { x: numpadKeys['4'].x, y: numpadKeys['4'].y },
        '5': { x: numpadKeys['5'].x, y: numpadKeys['5'].y },
        '6': { x: numpadKeys['6'].x, y: numpadKeys['6'].y },
        '7': { x: numpadKeys['7'].x, y: numpadKeys['7'].y },
        '8': { x: numpadKeys['8'].x, y: numpadKeys['8'].y },
        '9': { x: numpadKeys['9'].x, y: numpadKeys['9'].y },
        '0': { x: numpadKeys['0'].x, y: numpadKeys['0'].y }
    };

    // Dibujar líneas
    shapeCtx.beginPath();
    const pattern = shape.pattern;
    const startPos = positions[pattern[0]];
    shapeCtx.moveTo(startPos.x, startPos.y);

    for (let i = 1; i < pattern.length; i++) {
        const pos = positions[pattern[i]];
        shapeCtx.lineTo(pos.x, pos.y);
    }
    shapeCtx.stroke();

    // Dibujar puntos
    pattern.forEach((num, index) => {
        const pos = positions[num];
        shapeCtx.beginPath();
        shapeCtx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
        shapeCtx.fill();

        // Numerar el orden
        shapeCtx.fillStyle = '#000';
        shapeCtx.font = 'bold 12px Arial';
        shapeCtx.textAlign = 'center';
        shapeCtx.textBaseline = 'middle';
        shapeCtx.fillText((index + 1).toString(), pos.x, pos.y);
        shapeCtx.fillStyle = '#00ffff';
    });

    // Actualizar nombre
    document.getElementById('shapeName').textContent = shape.name;
}

/* ========================================
   MANEJO DE ENTRADA DE TECLAS
   ======================================== */
function handleKeyPress(num) {
    const currentStepData = gameSteps[gameState.currentStep];

    // Reproducir sonido con frecuencia basada en la tecla
    const frequencies = {
        '1': 261.63, '2': 293.66, '3': 329.63,
        '4': 349.23, '5': 392.00, '6': 440.00,
        '7': 493.88, '8': 523.25, '9': 587.33, '0': 261.63
    };
    playKeySound(frequencies[num]);

    // Agregar número a la contraseña
    gameState.password += num;
    gameState.pattern.push(num);

    // Efecto visual en la tecla
    const key = numpadKeys[num].element;
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 300);

    // Dibujar línea en el canvas
    drawPattern();

    // Actualizar interfaz
    updatePasswordDisplay();
    updateStrengthMeter();

    // Verificar si es paso de entrenamiento
    if (currentStepData.isTraining) {
        checkTrainingPattern();
    }

    // Verificar si es paso de verificación
    if (currentStepData.isVerifying) {
        checkVerificationPattern();
    }

    // Verificar longitud mínima para paso de creación
    if (!currentStepData.isTraining && !currentStepData.isVerifying) {
        checkCreationProgress();
    }
}

/* ========================================
   DIBUJO DEL PATRÓN GEOMÉTRICO
   ======================================== */
function drawPattern() {
    const pattern = gameState.pattern;
    if (pattern.length < 2) return;

    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffff';

    // Dibujar línea desde la penúltima hasta la última tecla
    const prevKey = numpadKeys[pattern[pattern.length - 2]];
    const currKey = numpadKeys[pattern[pattern.length - 1]];

    ctx.beginPath();
    ctx.moveTo(prevKey.x, prevKey.y);
    ctx.lineTo(currKey.x, currKey.y);
    ctx.stroke();

    // Dibujar puntos en cada tecla
    pattern.forEach((num, index) => {
        const key = numpadKeys[num];
        const gradient = ctx.createRadialGradient(key.x, key.y, 0, key.x, key.y, 10);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#00ffff');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(key.x, key.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
}

function redrawPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pattern = gameState.pattern;
    if (pattern.length < 2) return;

    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffff';

    // Dibujar todas las líneas
    ctx.beginPath();
    ctx.moveTo(numpadKeys[pattern[0]].x, numpadKeys[pattern[0]].y);

    for (let i = 1; i < pattern.length; i++) {
        const key = numpadKeys[pattern[i]];
        ctx.lineTo(key.x, key.y);
    }
    ctx.stroke();

    // Dibujar puntos
    pattern.forEach(num => {
        const key = numpadKeys[num];
        const gradient = ctx.createRadialGradient(key.x, key.y, 0, key.x, key.y, 10);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#00ffff');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(key.x, key.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
}

function clearPattern() {
    gameState.password = '';
    gameState.pattern = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePasswordDisplay();
    updateStrengthMeter();

    // Limpiar feedback
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('nextBtn').style.display = 'none';
}

/* ========================================
   ACTUALIZACIÓN DE INTERFAZ
   ======================================== */
function updatePasswordDisplay() {
    const display = document.getElementById('passwordOutput');
    const lengthDisplay = document.getElementById('passwordLength');

    display.textContent = gameState.password || '****';
    lengthDisplay.textContent = `Longitud: ${gameState.password.length}`;
}

function updateStrengthMeter() {
    const length = gameState.password.length;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const crackTimeDisplay = document.getElementById('crackTime');

    // Encontrar datos de tiempo correspondientes
    let data = crackTimes.find(item => item.length === length);
    if (!data && length > 20) {
        data = { ...crackTimes[crackTimes.length - 1], level: 100 };
    }
    if (!data) {
        data = crackTimes[0];
    }

    // Actualizar barra
    const percentage = Math.min(data.level, 100);
    strengthBar.style.width = percentage + '%';

    // Determinar color y texto
    let strengthLevel, color;
    if (length === 0) {
        strengthLevel = 'Sin datos';
        color = '#666';
    } else if (length < 6) {
        strengthLevel = 'Muy Débil';
        color = '#ff0055';
    } else if (length < 8) {
        strengthLevel = 'Débil';
        color = '#ff9500';
    } else if (length < 10) {
        strengthLevel = 'Media';
        color = '#ffff00';
    } else if (length < 12) {
        strengthLevel = 'Buena';
        color = '#00ff88';
    } else if (length < 15) {
        strengthLevel = 'Muy Buena';
        color = '#00ff88';
    } else {
        strengthLevel = 'Excelente';
        color = '#39ff14';
    }

    strengthBar.style.background = color;
    strengthText.textContent = strengthLevel;
    strengthText.style.color = color;

    // Actualizar tiempo de descifrado
    crackTimeDisplay.textContent = data.time;

    // Efecto de parpadeo si es instantáneo
    if (data.time === 'Instantáneo') {
        crackTimeDisplay.style.color = '#ff0055';
        crackTimeDisplay.style.animation = 'flicker 1s infinite';
    } else {
        crackTimeDisplay.style.color = 'var(--neon-purple)';
        crackTimeDisplay.style.animation = 'none';
    }
}

function updateInstructions() {
    const step = gameSteps[gameState.currentStep];
    document.getElementById('instructionTitle').innerHTML = step.title;
    document.getElementById('instructionText').innerHTML = step.instruction;

    // Mostrar u ocultar guía de figura
    const shapeGuide = document.getElementById('shapeGuide');
    if (step.showShape && step.shape) {
        shapeGuide.style.display = 'block';
        drawShapeGuide(step.shape);
    } else {
        shapeGuide.style.display = 'none';
    }
}

function showFeedback(message, type = 'info') {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = message;

    // Estilos según tipo
    switch(type) {
        case 'success':
            feedback.style.borderLeft = '4px solid var(--success-green)';
            feedback.style.background = 'rgba(0, 255, 136, 0.1)';
            break;
        case 'error':
            feedback.style.borderLeft = '4px solid var(--danger-red)';
            feedback.style.background = 'rgba(255, 0, 85, 0.1)';
            break;
        case 'warning':
            feedback.style.borderLeft = '4px solid var(--warning-orange)';
            feedback.style.background = 'rgba(255, 149, 0, 0.1)';
            break;
        default:
            feedback.style.borderLeft = '4px solid var(--neon-blue)';
            feedback.style.background = 'rgba(0, 212, 255, 0.1)';
    }
}

/* ========================================
   LÓGICA DEL JUEGO - ENTRENAMIENTO
   ======================================== */
function checkTrainingPattern() {
    const expected = gameSteps[gameState.currentStep].expectedPattern;
    const current = gameState.pattern;

    if (current.length > expected.length) {
        playErrorSound();
        const shapeName = geometricShapes[gameSteps[gameState.currentStep].shape].name;
        showFeedback(`❌ Has presionado demasiadas teclas. El ${shapeName} solo requiere ${expected.length} toques.`, 'error');
        setTimeout(clearPattern, 2000);
        return;
    }

    // Verificar si coincide hasta ahora
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== expected[i]) {
            playErrorSound();
            showFeedback('❌ Secuencia incorrecta. Observa la figura guía y sigue el orden indicado.', 'error');
            setTimeout(clearPattern, 2000);
            return;
        }
    }

    // Si completó el patrón correctamente
    if (current.length === expected.length) {
        playSuccessSound();
        const shapeName = geometricShapes[gameSteps[gameState.currentStep].shape].name;
        showFeedback(
            `✅ ¡Perfecto! Has dibujado el ${shapeName} correctamente. ` +
            `Contraseña: <strong>${gameState.password}</strong>. ` +
            `Tiempo para descifrar: <strong>${crackTimes.find(c => c.length === current.length)?.time || 'Bajo'}</strong>.`,
            'success'
        );
        document.getElementById('nextBtn').style.display = 'block';
    }
}

/* ========================================
   LÓGICA DEL JUEGO - CREACIÓN
   ======================================== */
function checkCreationProgress() {
    const minLength = gameSteps[gameState.currentStep].minLength;
    const currentLength = gameState.password.length;

    if (currentLength >= minLength) {
        const data = crackTimes.find(item => item.length === currentLength) ||
                     crackTimes[crackTimes.length - 1];

        showFeedback(
            `✅ ¡Excelente! Tu contraseña tiene ${currentLength} dígitos. ` +
            `Tiempo estimado para descifrarla: <strong style="color: var(--success-green)">${data.time}</strong>. ` +
            `Cuando estés satisfecho, presiona "Siguiente".`,
            'success'
        );
        document.getElementById('nextBtn').style.display = 'block';
    } else {
        const remaining = minLength - currentLength;
        showFeedback(
            `Sigue creando tu patrón. Necesitas al menos ${remaining} dígitos más para alcanzar el objetivo de ${minLength}.`,
            'info'
        );
        document.getElementById('nextBtn').style.display = 'none';
    }
}

/* ========================================
   LÓGICA DEL JUEGO - VERIFICACIÓN
   ======================================== */
function checkVerificationPattern() {
    const expected = gameState.savedPattern;
    const current = gameState.pattern;

    if (current.length > expected.length) {
        playErrorSound();
        showFeedback('❌ Esa no es tu secuencia. Intenta de nuevo.', 'error');
        setTimeout(clearPattern, 2000);
        return;
    }

    // Verificar si coincide hasta ahora
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== expected[i]) {
            playErrorSound();
            showFeedback('❌ Secuencia incorrecta. Concéntrate en recordar el movimiento, no los números.', 'error');
            setTimeout(clearPattern, 2000);
            return;
        }
    }

    // Si completó el patrón correctamente
    if (current.length === expected.length) {
        playSuccessSound();
        showFeedback(
            '🎉 ¡Misión Cumplida! Has demostrado que la memoria geométrica es superior. ' +
            '<strong>No recordaste los números, ¡recordaste el movimiento!</strong>',
            'success'
        );

        // Mostrar botón para continuar a la conclusión
        setTimeout(() => {
            document.getElementById('gameContainer').style.display = 'none';
            document.getElementById('conclusion').style.display = 'block';
        }, 2000);
    }
}

/* ========================================
   NAVEGACIÓN ENTRE PASOS
   ======================================== */
function nextStep() {
    // Guardar patrón si es el penúltimo paso (antes de verificación)
    if (gameState.currentStep === gameSteps.length - 2) {
        gameState.savedPassword = gameState.password;
        gameState.savedPattern = [...gameState.pattern];
    }

    // Avanzar al siguiente paso
    gameState.currentStep++;

    if (gameState.currentStep >= gameSteps.length) {
        // No debería llegar aquí, pero por seguridad
        return;
    }

    // Limpiar estado
    clearPattern();

    // Si es el paso de verificación, ocultar el patrón
    if (gameSteps[gameState.currentStep].isVerifying) {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('passwordOutput').textContent = '****';
            showFeedback(
                'El tablero ha sido borrado. Ahora demuestra que puedes recordar tu patrón.',
                'info'
            );
        }, 1000);
    }

    // Actualizar instrucciones
    updateInstructions();

    // Ocultar botón siguiente
    document.getElementById('nextBtn').style.display = 'none';

    // Scroll suave al desafío
    document.getElementById('challenge').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function restartGame() {
    // Resetear estado
    gameState.currentStep = 0;
    gameState.password = '';
    gameState.pattern = [];
    gameState.savedPassword = '';
    gameState.savedPattern = [];

    // Mostrar juego, ocultar conclusión
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('conclusion').style.display = 'none';

    // Limpiar interfaz
    clearPattern();
    updateInstructions();

    // Scroll al inicio del desafío
    document.getElementById('challenge').scrollIntoView({ behavior: 'smooth' });
}
