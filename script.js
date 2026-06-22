let cartCount = 0;
let cart = [];

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {

        let card = button.parentElement;

        let product = card.querySelector("h2").innerText;
        let price = card.querySelector("p").innerText;

        cart.push({
            product: product,
            price: price
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        cartCount++;
        document.getElementById("cart-count").innerText = cartCount;

        alert(product + " Added To Cart");
    });
});