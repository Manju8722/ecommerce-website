export default function () {
  const { auth } = useAuth();
  const setAccessToken = (token) => {
    auth.value.accessToken = token ?? "";
  };
  const getUser = async () => {
    try {
      const { data, status, error } = await useFetch(
        "http://localhost:5000/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${auth.value?.accessToken}`,
          },
        }
      );
      if (status.value === "success") {
        auth.value.user = data.value?.user;
        // convert all bakslash to forward slash
        const image_converter = ("" + auth.value.user?.image).replace(
          /\\/g,
          "//"
        );
        auth.value.user = { ...auth.value.user, image: image_converter };
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getUser, setAccessToken };
}
