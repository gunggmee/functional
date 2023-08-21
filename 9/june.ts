namespace June {
  // 연습문제1 - Cart를 Item[]이 아닌 Map으로 바꾸면 어떤 함수를 고쳐야 하나요? 직접 고쳐봅시다 p207 (완료)
  // 연습문제2 - 시계 할인함수인 getsWatchDiscount를 구현해봅시다 213p
  // 연습문제3 - 장바구니에 제품을 담을 때 로그를 남기는 코드 작성해보기 216p

  // 책을 보기 전에 연습문제를 먼저 풀어본 후 책과 비교해보면 좋을 것 같아요.

  // 타입
  type Item = {
    id: number;
    name: string;
    price: number;
  };
  type CartItem = Item & { quantity: number };
  type Cart = Map<number, CartItem>;

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
  const removeItem = (cart: Cart, id: number): Cart => {
    const copiedCart = structuredClone(cart); // DeepCopy는 외부의 믿을 수 없는 소스일 때 사용하는건데 여기서 굳이! (by ak)
    if (!copiedCart[id]) throw new Error("no item");
    if (copiedCart[id]) {
      if (copiedCart[id].quantity === 1) {
        copiedCart.delete(id);
      } else {
        copiedCart[id].quantity -= 1; // <--
      }
    }
    sendEventLog("cart-remove", { id });

    return copiedCart;
  };

  const calcTotal = (cart: Cart): number => {
    let total = 0;
    for (const [key, item] of cart) {
      total += item.price * item.quantity;
    }
    return total;
  };

  const isInCart = (cart: Cart, id: number): boolean => cart[id] !== undefined; // !!cart[id] 로 안한것은 id가 0인 경우 때문에

  const addItem = (cart: Cart, item: Item): Cart => {
    const copiedCart = structuredClone(cart);
    if (copiedCart[item.id]) {
      copiedCart[item.id].quantity += 1;
    } else {
      copiedCart[item.id] = { ...item, quantity: 1 };
    }
    sendEventLog("cart-add", { id: item.id });
    return copiedCart;
  };

  const setPrice = (cart: Cart, id: number, price: number): Cart => {
    // return {...cart, [id]: {id, name: cart[id].name, price}}
    // return {...cart, [id]: {...cart[id], price}}

    const copiedCart = structuredClone(cart);
    if (!copiedCart[id]) throw new Error("no item");
    
    copiedCart[id].price = price;

    return copiedCart;
  };

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;

  // 2번 - 30% 할인 가정했을 때
  const WATCH_DISCOUNT_RATE = 0.3;
  const WATCH_ID = 1;
  const getsWatchDiscount = (cart: Cart): Cart => {
    return setPrice(
      cart,
      WATCH_ID,
      cart[WATCH_ID].price * (1 - WATCH_DISCOUNT_RATE)
    );
  };

  // 3번
  const sendEventLog = (
    eventName: string,
    property: { [key: string]: string | number }
  ) => {};
}
