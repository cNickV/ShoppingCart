const cart = document.querySelector("#cart");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {
  console.log(e.target.matches(".card .btn-outline-primary"));
  if (e.target.matches(".card .btn-outline-primary")) {
    addCart(e);
  }
});

const cartObject = [];

const addCart = (e) => {
  const product = {
    nameProduct: e.target.dataset.fruit,
    id: e.target.dataset.fruit,
    amount: 1,
    cost: parseInt(e.target.dataset.cost),
  };

  const index = cartObject.findIndex((item) => item.id === product.id);

  if (index === -1) {
    cartObject.push(product);
  } else {
    cartObject[index].amount++;
    cartObject[index].cost = cartObject[index].amount * product.cost;
  }

  createCart();
};

const createCart = () => {
  cart.textContent = " ";

  cartObject.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".text-white .lead").textContent = item.nameProduct;
    clone.querySelector(".badge").textContent = item.amount;
    clone.querySelector("div .lead span").textContent = item.cost;

    fragment.appendChild(clone);
  });

  cart.appendChild(fragment);
};

btns.forEach((btn) => {
  btn.addEventListener("click", addCart);
});
