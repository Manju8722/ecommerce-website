export default () => {
  const products = useState("products", () => {
    return { products_collection: null };
  });

  return { products };
};
