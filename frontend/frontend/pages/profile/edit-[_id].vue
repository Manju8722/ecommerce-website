<template>
  <section class="p-4 my-auto">
    <Toast>
      <template #closeicon>
        <div class="hidden"></div>
      </template>
    </Toast>
    <div class="md:w-1/2 w-full mx-auto shadow-xl p-4 rounded-xl bg-white">
      <div class="">
        <h1
          class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-medium mb-2"
        >
          Profile
        </h1>
        <img
          class="w-36 h-36 mx-auto rounded-full border border-emerald-500"
          :src="auth.user?.image"
          alt="No Image At the Moment"
        />

        <div class="rounded-full text-center pl-16">
          <input
            type="file"
            id="upload_profile"
            name="upload_profile"
            hidden
            @change="onImageUplaod($event)"
            required
          />

          <label for="upload_profile">
            <i
              class="pi pi-camera cursor-pointer"
              style="font-size: 1.5rem; color: green"
            ></i>
          </label>
        </div>

        <form @submit.prevent="onSubmitProfileEdit()">
          <!-- Profile Image -->
          <!-- <div
            :style="{ backgroundImage: `url(${auth.user?.image})` }"
            class="mx-auto w-36 flex justify-end items-end h-36 rounded-full bg-cover bg-center bg-no-repeat"
          >
            
          </div> -->

          <h2 class="text-center font-semibold dark:text-gray-700">
            Upload Profile Image
          </h2>
          <div class="flex flex-wrap sm:flex-col gap-2 justify-center w-full">
            <div class="w-full md:mb-2">
              <label for="username">User Name</label>
              <input
                type="text"
                class="mt-2 p-4 w-full border rounded-lg border-emerald-500"
                placeholder="User Name"
                v-model="userName"
              />
            </div>
            <div class="w-full md:mb-2">
              <label for="full_name" class="mb-2 dark:text-gray-700"
                >Full Name</label
              >
              <input
                type="text"
                class="mt-2 p-4 w-full border rounded-lg border-emerald-500"
                placeholder="Full Name"
                v-model="fullName"
              />
            </div>
            <div class="w-full md:mb-2">
              <label for="email id">Email Id</label>
              <input
                type="email"
                class="mt-2 p-4 w-full border rounded-lg border-emerald-500"
                placeholder="Email Id"
                v-model="email"
              />
            </div>
            <div class="w-full md:mb-2">
              <label for="mobile number" class="mb-2 dark:text-gray-700"
                >Mobile Number</label
              >
              <input
                type="text"
                class="mt-2 p-4 w-full border rounded-lg border-emerald-500"
                placeholder="Mobile Number"
                v-model="mobileNumber"
              />
            </div>
          </div>

          <div class="w-full mt-2">
            <Button
              type="submit"
              outlined
              label="Submit"
              class="w-full p-4"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const { auth } = useAuth();
const { searchBarEnable } = useSearchBar();
const userName = ref(auth.value.user?.username);
const fullName = ref(auth.value.user?.fullName);
const email = ref(auth.value.user?.email);
const mobileNumber = ref(auth.value.user?.mobileNumber);
const { _id: user_id } = useRoute().params;
onMounted(() => {
  searchBarEnable.value.isEnable = false;
});
definePageMeta({
  middleware: ["user"],
  layout: "user",
});
async function onImageUplaod(e) {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("last_user_image", auth.value.user?.image);
  const { data, pending, error, status } = await useFetch(
    "http://localhost:5000/api/v1/profile",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth.value.accessToken}`,
      },
      body: formData,
    }
  );
  if (status.value == "success") {
    toast.add({
      severity: "success",
      summary: "Profile Picture Added Successfully",
      life: 3000,
    });
    const image_converter = ("" + data.value?.uploaded_file_path).replace(
      /\\/g,
      "//"
    );
    auth.value.user = { ...auth.value.user, image: image_converter };
  }
}

async function onSubmitProfileEdit() {
  const {
    data,
    pending: fetchingStatus,
    error,
    status,
  } = await useFetch("http://localhost:5000/api/v1/profile/edit/" + user_id, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${auth.value.accessToken}`,
    },
    body: {
      userName: userName.value,
      fullName: fullName.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
    },
  });

  if (error.value) {
    return toast.add({
      severity: "error",
      summary: error.value.data.message,
      life: 3000,
    });
  }
  if (status.value == "success") {
    auth.value.user = {
      ...auth.value.user,
      username: userName.value,
      fullName: fullName.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
    };
    auth.value.accessToken = data.value.accessToken;
    return toast.add({
      severity: "success",
      summary: "Profile is Updated Successfully",
      life: 3000,
    });
  }
}
</script>
