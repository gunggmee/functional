type Cart = Item[];

type Item = {
  name: string;
  price: number;
  quantity: number;
};

type BuyButton = {
  item: Item;
  showFreeShippingIcon: () => void;
  hideFreeShippingIcon: () => void;
};

/**
 * 상수
 */
const TAX_RATE = 0.1;
const FREE_SHIPPING_THRESHOLD = 20;

let shoppingCart: Cart = [];

export function addItemToCart(name: string, price: number): void {
  const item = makeCartItem(name, price, 1);
  shoppingCart = addItem(shoppingCart, item);
  const total = calcTotal(shoppingCart);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
}

export function deleteHandler(name: string) {
  shoppingCart = removeItemByName(shoppingCart, name);
  var total = calcTotal(shoppingCart);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
}

export function setPriceByName(cart: Cart, name: string, price: number): Cart {
  return cart.map(item => item.name === name ? {...item, price} : item);
}

export function setQuantityByName(cart: Cart, name: string, quantity: number): Cart {
  return cart.map(item => item.name === name ? {...item, quantity} : item);
}

function addItem(cart: Cart, item: Item): Cart {
  return [...cart, item];
}

function makeCartItem(name: string, price: number, quantity: number): Item {
  return { name, price, quantity };
}

function calcTotal(cart: Cart): number {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}

function getsFreeShipping(cart: Cart): boolean {
  return calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
}

function calcTax(amount: number): number {
  return amount * TAX_RATE;
}

function getBuyButtonsDom(): BuyButton[] {
  return [];
}

function removeItemByName(cart: Cart, name: string): Cart {
  return cart.filter(item => item.name !== name)
}

/**
 * DOM 업데이트 액션
 */
function updateShippingIcons(cart: Item[]): void {
  getBuyButtonsDom().forEach((button) => {
    const hasFreeShipping = getsFreeShipping(addItem(cart, button.item));
    setFreeShippingIcon(button, hasFreeShipping);
  });
}
function updateTaxDom(total: number): void {
  setTaxDom(calcTax(total));
}
function setCartTotalDom(total: number): void {}
function setTaxDom(tax: number): void {}
function setFreeShippingIcon(button: BuyButton, isShown: boolean): void {
  isShown ? button.showFreeShippingIcon() : button.hideFreeShippingIcon();
}
