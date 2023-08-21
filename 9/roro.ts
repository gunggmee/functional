namespace Base {
  // 연습문제1 - Cart를 Item[]이 아닌 Map으로 바꾸면 어떤 함수를 고쳐야 하나요? 직접 고쳐봅시다 p207
  // 연습문제2 - 시계 할인함수인 getsWatchDiscount를 구현해봅시다 213p
  // 연습문제3 - 장바구니에 제품을 담을 때 로그를 남기는 코드 작성해보기 216p

  // 책을 보기 전에 연습문제를 먼저 풀어본 후 책과 비교해보면 좋을 것 같아요.

  // 타입
  type Item = {
    name: string;
    price: number;
  };
  // type Cart = Item[];

  type Cart = Map<string, Item>;

  // 상수 및 데이터
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;

  // 장바구니 비지니스 로직
  const getFreeShipping = (cart: Cart): boolean =>
    calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
  const cartTax = (cart: Cart): number => {
    const total = calcTotal(cart);
    const tax = calcTax(total);
    return tax;
  };

  const getsWatchDiscount = (cart: Cart): boolean => {
    const total = calcTotal(cart);
    const isWatchInCart = isInCart(cart, "watch");
    return isWatchInCart && total >= 100;
  };

  // 장바구니 기본로직
  const removeByItem = (cart: Cart, name: string): Cart => {
    const newCart = structuredClone(cart);
    delete newCart[name];
    return newCart;
  };
  const calcTotal = (cart: Cart): number =>
    Object.values(cart).reduce(
      (total: number, item: Item) => total + item.price,
      0
    );
  const isInCart = (cart: Cart, name: string): boolean =>
    Object[name] !== undefined;
  const addItem = (cart: Cart, item: Item): Cart => {
    const newCart = structuredClone(cart);
    const newItem = structuredClone(item);
    newCart[item.name] = newItem;
    // log(`add ${item.name} with price ${item.price}`);
    return newCart;
  };


  const setPriceByName = (cart: Cart, name: string, price: number): Cart => {
    const newCart = structuredClone(cart);
    newCart[name].price = price;
    newCart[name].name = name;
    return newCart;
  };

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;

  // 로깅 유틸리티
  const log = (message: string): void => {
    console.log({
      message,
      timestamp: new Date(),
    });
  };
}
