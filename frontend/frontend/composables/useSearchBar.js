export default () => {
  const searchBarEnable = useState("searchBar", () => {
    return { isEnable: false };
  });

  return { searchBarEnable };
};
