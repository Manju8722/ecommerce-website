<template>
  <Toast>
    <template #closeicon>
      <div class="hidden"></div>
    </template>
  </Toast>
  <section
    class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
  >
    <div
      class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0"
    >
      <!--Main Col-->
      <div
        id="profile"
        class="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div class="p-4 md:p-12 text-center">
          <!-- Image for mobile view-->
          <div class="w-48 border border-emerald-500 shadow-lg mx-auto rounded-full">
            <img
              class="w-full h-48 mx-auto rounded-full"
              :src="auth.user?.image"
              alt="No Image At the Moment"
            />
          </div>
          <h1 class="text-3xl lg:text-left font-bold pt-8 lg:pt-0">
            {{ auth.user?.fullName }}
          </h1>
          <div
            class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"
          ></div>
          <p
            class="pt-4 text-sm font-bold flex items-center justify-center lg:justify-start"
          >
            <i
              class="pi pi-user mr-2"
              style="color: green; font-size: 1.1rem"
            ></i>
            {{ auth.user?.username }}
          </p>
          <p
            class="pt-4 text-sm font-bold flex items-center justify-center lg:justify-start"
          >
            <i
              class="pi pi-envelope mr-2"
              style="color: green; font-size: 1.1rem"
            ></i>
            {{ auth.user?.email }}
          </p>
          <p
            class="pt-4 text-gray-600 text-sm lg:text-sm flex items-center justify-center lg:justify-start"
          >
            <i
              class="pi pi-phone mr-2"
              style="color: green; font-size: 1.1rem"
            ></i>

            {{ auth.user?.mobileNumber }}
          </p>

          <div class="pt-6">
            <Button
              @click="
                async () => {
                  await navigateTo('/profile/edit-' + auth.user?.id);
                }
              "
              outlined
              rounded
              class="py-2 px-4"
            >
              Edit Profile
            </Button>
          </div>

          <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="m-20">
    <input @change="onImageUplaod($event)" type="file" multiple="multiple" />
  </div> -->
</template>
<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const { auth } = useAuth();
definePageMeta({
  layout: "user",
  middleware: ["user"],
});
</script>

<!-- src="https://loremflickr.com/320/320/girl" -->
