<template>
  <div class="bg-gray-100">
    <div class="h-screen flex overflow-hidden bg-gray-200">
      <!-- Sidebar -->
      <div
        class="absolute z-50 bg-emerald-500 text-white w-56 min-h-screen overflow-y-auto transition-transform transform -translate-x-full ease-in-out duration-300"
        id="sidebar"
      >
        <!-- Your Sidebar Content -->
        <div>
          <h1
            class="text-2xl font-semibold border-b-2 px-4 py-2 border-white"
            @click="closeNavbarOnClickLink()"
          >
            Sidebar
          </h1>
          <ul class="mt-4 m-4">
            <li class="mb-2" @click="closeNavbarOnClickLink()">
              <NuxtLink to="/products" class="block hover:text-indigo-400"
                >Products</NuxtLink
              >
            </li>

            <li class="mb-2" @click="closeNavbarOnClickLink()">
              <NuxtLink to="/products/order" class="block hover:text-indigo-400"
                >Orders</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Navbar -->
        <div class="bg-white shadow">
          <div class="container mx-auto">
            <div class="grid grid-cols-12 items-center px-2">
              <div
                class="col-span-1 cursor-pointer"
                @click="
                  async () => {
                    await navigateTo('/');
                  }
                "
              >
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=rose&amp;shade=500"
                  alt="Your Company"
                />
              </div>

              <div class="col-span-6 lg:col-span-8">
                <div
                  class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
                >
                  <div class="w-full">
                    <label for="search" class="sr-only">Search</label>
                    <div class="relative">
                      <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          x-description="Heroicon name: mini/magnifying-glass"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        id="search"
                        name="search"
                        v-model="serachValue"
                        :class="{
                          'focus:border-red-300 focus:ring-red-300':
                            !isSearchBarEnable,
                          'focus:border-emerald-300 focus:ring-emerald-300':
                            isSearchBarEnable,
                        }"
                        class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                        :placeholder="
                          !isSearchBarEnable
                            ? 'Search Does Not Work Here'
                            : 'Search....!'
                        "
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-5 lg:col-span-3 flex justify-center gap-1">
                <Button
                  icon="pi pi-cart-plus"
                  @click="
                    async () => {
                      await navigateTo('/products/cart');
                    }
                  "
                  :badge="
                    cartProducts.cart?.quantity > 0 &&
                    cartProducts.cart?.quantity.toString()
                  "
                  badgeSeverity="danger"
                  rounded
                  text
                >
                </Button>

                <Button
                  icon="pi pi-user"
                  @click="
                    async () => {
                      await navigateTo('/profile');
                    }
                  "
                  text
                  rounded
                  aria-label="User"
                  v-tooltip.bottom="{
                    value: auth?.user?.username ?? 'No User',
                    pt: {
                      arrow: {
                        style: {
                          borderBottomColor: 'var(--primary-color)',
                        },
                      },
                      text: 'bg-info font-medium',
                    },
                  }"
                />
                <Button
                  @click="logout()"
                  icon="pi pi-sign-out"
                  text
                  rounded
                  aria-label="Filter"
                />

                <Button id="open-sidebar" text rounded icon="pi pi-bars">
                </Button>
              </div>
            </div>
          </div>
        </div>
        <!-- Content Body -->
        <div class="flex-1 overflow-auto bg-gray-100">
          <div>
            <slot :searchBarValueProp="searchBarValueProp" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { auth } = useAuth();
const accessToken = useCookie("access_token");
const { searchBarEnable } = useSearchBar();

const { cartProducts } = useCartProducts();

const serachValue = ref("");
provide("searchBarValueProp", serachValue);

function logout() {
  accessToken.value = "";
  auth.value.user = null;
  auth.value.accessToken = "";
  return navigateTo("/auth/login");
}
function closeNavbarOnClickLink() {
  document.addEventListener("click", (e) => {
    sidebar.classList.add("-translate-x-full");
  });
}
onMounted(() => {
  const sidebar = document.getElementById("sidebar");
  const openSidebarButton = document.getElementById("open-sidebar");

  openSidebarButton.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("-translate-x-full");
  });

  // Close the sidebar when clicking outside of it
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !openSidebarButton.contains(e.target)) {
      sidebar.classList.add("-translate-x-full");
    }
  });
});

const isSearchBarEnable = computed(() => {
  return searchBarEnable.value.isEnable;
});

const {
  data: Cart,
  pending: fetchingCartStatus,
  refresh: cartProductRefresh,
} = await useHttpGet("http://localhost:5000/api/v1/get-user-cart");
cartProducts.value.cart = Cart.value?.userCart;
</script>
