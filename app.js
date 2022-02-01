const cart = document.querySelector("#cart");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll(".card .btn");

const cartObject = [];

const addCart = (e) => {
  const product = {
    nameProduct: e.target.dataset.fruit,
    id: e.target.dataset.fruit,
    amount: 1,
  };

  const index = cartObject.findIndex((item) => item.id === product.id);

  console.log(index);

  if (index === -1) {
    cartObject.push(product);
  } else {
    cartObject[index].amount++;
  }

  createCart(cartObject);
  console.log(cartObject);
};

const createCart = (array) => {
  cart.textContent = " ";

  array.forEach((item) => {
    const clone = template.content.firstElementChild.cloneNode(true);
    clone.querySelector(".lead").textContent = item.nameProduct;
    clone.querySelector(".badge").textContent = item.amount;

    fragment.appendChild(clone);
  });

  cart.appendChild(fragment);
};

btns.forEach((btn) => {
  btn.addEventListener("click", addCart);
});
