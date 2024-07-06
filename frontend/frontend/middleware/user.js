export default defineNuxtRouteMiddleware(async (to) => {
  const { auth } = useAuth();
  const { getUser, setAccessToken } = useUser();

  if (process.server) {
    try {
      const accessToken = useCookie("access_token");
      console.log(accessToken.value);
      if (!accessToken.value) {
        return navigateTo("/auth/login");
      }
      setAccessToken(accessToken.value);
      //   const {data,status,error} = await useFetch(
      //     "http://localhost:5000/api/v1/user",
      //     {
      //       method: "GET",
      //       headers: {
      //         authorization: `Bearer ${accessToken.value}`,
      //       },
      //     }
      //   );

      //   if (status.value === "success") {
      //     auth.value.user = data.value?.user;
      //   }
      await getUser();
      console.log(auth.value);

      if (!auth.value?.user) {
        return navigateTo("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (process.client) {
    try {
      const accessToken = useCookie("access_token");
      if (!accessToken.value) {
        return navigateTo("/auth/login");
      }
      setAccessToken(accessToken.value);

      await getUser();

      if (!auth.value?.user) {
        return navigateTo("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
});
