namespace HS {
  // 연습문제1 - Cart를 Item[]이 아닌 Map으로 바꾸면 어떤 함수를 고쳐야 하나요? 직접 고쳐봅시다 p207
  // 연습문제2 - 시계 할인함수인 getsWatchDiscount를 구현해봅시다 213p
  // 연습문제3 - 장바구니에 제품을 담을 때 로그를 남기는 코드 작성해보기 216p

  // 타입
  type Item = {
    name: string;
    price: number;
  };
  type Cart = Item[];

  type CartMap = Map<string, number>;

  interface ItemWithQuantity extends Item {
    quantity: number;
  }
  type CartMap2 = Map<string, ItemWithQuantity>; 
  // key는 unique하게 하면 좋지 않을까? Itme도 id가 있으면 좋겠다. 
  // -> 책을 읽고 보니 이렇게 구현되면 읽기 힘든 코드가 되려나 싶었음. 그래도... id로 제품 id, 이름을 찾는 함수를 만들면 되지 않을까..?

  // 상수 및 데이터
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;

  // 장바구니 비지니스 로직
  const getFreeShipping = (cart: CartMap): boolean =>
    calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;

  const cartTax = (cart: CartMap): number => {
    const total = calcTotal(cart);
    const tax = calcTax(total);
    return tax;
  };

  // 장바구니 기본로직
  // const removeByItem = (cart: Cart, name: string): Cart =>
  //   cart.filter((item) => item.name !== name);
  const removeByItem = (cart: CartMap, name: string): CartMap => {
    const newCart = new Map(cart);
    cart.delete(name);
    return cart;
  };
  // const calcTotal = (cart: Cart): number =>
  //   cart.reduce((total, item) => total + item.price, 0);
  const calcTotal = (cart: CartMap): number => {
    let total = 0;
    for (const price of cart.values()) {
      total += price;
    }
    return total;
  };
  // const isInCart = (cart: Cart, name: string): boolean =>
  //   cart.some((item) => item.name === name);
  const isInCart = (cart: CartMap, name: string): boolean => cart.has(name);

  // const addItem = (cart: Cart, item: Item): Cart => [...cart, item];
  const addItem = (cart: CartMap, item: Item): CartMap => {
    cart.set(item.name, item.price);
    return cart;
  };

  // const setPriceByName = (cart: Cart, name: string, price: number): Cart =>
  //   cart.map((item) => (item.name === name ? { ...item, price } : item));
  const setPriceByName = (
    cart: CartMap,
    name: string,
    price: number
  ): CartMap => {
    const newCart = new Map(cart);
    const item = newCart.get(name);
    if (item) {
      newCart.set(name, price);
    }
    return newCart;
  };

  const getsWatchDiscount = (cart: CartMap): boolean => {
    if (calcTotal(cart) <= 100) {
      return false;
    }
    if (isInCart(cart, "watch")) {
      const originalWatchPrice = cart.get("watch");
      originalWatchPrice &&
        setPriceByName(
          cart,
          "watch",
          calcDiscountedPrice(originalWatchPrice, 10)
        );
    }
    return true;
  };

  const logAddToCart = (userId: string, item: Item) => {
    // time 
  };

  // 공통 비지니스 로직
  const calcDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ): number => {
    return (originalPrice * (100 - discountPercentage)) / 100;
  };
  const calcTax = (amount: number): number => amount * TAX_RATE;
}
