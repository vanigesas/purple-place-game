document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const orderDisplay = document.getElementById('order-display');
    const cakePreview = document.getElementById('cake-preview');
    const cakeOptions = document.getElementById('cake-options');
    const submitOrderBtn = document.getElementById('submit-order-btn');
    const scoreDisplay = document.getElementById('score');

    // Opciones para los pasteles
    const cakeBases = [{ id: 'chocolate-base', name: 'Base de Chocolate' }, { id: 'vanilla-base', name: 'Base de Vainilla' }];
    const frostings = [{ id: 'pink-frosting', name: 'Glaseado Rosa' }, { id: 'green-frosting', name: 'Glaseado Verde' }];
    const decorations = [{ id: 'sprinkles', name: 'Chispas' }, { id: 'stars', name: 'Estrellas' }];

    // Estado del juego
    let currentOrder = {};
    let playerCake = {};
    let score = 0;

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
        orderDisplay.innerHTML = `
            <p><strong>Base:</strong> ${currentOrder.base.name}</p>
            <p><strong>Glaseado:</strong> ${currentOrder.frosting.name}</p>
            <p><strong>Decoración:</strong> ${currentOrder.decoration.name}</p>
        `;
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
                playerCake[type] = { id: id, name: e.target.textContent };
                updateCakePreview();
            });
        });
    }

    // Actualiza la vista previa del pastel
    function updateCakePreview() {
        cakePreview.innerHTML = `
            <p><strong>Base:</strong> ${playerCake.base ? playerCake.base.name : 'Ninguna'}</p>
            <p><strong>Glaseado:</strong> ${playerCake.frosting ? playerCake.frosting.name : 'Ninguno'}</p>
            <p><strong>Decoración:</strong> ${playerCake.decoration ? playerCake.decoration.name : 'Ninguna'}</p>
        `;
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
