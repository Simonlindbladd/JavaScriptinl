const produkter = {
    frukter: [["Banan", 10], ["Äpple", 12], ["Apelsin", 8]],
    grönsaker: [["Sallad", 5], ["Morot", 6], ["Broccoli", 8]],
    frys: [["Frysta ärtor", 15], ["Fryst lax", 30], ["Frysta hallon", 20]],
    torrvaror: [["Ris", 10], ["Pasta", 8], ["Bönor", 12]],
    hushåll: [["Diskmedel", 25], ["Toalettpapper", 40], ["Tvättmedel", 30]],
    bröd: [["Baguette", 15], ["Knäckebröd", 10], ["Bröd", 12]]
};

let varukorg = [];


let valdaAvdelningar = [];


function createSectionButtons() {
    const sections = Object.keys(produkter).filter(section => !valdaAvdelningar.includes(section));
    const buttonsContainer = document.getElementById("buttonsContainer");
    buttonsContainer.innerHTML = ""; 

 
    if (sections.length > 0) {
        const randomSections = sections.sort(() => 0.5 - Math.random()).slice(0, 2);
        randomSections.forEach(section => {
            const button = document.createElement("button");
            button.textContent = section.charAt(0).toUpperCase() + section.slice(1); 
            button.onclick = () => showProducts(section);
            buttonsContainer.appendChild(button);
        });
    }
}

// Funktion för att visa produkter
function showProducts(sectionName) {
    valdaAvdelningar.push(sectionName); 
    createSectionButtons(); 

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
    document.getElementById("backButton").style.display = "block"; 
}

// Lägga till produkter i varukorgen
function addToCart(product) {
    varukorg.push(product); 
    updateCart();
}

// Uppdatera varukorgen
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; 

    let totalPrice = 0; 

    varukorg.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item[0]} - ${item[1]} kr`;
        cartItems.appendChild(li);
        totalPrice += item[1]; 
    });

    // Visa totalpriset
    const totalLi = document.createElement("li");
    totalLi.textContent = `Totalt: ${totalPrice} kr`;
    cartItems.appendChild(totalLi);

    document.getElementById("payButton").style.display = "block"; 
}

// Betala och tack-meddelandet
function pay() {
    document.getElementById("thankYouMessage").style.display = "block"; 
    document.getElementById("cart").style.display = "none"; 
    document.getElementById("products").innerHTML = ""; 
    document.getElementById("section").style.display = "none"; 
}

// Gå tillbaka till avdelningar
function goBack() {
    if (varukorg.length > 0) {
        // Om användaren har lagt till produkter, visa två nya avdelningar
        createSectionButtons();
        document.getElementById("backButton").style.display = "none"; 
        document.getElementById("products").innerHTML = ""; 
        document.getElementById("section").style.display = "block";
    } else {
        // Om ingen produkt har lagts till, gå tillbaka till avdelningar
        createSectionButtons();
        document.getElementById("backButton").style.display = "none"; 
        document.getElementById("section").style.display = "block";
    }
}

// Initiera sektioner när sidan laddas
createSectionButtons();
