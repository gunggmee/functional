// 타입
type Cart = CartItem[];

type Item = {
  name: string;
  price: number;
}

type DisplayItem = Item & {
  freeShipping: boolean
}

type CartItem = Item & {
  quantity: number;
};

type BuyButton = {
  item: Item;
  showFreeShippingIcon: () => void;
  hideFreeShippingIcon: () => void;
};

// 상수 및 데이터
const TAX_RATE = 0.1;
const FREE_SHIPPING_THRESHOLD = 20;

let items: Item[] = [];
let shoppingCart: Cart = [];

// 액션
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
  const displayItems = items.map(item => ({
    ...item,
    freeShipping: getsFreeShipping([...cart, {...item, quantity: 1}])
  }));

  updateCartTotalDom(total);
  updateItemsDom(displayItems);
  updateTaxDom(tax);
}

// 계산
function calcTotal(cart: Cart): number {
  return cart.reduce((total, item) => total + item.price, 0);
}

function getsFreeShipping(cart: Cart): boolean {
  return calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
}

function calcTax(amount: number): number {
  return amount * TAX_RATE;
}

// DOM 업데이트 액션
function updateItemsDom(displayItems: DisplayItem[]): void {}
function updateCartTotalDom(total: number): void {}
function updateTaxDom(tax: number): void {}
