/* ========================================
   GEOMETRY BASH - JUEGO INTERACTIVO
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

// Pasos del juego
const gameSteps = [
    {
        title: 'Entrenamiento - "Dibuja la Geometría"',
        instruction: 'Comencemos con algo simple. Dibuja un <strong>CUADRADO</strong> en el teclado usando las teclas <span class="highlight">1-3-9-7</span>.',
        expectedPattern: ['1', '3', '9', '7'],
        isTraining: true
    },
    {
        title: 'Creación - "Diseña tu Patrón Secreto"',
        instruction: '¡Ahora es tu turno! Crea tu propio patrón secreto. Combina formas, líneas o movimientos que solo tú conozcas. <strong>Tu misión: crear una contraseña de al menos 12 caracteres.</strong>',
        minLength: 12,
        isTraining: false
    },
    {
        title: 'La Prueba de Memoria - "Confirma tu Habilidad"',
        instruction: '¡Excelente patrón! Ahora, la prueba final. ¿Puedes recordarlo? <strong>Repite tu secuencia de movimientos.</strong>',
        isVerifying: true
    }
];

// Configuración del canvas para dibujar patrones
let canvas, ctx;
let numpadKeys = {};

// Tiempos de descifrado (basados en ataques de fuerza bruta, solo números)
const crackTimes = [
    { length: 0, time: 'Sin datos', level: 0 },
    { length: 1, time: 'Instantáneo', level: 5 },
    { length: 2, time: 'Instantáneo', level: 10 },
    { length: 3, time: 'Instantáneo', level: 15 },
    { length: 4, time: 'Instantáneo', level: 20 },
    { length: 5, time: '0.1 segundos', level: 25 },
    { length: 6, time: '4 segundos', level: 30 },
    { length: 7, time: '37 segundos', level: 35 },
    { length: 8, time: '6 minutos', level: 40 },
    { length: 9, time: '1 hora', level: 50 },
    { length: 10, time: '10 horas', level: 60 },
    { length: 11, time: '4 días', level: 70 },
    { length: 12, time: '42 días', level: 80 },
    { length: 13, time: '1 año', level: 85 },
    { length: 14, time: '11 años', level: 90 },
    { length: 15, time: '114 años', level: 95 }
];

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
    initializeNumpad();
    initializeButtons();
    updateInstructions();
});

function initializeCanvas() {
    canvas = document.getElementById('patternCanvas');
    ctx = canvas.getContext('2d');

    // Configurar tamaño del canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
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
    // Botón "Aceptar el reto"
    document.getElementById('startBtn').addEventListener('click', () => {
        document.getElementById('challenge').scrollIntoView({ behavior: 'smooth' });
    });

    // Botón "Borrar"
    document.getElementById('clearBtn').addEventListener('click', clearPattern);

    // Botón "Siguiente"
    document.getElementById('nextBtn').addEventListener('click', nextStep);

    // Botón "Reintentar"
    document.getElementById('restartBtn').addEventListener('click', restartGame);
}

/* ========================================
   MANEJO DE ENTRADA DE TECLAS
   ======================================== */
function handleKeyPress(num) {
    const currentStepData = gameSteps[gameState.currentStep];

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
    const data = crackTimes.find(item => item.length === length) ||
                 crackTimes[crackTimes.length - 1];

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
   LÓGICA DEL JUEGO - PASO 1: ENTRENAMIENTO
   ======================================== */
function checkTrainingPattern() {
    const expected = gameSteps[0].expectedPattern;
    const current = gameState.pattern;

    if (current.length > expected.length) {
        showFeedback('❌ Has presionado demasiadas teclas. Intenta de nuevo con 1-3-9-7.', 'error');
        setTimeout(clearPattern, 2000);
        return;
    }

    // Verificar si coincide hasta ahora
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== expected[i]) {
            showFeedback('❌ Secuencia incorrecta. Recuerda: 1-3-9-7 forma un cuadrado.', 'error');
            setTimeout(clearPattern, 2000);
            return;
        }
    }

    // Si completó el patrón correctamente
    if (current.length === expected.length) {
        showFeedback(
            '⚠️ Contraseña generada: <strong>1397</strong>. ' +
            'Tiempo para descifrarla: <span style="color: var(--danger-red)">¡Instantáneo!</span> ' +
            'Necesitamos algo más fuerte, agente.',
            'warning'
        );
        document.getElementById('nextBtn').style.display = 'block';
    }
}

/* ========================================
   LÓGICA DEL JUEGO - PASO 2: CREACIÓN
   ======================================== */
function checkCreationProgress() {
    const minLength = gameSteps[1].minLength;
    const currentLength = gameState.password.length;

    if (currentLength >= minLength) {
        const data = crackTimes.find(item => item.length === currentLength) ||
                     crackTimes[crackTimes.length - 1];

        showFeedback(
            `✅ ¡Excelente! Tu contraseña tiene ${currentLength} dígitos. ` +
            `Tiempo estimado para descifrarla: <strong style="color: var(--success-green)">${data.time}</strong>. ` +
            `¡Eso es poder! Cuando estés satisfecho, presiona "Siguiente".`,
            'success'
        );
        document.getElementById('nextBtn').style.display = 'block';
    } else {
        const remaining = minLength - currentLength;
        showFeedback(
            `Sigue creando tu patrón. Necesitas al menos ${remaining} dígitos más para alcanzar el objetivo de 12.`,
            'info'
        );
        document.getElementById('nextBtn').style.display = 'none';
    }
}

/* ========================================
   LÓGICA DEL JUEGO - PASO 3: VERIFICACIÓN
   ======================================== */
function checkVerificationPattern() {
    const expected = gameState.savedPattern;
    const current = gameState.pattern;

    if (current.length > expected.length) {
        showFeedback('❌ Esa no es tu secuencia. Intenta de nuevo.', 'error');
        setTimeout(clearPattern, 2000);
        return;
    }

    // Verificar si coincide hasta ahora
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== expected[i]) {
            showFeedback('❌ Secuencia incorrecta. Concéntrate en recordar el movimiento, no los números.', 'error');
            setTimeout(clearPattern, 2000);
            return;
        }
    }

    // Si completó el patrón correctamente
    if (current.length === expected.length) {
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
    // Guardar patrón si es el paso de creación
    if (gameState.currentStep === 1) {
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

/* ========================================
   UTILIDADES
   ======================================== */

// Efecto de typing para textos importantes
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Partículas de éxito (opcional)
function createSuccessParticles() {
    const colors = ['#00ffff', '#ff00ff', '#39ff14', '#00d4ff'];
    const container = document.querySelector('.success-animation');

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.pointerEvents = 'none';

        container.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 2 + Math.random() * 3;

        let x = 0;
        let y = 0;
        let opacity = 1;

        function animate() {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.02;

            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        animate();
    }
}
