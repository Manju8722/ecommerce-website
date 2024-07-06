<template>
  <Toast>
    <template #closeicon>
      <div class="hidden"></div>
    </template>
  </Toast>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login in to your account
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            method="post"
            @submit.prevent="onLogin()"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Username or Email Id</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                v-model="username"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="password"
              />
            </div>

            <div class="w-full bg-green-600 rounded-lg">
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Swal from "sweetalert2";
import { useToast } from "primevue/usetoast";
const toast = useToast();

definePageMeta({
  middleware: ["is-logged"],
});
const username = ref("namen@gmail.com");
const password = ref("password");
// const { auth  } = useAuth();
const { getUser, setAccessToken } = useUser();
async function onLogin() {
  if (!username.value || !password.value) {
    return toast.add({
      severity: "error",
      summary: !username.value
        ? "username is required"
        : "password is required ",
      life: 3000,
    });
  }
  const { data, status, error } = await useFetch(
    "http://localhost:5000/api/v1/login",
    {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
      credentials: "include",
    }
  );
  if (status.value === "success") {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: data.value.message,
      showConfirmButton: false,
      timer: 1500,
    });
   
    setAccessToken(data.value.accessToken);
    await getUser();
    return navigateTo("/");
  } else {
    await Swal.fire({
      position: "center",
      icon: "error",
      title: error?.value?.data?.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
</script>
