



const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product p-4 ">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h5 class="text-break">${product.title}</h5>
      <p>Category: ${product.category}</p>
      <p>Rating:   ${product.rating.rate}</p>
      <p>Rating Count:  ${product.rating.count}</p>
      <p class="fs-3 fw-bold">Price: $ ${product.price}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
      <button id="details-btn" data-bs-toggle="modal" data-bs-target="#descModal" class="btn btn-dark">Details</button>
      </div>


      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count += 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const totalPrice = convertedOldPrice + convertPrice;
  const FixedTotalPrice = totalPrice.toFixed(2);
  document.getElementById(id).innerText = FixedTotalPrice;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue('price');
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  const FixedGrandTotal = grandTotal.toFixed(2);
  document.getElementById("total").innerText = FixedGrandTotal;
};
