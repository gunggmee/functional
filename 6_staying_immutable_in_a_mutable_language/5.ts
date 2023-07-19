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
  shoppingCart = [...shoppingCart, { name, price, quantity: 1 }];
  handleCartChange(shoppingCart);
}

export function removeItemFromCart(name: string) {
  shoppingCart = shoppingCart.filter(item => item.name !== name)
  handleCartChange(shoppingCart);
}

function handleCartChange(cart: Cart) {
  const total = calcTotal(cart);
  const tax = calcTax(total);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(tax);
}

export function setPriceByName(cart: Cart, name: string, price: number): Cart {
  return cart.map(item => item.name === name ? {...item, price} : item);
}

export function setQuantityByName(cart: Cart, name: string, quantity: number): Cart {
  return cart.map(item => item.name === name ? {...item, quantity} : item);
}

function calcTotal(cart: Cart): number {
  return cart.reduce((total, item) => total + item.price, 0);
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

/**
 * DOM 업데이트 액션
 */
function updateShippingIcons(cart: Item[]): void {
  getBuyButtonsDom().forEach((button) => {
    const hasFreeShipping = getsFreeShipping([...cart, button.item]);
    setFreeShippingIcon(button, hasFreeShipping);
  });
}
function updateTaxDom(tax: number): void {
  setTaxDom(tax);
}
function setCartTotalDom(total: number): void {}
function setTaxDom(tax: number): void {}
function setFreeShippingIcon(button: BuyButton, isShown: boolean): void {
  isShown ? button.showFreeShippingIcon() : button.hideFreeShippingIcon();
}
