<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <Toast>
      <template #closeicon>
        <div class="hidden"></div>
      </template>
    </Toast>
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
            Sign Up
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            method="post"
            @submit.prevent="onSingUp()"
          >
            <div>
              <label
                for="fullname"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your FullName</label
              >
              <input
                type="text"
                name="fullname"
                id="fullname"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="namen kajrolia"
                v-model="fullName"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Email Id</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                v-model="email"
              />
            </div>
            <div>
              <label
                for="mobilenumber"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Mobile Number</label
              >
              <input
                type="text"
                name="mobilenumber"
                id="mobilenumber"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                v-model="mobileNumber"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Username</label
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Swal from "sweetalert2";

const username = ref("");
const password = ref("");
const fullName = ref("");
const email = ref("");
const mobileNumber = ref("");

async function onSingUp() {
  if (
    !username.value ||
    !password.value ||
    !fullName.value ||
    !email.value ||
    !mobileNumber.value
  ) {
    return toast.add({
      severity: "error",
      summary: !username.value
        ? `username is required`
        : !password.value
        ? "password is required"
        : !fullName.value
        ? "fullname is required"
        : !email.value
        ? "email id is required"
        : "mobile number is required",
      life: 3000,
    });
  }
  const { data, status, error } = await useFetch(
    "http://localhost:5000/api/v1/signup",
    {
      method: "POST",
      body: {
        username: username.value.trim(),
        password: password.value.trim(),
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        mobileNumber: mobileNumber.value.trim(),
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (status.value === "success") {
    toast.add({
      severity: "success",
      summary: "Sign In Successfully...!",
      life: 3000,
    });
    await navigateTo("/auth/login");
  } else {
    await Swal.fire({
      position: "center",
      icon: "error",
      title: error.value.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

</script>
