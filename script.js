// ===== FLOATING YARN BACKGROUND =====
(function createFloatingYarn() {
    const container = document.getElementById('yarnContainer');
    const colors = ['#ffb3d9', '#d4b8ff', '#a8ffd4', '#ff2d95', '#39ff14', '#00f7ff', '#bf00ff', '#dfff00'];

    for (let i = 0; i < 30; i++) {
        const yarn = document.createElement('div');
        yarn.className = 'floating-yarn';
        yarn.style.left = Math.random() * 100 + '%';
        yarn.style.top = Math.random() * 100 + '%';
        yarn.style.background = colors[Math.floor(Math.random() * colors.length)];
        yarn.style.width = (10 + Math.random() * 20) + 'px';
        yarn.style.height = yarn.style.width;
        yarn.style.animationDuration = (10 + Math.random() * 20) + 's';
        yarn.style.animationDelay = -(Math.random() * 20) + 's';
        container.appendChild(yarn);
    }
})();

// ===== MEOW BUTTON =====
let meowCount = 0;
const meowMessages = [
    '🐱 Miau!',
    '🐱 Miaaau! 🐱',
    '🐱🐱 Miau miau!',
    '🐱🐱🐱 MIAAAAAAU!',
    '😺 Prrrrrr...',
    '😸 El gato te aprueba',
    '😻 Gatito feliz!',
    '🙀 Demasiados miau!',
    '😹 Jajaja miau',
    '😺🐟 Quiero pescado!',
    '😾 Ya basta de pulsar!',
    '🐱‍👤 Soy un ninja miau',
    '😸✨ Miau cosmico!',
    '🐱🎵 Miau musical~',
    '😺🌙 Miau nocturno...'
];

function meow() {
    meowCount++;
    const result = document.getElementById('meowResult');
    const msg = meowMessages[Math.min(meowCount - 1, meowMessages.length - 1)];
    result.textContent = msg;
    result.style.animation = 'none';
    result.offsetHeight; // reflow
    result.style.animation = 'fadeInUp 0.5s ease';

    if (meowCount >= 10) {
        // Rain cats!
        rainCats();
    }
}

function rainCats() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const cat = document.createElement('div');
            cat.textContent = '🐱';
            cat.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${1.5 + Math.random() * 2}rem;
                z-index: 9999;
                pointer-events: none;
                animation: catRain ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(cat);
            setTimeout(() => cat.remove(), 5000);
        }, i * 100);
    }

    // Add catRain animation if not exists
    if (!document.getElementById('catRainStyle')) {
        const style = document.createElement('style');
        style.id = 'catRainStyle';
        style.textContent = `
            @keyframes catRain {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== YARN BALLS =====
let yarnTouched = 0;

function bounceYarn(el) {
    el.classList.remove('bouncing');
    el.offsetHeight; // reflow
    el.classList.add('bouncing');
    yarnTouched++;
    document.getElementById('yarnCounter').textContent = `Ovillos tocados: ${yarnTouched}`;

    // Change color randomly
    const hue = Math.random() * 360;
    el.style.setProperty('--color1', `hsl(${hue}, 80%, 65%)`);
    el.style.setProperty('--color2', `hsl(${hue + 30}, 80%, 45%)`);

    // Spawn mini yarn
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const mini = document.createElement('div');
        mini.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: hsl(${Math.random() * 360}, 80%, 65%);
            pointer-events: none;
            z-index: 100;
            animation: miniYarnFly 0.8s ease-out forwards;
            --dx: ${(Math.random() - 0.5) * 200}px;
            --dy: ${(Math.random() - 0.5) * 200}px;
        `;
        document.body.appendChild(mini);
        setTimeout(() => mini.remove(), 1000);
    }

    if (!document.getElementById('miniYarnStyle')) {
        const style = document.createElement('style');
        style.id = 'miniYarnStyle';
        style.textContent = `
            @keyframes miniYarnFly {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    if (yarnTouched >= 20) {
        document.getElementById('yarnCounter').textContent =
            `Ovillos tocados: ${yarnTouched} - Eres oficialmente un gato 🐱`;
    }
}

// ===== ANIMAL CROSSING VILLAGER =====
const villagerPhrases = [
    'Hola! Bienvenido a Chorralandia!',
    'Tom Nook dice que le debes 3 millones de bayas...',
    'Has pescado hoy? Yo tampoco, estoy vago',
    'Isabelle dice que recojas las malas hierbas!',
    'Quieres un fossil? Solo cuesta tu alma',
    'Los vecinos estan cotilleando sobre ti...',
    'Blathers quiere que le lleves bichos a las 3AM',
    'K.K. Slider viene el sabado! Trae snacks',
    'Celeste dice que pidas un deseo! (no vale pedir dinero)',
    'Gulliver se ha vuelto a quedar dormido en la playa...',
    'Redd tiene un cuadro. Seguro que es falso.',
    'Nook: "Esto no es una estafa, es una hipoteca flexible"',
    'Pascal dice: "La vida es como una vieira... redonda"',
    'Saharah tiene alfombras. Nadie sabe de donde las saca.',
    'Wisp tiene miedo de su propia sombra. Otra vez.'
];

let phraseIndex = 0;

function villagerSpeak() {
    const bubble = document.getElementById('speechBubble');
    const text = document.getElementById('speechText');

    text.textContent = villagerPhrases[phraseIndex % villagerPhrases.length];
    phraseIndex++;

    bubble.classList.add('visible');
    setTimeout(() => bubble.classList.remove('visible'), 3000);

    // Make villager jump
    const villager = document.getElementById('villager');
    villager.style.animation = 'none';
    villager.offsetHeight;
    villager.style.animation = 'villagerJump 0.5s ease';
}

// Add villager jump animation
(function () {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes villagerJump {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
        }
    `;
    document.head.appendChild(style);
})();

// ===== TOM NOOK QUOTES =====
const nookQuotes = [
    '"Si, si. Tu hipoteca son solo 2.498.000 bayas. Pero no hay prisa, no no."',
    '"Bienvenido a Nook Inc.! Donde tus suenos cuestan el triple."',
    '"Ese terreno? Pues mira, te hago precio de amigo: solo 500.000 bayas."',
    '"No es trabajo infantil, es una experiencia formativa para Tendo y Nendo."',
    '"La isla desierta era gratis. Lo demas... ya tal."',
    '"Recuerda: una baya ahorrada es una baya que podrias haberme dado a mi."',
    '"Confias en mi? Yo si confio en tu dinero."',
    '"Millas Nook! Porque el dinero normal no era suficientemente confuso."',
    '"No te preocupes por la deuda. Preocupate por la SIGUIENTE deuda."',
    '"Isla paradisiaca! *Terminos y condiciones aplican. Muchas condiciones.*"',
    '"Que quieres ampliar tu casa? Excelente decision. Para mi bolsillo."',
    '"Soy un empresario responsable. Responsable de vaciarte los bolsillos."'
];

let quoteIndex = 0;

function nextNookQuote() {
    quoteIndex = (quoteIndex + 1) % nookQuotes.length;
    const card = document.getElementById('nookQuote');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
        card.querySelector('p').textContent = nookQuotes[quoteIndex];
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
}

// ===== MEME EXPLOSIONS =====
let explosionCount = 0;
const explosionComments = [
    'Todavia no ha explotado nadie...',
    'Primera victima!',
    'Esto se pone feo...',
    'Para, para, que van a llamar a bomberos!',
    'La oficina esta en llamas!',
    'No queda nada en pie!',
    'Has destruido la civilizacion!',
    'Ok, ahora si que la has liado',
    'Maria, esto es tu culpa',
    'EVACUAD EL EDIFICIO!!!'
];

function explode(card) {
    if (card.classList.contains('exploded')) {
        card.classList.remove('exploded');
        return;
    }

    card.classList.add('exploded');
    explosionCount++;

    document.getElementById('explosionCount').textContent = explosionCount;
    document.getElementById('explosionComment').textContent =
        explosionComments[Math.min(explosionCount, explosionComments.length - 1)];

    // Screen shake
    document.body.style.animation = 'none';
    document.body.offsetHeight;
    document.body.style.animation = 'screenShake 0.3s ease';

    // Spawn explosion particles
    const rect = card.getBoundingClientRect();
    const emojis = ['💥', '🔥', '💣', '🧨', '☠️', '😵'];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            animation: explodeParticle 1s ease-out forwards;
            --angle: ${(i / 8) * 360}deg;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add screen shake and particle animations
(function () {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes screenShake {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(-5px, -5px); }
            20% { transform: translate(5px, 5px); }
            30% { transform: translate(-5px, 5px); }
            40% { transform: translate(5px, -5px); }
            50% { transform: translate(-3px, -3px); }
            60% { transform: translate(3px, 3px); }
        }
        @keyframes explodeParticle {
            0% { transform: translate(0) scale(1); opacity: 1; }
            100% {
                transform: translate(
                    calc(cos(var(--angle)) * 150px),
                    calc(sin(var(--angle)) * 150px)
                ) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ===== EXCUSE GENERATOR =====
const excuseStarts = [
    'Es que mi gato',
    'Lo que pasa es que el wifi',
    'Mira, el caso es que Mercury esta retrogrado y',
    'Es que ayer vi un documental y',
    'Es que mi abuela dice que',
    'No es culpa mia, es que el algoritmo',
    'Yo lo hice bien pero luego',
    'Es que me distraje porque',
    'Es que Windows se actualizo y',
    'Lo que pasa es que el horoscopo decia que',
    'Es que estaba lloviendo y',
    'Es que el cafe de hoy no era descafeinado y',
    'Es que lei un tweet que decia que',
    'Es que Alexa me dijo que',
    'Es que el microondas hizo un ruido raro y'
];

const excuseMiddles = [
    'se sento encima del teclado y',
    'decidio que hoy no era el dia y',
    'empezo a hacer cosas raras y',
    'se volvio loco completamente y',
    'interpreto mal las instrucciones y',
    'entro en modo ahorro de energia y',
    'se actualizo sin permiso y',
    'tuvo un conflicto existencial y',
    'se puso en huelga y',
    'decidio tomar sus propias decisiones y'
];

const excuseEnds = [
    'por eso se borro todo.',
    'entonces exploto el servidor.',
    'y aqui estamos.',
    'total, que no fue culpa mia.',
    'por eso llego tarde.',
    'y se cayo la base de datos.',
    'asi que fue culpa del universo.',
    'y la presentacion se fue al traste.',
    'por eso no funciona nada.',
    'y lo demas es historia.',
    'y ya no se puede hacer nada.',
    'asi que tecnicamente es un exito.',
    'pero eh, no murio nadie!',
    'y por eso estoy en LinkedIn buscando trabajo.',
    'pero la pizza llego bien, asi que no todo fue malo.'
];

function generateExcuse() {
    const start = excuseStarts[Math.floor(Math.random() * excuseStarts.length)];
    const middle = excuseMiddles[Math.floor(Math.random() * excuseMiddles.length)];
    const end = excuseEnds[Math.floor(Math.random() * excuseEnds.length)];

    const display = document.getElementById('excuseDisplay');
    const text = document.getElementById('excuseText');

    display.classList.remove('new-excuse');
    display.offsetHeight;
    display.classList.add('new-excuse');

    text.textContent = `${start} ${middle} ${end}`;
}

// ===== KONAMI CODE EASTER EGG =====
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            activateKonamiMode();
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiMode() {
    document.body.style.animation = 'rainbow 2s infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Giant cat
    const bigCat = document.createElement('div');
    bigCat.textContent = '🐱';
    bigCat.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20rem;
        z-index: 99999;
        animation: bigCatAppear 3s ease forwards;
        pointer-events: none;
    `;
    document.body.appendChild(bigCat);

    const catStyle = document.createElement('style');
    catStyle.textContent = `
        @keyframes bigCatAppear {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.5) rotate(360deg); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(catStyle);

    setTimeout(() => {
        bigCat.remove();
        document.body.style.animation = '';
    }, 3000);
}

// ===== SMOOTH SCROLL OBSERVER =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});
