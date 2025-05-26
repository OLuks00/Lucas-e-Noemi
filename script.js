document.addEventListener('DOMContentLoaded', () => {
    const cascataContainer = document.getElementById('cascata-container');
    const explosionContainer = document.getElementById('explosion-container');
    const fraseCascataTexto = "Eu te amo Noemi";
    const fraseExplosaoTexto = "Noemi e Lucas";
    const numeroFrasesExplosao = 15; // Quantidade de frases na explosão
    let cascataInterval;

    // Função para criar e animar uma frase em cascata
    function criarFraseCascata() {
        const frase = document.createElement('div');
        frase.classList.add('frase-cascata');
        frase.textContent = fraseCascataTexto;
        
        // Posição horizontal aleatória
        frase.style.left = `${Math.random() * 90}vw`; // 0 a 90% da largura da viewport

        // Tempo de atraso aleatório para que não caiam todas juntas
        frase.style.animationDelay = `${Math.random() * 5}s`; 

        cascataContainer.appendChild(frase);

        // Remover a frase depois que a animação terminar para não sobrecarregar o DOM
        frase.addEventListener('animationend', () => {
            frase.remove();
        });
    }

    // Inicia a queda de frases em cascata repetidamente
    function iniciarCascata() {
        // Limpa qualquer intervalo anterior para evitar duplicação
        if (cascataInterval) {
            clearInterval(cascataInterval);
        }
        // Cria uma frase a cada 0.5 segundos
        cascataInterval = setInterval(criarFraseCascata, 500); 
    }

    // Função para criar e animar frases de explosão
    function criarExplosao(x, y) {
        for (let i = 0; i < numeroFrasesExplosao; i++) {
            const frase = document.createElement('div');
            frase.classList.add('frase-explosao');
            frase.textContent = fraseExplosaoTexto;
            
            frase.style.left = `${x}px`;
            frase.style.top = `${y}px`;

            // Calcular um ângulo aleatório para a explosão
            const angle = Math.random() * Math.PI * 2; // 0 a 2*PI (360 graus)
            const distance = Math.random() * 150 + 50; // Distância de 50 a 200px da origem

            // Calcular offsets X e Y para a direção da explosão
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            // Definir variáveis CSS customizadas para a animação
            frase.style.setProperty('--x-offset', `${offsetX}px`);
            frase.style.setProperty('--y-offset', `${offsetY}px`);
            
            // Pequeno atraso para a explosão parecer mais "espalhada"
            frase.style.animationDelay = `${i * 0.02}s`; 

            explosionContainer.appendChild(frase);

            // Remover a frase depois que a animação terminar
            frase.addEventListener('animationend', () => {
                frase.remove();
            });
        }
    }

    // Evento de clique/toque na tela
    document.body.addEventListener('click', (event) => {
        criarExplosao(event.clientX, event.clientY);
        // Reinicia a cascata a cada clique para garantir que continue caindo
        iniciarCascata(); 
    });

    // Para dispositivos móveis: use 'touchstart'
    document.body.addEventListener('touchstart', (event) => {
        // event.touches[0] contém as coordenadas do primeiro toque
        criarExplosao(event.touches[0].clientX, event.touches[0].clientY);
        iniciarCascata();
    });

    // Inicia a cascata assim que a página carrega
    iniciarCascata();
});
