export default () => {
  const cartProducts = useState("cart", () => {
    return { cart: null };
  });

  return { cartProducts };
};
