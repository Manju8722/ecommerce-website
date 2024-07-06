export default () => {
  const auth = useState("auth", () => {
    return { accessToken: "", user: null };
  });

  return { auth };
};
