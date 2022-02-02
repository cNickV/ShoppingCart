const cart = document.querySelector("#cart");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();

/* EVENTS */
document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-outline-primary")) {
    addCart(e);
  }
  if (e.target.matches(".list-group-item .btn-success")) {
    btnAdd(e);
  }

  if (e.target.matches(".list-group-item .btn-danger")) {
    btnDecrease(e);
  }
});

/*  */
let cartObject = [];

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
  }

  createCart();
};

const createCart = () => {
  cart.textContent = " ";

  cartObject.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".text-white .lead").textContent = item.nameProduct;
    clone.querySelector(".badge").textContent = item.amount;
    clone.querySelector("div .lead span").textContent = item.cost * item.amount;
    clone.querySelector(".btn-danger").dataset.id = item.id;
    clone.querySelector(".btn-success").dataset.id = item.id;

    fragment.appendChild(clone);
  });

  cart.appendChild(fragment);

  createFooter();
};

const createFooter = () => {
  footer.textContent = "";

  const total = cartObject.reduce(
    (acc, curr) => acc + curr.amount * curr.cost,
    0
  );

  const clone = templateFooter.content.cloneNode(true);
  clone.querySelector("span").textContent = total;

  return footer.appendChild(clone);
};

const btnAdd = (e) => {
  cartObject = cartObject.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.amount++;
    }
    return item;
  });

  createCart();
};

const btnDecrease = (e) => {
  cartObject = cartObject.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.amount > 0) {
        item.amount--;
        if (item.amount === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });
  createCart();
};

btns.forEach((btn) => {
  btn.addEventListener("click", addCart);
});
