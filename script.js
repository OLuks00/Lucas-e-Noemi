// Banco de dados de carros e preços da Tabela FIPE
const carDatabase = [
    { name: "Ford Mustang", fipe: 240000, sell: 200000, buy: 230000, image: "mustang.png" },
    { name: "Chevrolet Camaro", fipe: 310000, sell: 270000, buy: 290000, image: "camaro.png" },
    { name: "Porsche 911", fipe: 970000, sell: 900000, buy: 950000, image: "porsche.png" },
    { name: "Ferrari 488", fipe: 1800000, sell: 1600000, buy: 1750000, image: "ferrari.png" },
    { name: "Lamborghini Huracán", fipe: 2200000, sell: 2000000, buy: 2150000, image: "lamborghini.png" },
    { name: "Audi R8", fipe: 850000, sell: 800000, buy: 820000, image: "audi.png" },
    { name: "BMW M4", fipe: 500000, sell: 465000, buy: 480000, image: "bmw.png" },
    { name: "Mercedes AMG GT", fipe: 820000, sell: 750000, buy: 790000, image: "mercedes.png" },
    { name: "McLaren 720S", fipe: 2500000, sell: 2300000, buy: 2450000, image: "mclaren.png" },
    { name: "Nissan GT-R", fipe: 700000, sell: 650000, buy: 680000, image: "nissan.png" }
];

// Renderizar os carros no grid
const carGrid = document.getElementById("carGrid");
carDatabase.forEach((car, index) => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.innerHTML = `
        <img src="${car.image}" alt="${car.name}">
        <h3>${car.name}</h3>
        <p><strong>Venda:</strong> R$ ${car.sell.toLocaleString()}</p>
        <p><strong>Compra:</strong> R$ ${car.buy.toLocaleString()}</p>
        <button onclick="selectCar(${index})">Selecionar</button>
    `;
    carGrid.appendChild(carCard);
});

// Selecionar carro para simulação
function selectCar(index) {
    const car = carDatabase[index];
    document.getElementById("carName").value = car.name;
    document.getElementById("fipePrice").value = car.fipe;
}

// Simulação de preço
document.getElementById("fipeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const carName = document.getElementById("carName").value;
    const price = parseFloat(document.getElementById("price").value);
    const fipePrice = parseFloat(document.getElementById("fipePrice").value);

    const resultDiv = document.getElementById("simulationResult");
    if (price > fipePrice) {
        resultDiv.style.color = "red";
        resultDiv.textContent = `${carName}: O preço está acima da Tabela FIPE em R$ ${(price - fipePrice).toFixed(2)}.`;
    } else if (price < fipePrice) {
        resultDiv.style.color = "green";
        resultDiv.textContent = `${carName}: O preço está abaixo da Tabela FIPE em R$ ${(fipePrice - price).toFixed(2)}.`;
    } else {
        resultDiv.style.color = "blue";
        resultDiv.textContent = `${carName}: O preço está igual à Tabela FIPE.`;
    }
});
