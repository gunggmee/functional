namespace Base {
  // 타입
  type Item = {
    readonly name: string;
    readonly price: number;
  };

  type Cart = Readonly<Record<string, Item>>;

  // 상수 및 데이터
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;
  const WATCH_DISCOUNT_THRESHOLD = 100;

  // 장바구니 비지니스 로직
  const getsFreeShipping = (cart: Cart): boolean =>
    calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
  const getsWatchDiscount = (cart: Cart): boolean =>
    isInCart(cart, "watch") && calcTotal(cart) > WATCH_DISCOUNT_THRESHOLD;
  const calcCartTax = (cart: Cart): number => calcTax(calcTotal(cart));

  // 장바구니 기본로직
  const addItem = (cart: Cart, name: string, price: number): Cart => ({
    ...cart,
    [name]: { name, price },
  });
  const removeItem = (cart: Cart, name: string): Cart => {
    const { [name]: _, ...result } = cart;
    return result;
  };
  const setPrice = (cart: Cart, name: string, price: number): Cart => ({
    ...cart,
    [name]: { name, price },
  });
  const isInCart = (cart: Cart, name: string): boolean =>
    cart[name] !== undefined;
  const calcTotal = (cart: Cart): number =>
    Object.entries(cart).reduce((total, [_, { price }]) => total + price, 0);

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;
}
