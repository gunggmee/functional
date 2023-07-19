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

export function setPrice(item: Item, newPrice: number): Item {
  return objectSet(item, "price", newPrice);
}

export function setPriceByName(
  cart: Cart,
  name: string,
  price: number
): Cart {
  var cartCopy = cart.slice();
  for (var i = 0; i < cartCopy.length; i++) {
    if (cartCopy[i].name === name) {
      cartCopy[i] = setPrice(cartCopy[i], price);
    }
  }
  return cartCopy;
}

export function setQuantityByName(
  cart: Cart,
  name: string,
  quantity: number
): Cart {
  var cartCopy = cart.slice();
  for (var i = 0; i < cartCopy.length; i++) {
    if (cartCopy[i].name === name) {
      cartCopy[i] = setQuantity(cartCopy[i], quantity);
    }
  }
  return cartCopy;
}

export function setQuantity(item: Item, newQuantity: number): Item {
  return objectSet(item, "quantity", newQuantity);
}

function addItem(cart: Cart, item: Item): Cart {
  return addElementLast(cart, item);
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
  var idx: number | null = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      idx = i;
    }
  }
  if (idx !== null) return removeItems(cart, idx, 1);
  return cart;
}

/**
 * util 함수
 */
function addElementLast<T>(array: T[], element: T): T[] {
  var newArray = array.slice();
  newArray.push(element);
  return newArray;
}

function removeItems<T>(array: T[], idx: number, count: number): T[] {
  var copy = array.slice();
  copy.splice(idx, count);
  return copy;
}

// 타입 붙이는 재미가 쏠쏠...
function objectSet<
  T extends Record<K, unknown>,
  K extends keyof T,
  V extends T[K]
>(object: T, key: K, value: V): T {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}

// 타입 붙이는 재미가 쏠쏠...
function objectDelete<T extends Record<K, unknown>, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  const copy = Object.assign({}, object);
  delete copy[key];
  return copy;
}
// const x = { a: 1, b: 2 };
// const y = objectDelete(x, 'a');

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
