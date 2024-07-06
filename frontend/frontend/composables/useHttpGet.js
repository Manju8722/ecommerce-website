export default async (url, options) => {
  const { auth } = useAuth();

  const { data, refresh, pending, execute, error, status } = await useFetch(
    url,
    {
      method: "GET",

      headers: {
        authorization: `Bearer ${auth.value.accessToken}`,
      },
      ...options,
    }
  );

  return { data, refresh, pending, execute, error, status };
};
