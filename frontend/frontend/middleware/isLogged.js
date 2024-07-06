export default defineNuxtRouteMiddleware(async (to, from) => {
  const { auth } = useAuth();
  const { getUser, setAccessToken } = useUser();

  if (process.client) {
    try {
      const accessToken = useCookie("access_token");
      if (accessToken.value) {
        setAccessToken(accessToken.value);

        await getUser();

        if (auth.value.accessToken && auth.value.user) {
            return navigateTo('/')
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (process.server) {
    try {
      const accessToken = useCookie("access_token");
      if (accessToken.value) {
        setAccessToken(accessToken.value);
        await getUser();
        if (auth.value.accessToken && auth.value.user) {
          return navigateTo('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});
