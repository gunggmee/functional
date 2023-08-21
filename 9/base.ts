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
  type Cart = Item[];

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

  // 장바구니 기본로직
  const removeByItem = (cart: Cart, name: string): Cart =>
    cart.filter((item) => item.name !== name);
  const calcTotal = (cart: Cart): number =>
    cart.reduce((total, item) => total + item.price, 0);
  const isInCart = (cart: Cart, name: string): boolean =>
    cart.some((item) => item.name === name);
  const addItem = (cart: Cart, item: Item): Cart => [...cart, item];
  const setPriceByName = (cart: Cart, name: string, price: number): Cart =>
    cart.map((item) => (item.name === name ? { ...item, price } : item));

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;
}
