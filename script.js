// Representera produkter i olika sektioner
const produkter = {
    frukter: [["Banan", 10], ["Äpple", 12], ["Apelsin", 8]],
    grönsaker: [["Sallad", 5], ["Morot", 3], ["Broccoli", 7]],
    frys: [["Frysta ärtor", 15], ["Fryst lax", 30], ["Frysta hallon", 20]],
    torrvaror: [["Ris", 10], ["Pasta", 8], ["Bönor", 12]],
    hushåll: [["Diskmedel", 25], ["Toalettpapper", 40], ["Tvättmedel", 30]],
    bröd: [["Baguette", 15], ["Knäckebröd", 10], ["Formbröd", 12]]
};

// Array för att spara varukorgens innehåll
let varukorg = [];

// Array för att hålla reda på valda avdelningar
let valdaAvdelningar = [];

// Skapa knappar för sektionerna
function createSectionButtons() {
    const sections = Object.keys(produkter).filter(section => !valdaAvdelningar.includes(section));
    const buttonsContainer = document.getElementById("buttonsContainer");
    buttonsContainer.innerHTML = ""; // Rensa knapparna innan vi lägger till nya

    // Slumpar två avdelningar
    if (sections.length > 0) {
        const randomSections = sections.sort(() => 0.5 - Math.random()).slice(0, 2);
        randomSections.forEach(section => {
            const button = document.createElement("button");
            button.textContent = section.charAt(0).toUpperCase() + section.slice(1); // Första bokstaven stor
            button.onclick = () => showProducts(section);
            buttonsContainer.appendChild(button);
        });
    }
}

// Funktion för att visa produkter
function showProducts(sectionName) {
    valdaAvdelningar.push(sectionName); // Lägg till den valda avdelningen
    createSectionButtons(); // Skapa knappar för nya avdelningar

    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = `<h2>${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</h2>`;
    
    produkter[sectionName].forEach(product => {
        const productButton = document.createElement("button");
        productButton.textContent = `${product[0]} - ${product[1]} kr`;
        productButton.className = "product-button";
        productButton.onclick = () => addToCart(product);
        productsDiv.appendChild(productButton);
    });

    // Dölj sektionerna
    document.getElementById("section").style.display = "none"; 
    document.getElementById("backButton").style.display = "block"; // Visa tillbaka-knappen
}

// Funktion för att lägga till produkter i varukorgen
function addToCart(product) {
    varukorg.push(product); // Lägg till produktnamnet
    updateCart();
}

// Uppdatera varukorgen
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Rensa varukorgen innan vi uppdaterar

    let totalPrice = 0; // Variabel för totalpris

    varukorg.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item[0]} - ${item[1]} kr`; // Visa produktnamnet och priset
        cartItems.appendChild(li);
        totalPrice += item[1]; // Lägg till priset för totalen
    });

    // Visa totalpriset
    const totalLi = document.createElement("li");
    totalLi.textContent = `Totalt: ${totalPrice} kr`;
    cartItems.appendChild(totalLi);

    document.getElementById("payButton").style.display = "block"; // Visa betalknappen
}

// Betala och visa tack-meddelandet
function pay() {
    document.getElementById("thankYouMessage").style.display = "block"; // Visa tack-meddelandet
    document.getElementById("cart").style.display = "none"; // Dölj varukorgen
    document.getElementById("products").innerHTML = ""; // Rensa produktvisningen
    document.getElementById("section").style.display = "none"; // Dölj avdelningarna
}

// Gå tillbaka till avdelningar
function goBack() {
    if (varukorg.length > 0) {
        // Om användaren har lagt till produkter, visa två nya avdelningar
        createSectionButtons();
        document.getElementById("backButton").style.display = "none"; // Dölj tillbaka-knappen
        document.getElementById("products").innerHTML = ""; // Rensa produktvisningen
        document.getElementById("section").style.display = "block"; // Visa avdelningarna
    } else {
        // Annars, om ingen produkt har lagts till, gå tillbaka till avdelningar
        createSectionButtons();
        document.getElementById("backButton").style.display = "none"; // Dölj tillbaka-knappen
        document.getElementById("section").style.display = "block"; // Visa avdelningarna
    }
}

// Initiera sektioner när sidan laddas
createSectionButtons();
