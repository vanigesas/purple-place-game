document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const orderDisplay = document.getElementById('order-display');
    const cakePreview = document.getElementById('cake-preview');
    const cakeOptions = document.getElementById('cake-options');
    const submitOrderBtn = document.getElementById('submit-order-btn');
    const scoreDisplay = document.getElementById('score');

    // Definiciones de los componentes del pastel con sus propiedades SVG
    const cakeBases = [
        { id: 'chocolate-base', name: 'Base de Chocolate', color: '#8B4513' },
        { id: 'vanilla-base', name: 'Base de Vainilla', color: '#F5DEB3' }
    ];
    const frostings = [
        { id: 'pink-frosting', name: 'Glaseado Rosa', color: '#FFC0CB' },
        { id: 'green-frosting', name: 'Glaseado Verde', color: '#90EE90' }
    ];
    const decorations = [
        { id: 'sprinkles', name: 'Chispas', generator: () => {
            let sprinkles = '';
            for (let i = 0; i < 15; i++) {
                sprinkles += `<rect x="${Math.random() * 160 + 20}" y="${Math.random() * 40 + 60}" width="10" height="3" rx="2" fill="white" transform="rotate(${Math.random() * 90} ${Math.random() * 160 + 20},${Math.random() * 40 + 60})"/>`;
            }
            return sprinkles;
        }},
        { id: 'stars', name: 'Estrellas', generator: () => {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                const x = Math.random() * 150 + 25;
                const y = Math.random() * 30 + 65;
                stars += `<polygon points="${x},${y} ${x+4},${y+8} ${x+12},${y+8} ${x+6},${y+13} ${x+8},${y+21} ${x},${y+17} ${x-8},${y+21} ${x-6},${y+13} ${x-12},${y+8} ${x-4},${y+8}" fill="yellow"/>`;
            }
            return stars;
        }}
    ];

    // Estado del juego
    let currentOrder = {};
    let playerCake = {};
    let score = 0;

    // Función para crear el SVG de un pastel
    function createCakeSVG(cake) {
        if (!cake.base || !cake.frosting || !cake.decoration) {
            return ''; // Devuelve vacío si el pastel no está completo
        }

        const baseSvg = `<rect x="10" y="100" width="180" height="80" rx="10" fill="${cake.base.color}" />`;
        const frostingSvg = `<path d="M10 100 C 30 120, 170 120, 190 100 L 190 80 C 170 60, 30 60, 10 80 Z" fill="${cake.frosting.color}" />`;
        const decorationSvg = cake.decoration.generator();

        return `<svg viewBox="0 0 200 200" class="cake-layer">${baseSvg}${frostingSvg}${decorationSvg}</svg>`;
    }

    // Genera un nuevo pedido aleatorio
    function generateNewOrder() {
        currentOrder = {
            base: cakeBases[Math.floor(Math.random() * cakeBases.length)],
            frosting: frostings[Math.floor(Math.random() * frostings.length)],
            decoration: decorations[Math.floor(Math.random() * decorations.length)]
        };
        displayOrder();
    }

    // Muestra el pedido en la interfaz
    function displayOrder() {
        orderDisplay.innerHTML = createCakeSVG(currentOrder);
    }

    // Muestra las opciones para construir el pastel
    function displayCakeOptions() {
        cakeOptions.innerHTML = '<h3>Elige una Base:</h3>';
        cakeBases.forEach(base => {
            cakeOptions.innerHTML += `<button class="option-btn" data-type="base" data-id="${base.id}">${base.name}</button>`;
        });

        cakeOptions.innerHTML += '<h3>Elige un Glaseado:</h3>';
        frostings.forEach(frosting => {
            cakeOptions.innerHTML += `<button class="option-btn" data-type="frosting" data-id="${frosting.id}">${frosting.name}</button>`;
        });

        cakeOptions.innerHTML += '<h3>Elige una Decoración:</h3>';
        decorations.forEach(deco => {
            cakeOptions.innerHTML += `<button class="option-btn" data-type="decoration" data-id="${deco.id}">${deco.name}</button>`;
        });

        addOptionListeners();
    }

    // Añade event listeners a los botones de opción
    function addOptionListeners() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                const id = e.target.dataset.id;

                let selectedOption;
                if (type === 'base') selectedOption = cakeBases.find(b => b.id === id);
                if (type === 'frosting') selectedOption = frostings.find(f => f.id === id);
                if (type === 'decoration') selectedOption = decorations.find(d => d.id === id);

                playerCake[type] = selectedOption;
                updateCakePreview();
            });
        });
    }

    // Actualiza la vista previa del pastel
    function updateCakePreview() {
        if (playerCake.base && playerCake.frosting && playerCake.decoration) {
            cakePreview.innerHTML = createCakeSVG(playerCake);
        } else {
            cakePreview.innerHTML = '<p>Construye tu pastel aquí</p>';
        }
    }

    // Comprueba si el pastel del jugador coincide con el pedido
    submitOrderBtn.addEventListener('click', () => {
        if (playerCake.base && playerCake.frosting && playerCake.decoration) {
            if (playerCake.base.id === currentOrder.base.id &&
                playerCake.frosting.id === currentOrder.frosting.id &&
                playerCake.decoration.id === currentOrder.decoration.id) {
                score++;
                alert('¡Pedido correcto!');
            } else {
                score = Math.max(0, score - 1);
                alert('¡Este no es el pastel que pedí!');
            }
            scoreDisplay.textContent = score;
            playerCake = {};
            updateCakePreview();
            generateNewOrder();
        } else {
            alert('¡Completa el pastel antes de entregarlo!');
        }
    });

    // Iniciar el juego
    function init() {
        generateNewOrder();
        displayCakeOptions();
        updateCakePreview();
    }

    init();
});
