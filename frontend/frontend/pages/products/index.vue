<template>
  <div>
    <!-- component -->
    <div class="2xl:container 2xl:mx-auto">
      <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
      <div class="md:py-4 lg:px-10 md:px-2 py-3 px-4">
        <div class="flex justify-end items-center">
          <!-- filters Button (md and plus Screen) -->
          <Button
            @click="showFilters()"
            rounded
            outlined
            class="cursor-pointer sm:flex hidden flex justify-center items-center"
          >
            <i class="pi pi-sliders-v" style="font-size: 1.5rem"></i>

            Filters
          </Button>
        </div>

        <!-- Filters Button (Small Screen) -->

        <Button
          @click="showFilters()"
          outlined
          class="cursor-pointer block sm:hidden py-2 w-full flex text-base leading-4 font-normal justify-center items-center"
        >
          <i class="pi pi-sliders-v" style="font-size: 1.5rem"></i>
          Filters
        </Button>
      </div>

      <div
        id="filterSection"
        class="relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 dark:bg-emerald-500/85 w-full hidden"
      >
        <!-- Cross button Code -->
        <Button
          @click="closeFilterSection()"
          outlined
          class="cursor-pointer absolute right-2 top-2 py-2 px-6 md:px-10 text-white"
        >
          <i class="pi pi-times text-white text-lg md:text-2xl"></i>
        </Button>

        <!-- Colors Section -->
        <!-- <div>
          <div class="flex space-x-2 text-gray-800 dark:text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H15C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.9994 7.35022L10.9994 5.35022C10.6243 4.97528 10.1157 4.76465 9.58539 4.76465C9.05506 4.76465 8.54644 4.97528 8.17139 5.35022L5.34339 8.17822C4.96844 8.55328 4.75781 9.06189 4.75781 9.59222C4.75781 10.1225 4.96844 10.6312 5.34339 11.0062L14.3434 20.0062"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.3 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H17"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 17V17.01"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium">
              Colors
            </p>
          </div>
          <div
            class="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap"
          >
            <div
              class="flex space-x-2 md:justify-center md:items-center items-center justify-start"
            >
              <div class="w-4 h-4 rounded-full bg-white shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                White
              </p>
            </div>
            <div class="flex space-x-2 justify-center items-center">
              <div class="w-4 h-4 rounded-full bg-blue-600 shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                Blue
              </p>
            </div>
            <div
              class="flex space-x-2 md:justify-center md:items-center items-center justify-end"
            >
              <div class="w-4 h-4 rounded-full bg-red-600 shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                Red
              </p>
            </div>
            <div
              class="flex space-x-2 md:justify-center md:items-center items-center justify-start"
            >
              <div class="w-4 h-4 rounded-full bg-indigo-600 shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                Indigo
              </p>
            </div>
            <div class="flex space-x-2 justify-center items-center">
              <div class="w-4 h-4 rounded-full bg-black shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                Black
              </p>
            </div>
            <div
              class="flex space-x-2 md:justify-center md:items-center items-center justify-end"
            >
              <div class="w-4 h-4 rounded-full bg-purple-600 shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                Purple
              </p>
            </div>
            <div
              class="flex space-x-2 md:justify-center md:items-center items-center justify-start"
            >
              <div class="w-4 h-4 rounded-full bg-gray-600 shadow"></div>
              <p
                class="text-base leading-4 dark:text-gray-300 text-gray-600 font-normal"
              >
                Grey
              </p>
            </div>
          </div>
        </div>

        <hr class="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" /> -->

        <!-- Category Section -->
        <div>
          <div class="flex space-x-2 text-gray-800 dark:text-white">
            <i class="pi pi-shopping-bag" style="font-size: 1.25rem"></i>

            <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium">
              Category
            </p>
          </div>
          <div
            class="md:flex md:space-x-6 mt-8 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-y-8 flex-wrap"
          >
            <div
              v-for="(category, index) of uniqueCategory"
              :key="index"
              class="flex justify-start items-center"
            >
              <Checkbox
                class="mr-2"
                :inputId="category"
                :name="category"
                :value="category"
                v-model="categoryCollection"
              />
              <div class="inline-block">
                <div class="flex space-x-6 justify-center items-center">
                  <label
                    class="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                    :for="category"
                    >{{ category }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <!--Rating Section -->
        <div>
          <div class="flex space-x-2 text-gray-800 dark:text-white">
            <i class="pi pi-star-fill" style="font-size: 1rem"></i>

            <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium">
              Ratings
            </p>
          </div>
          <div
            class="md:flex md:space-x-6 mt-8 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-y-8 flex-wrap"
          >
            <div
              v-for="(rating, index) of [
                '1 And More',
                '2 And More',
                '3 And More',
                '4 And More',
              ]"
              :key="index"
              class="flex justify-start items-center"
            >
              <Checkbox
                class="mr-2"
                :inputId="rating"
                :name="rating"
                :value="rating"
                v-model="ratingCollection"
              />
              <div class="inline-block">
                <div class="flex space-x-6 justify-center items-center">
                  <label
                    class="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                    :for="rating"
                    >{{ rating }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <!-- Price Section -->
        <div>
          <div class="flex space-x-2 text-gray-800 dark:text-white">
            <i class="pi pi-tags" style="font-size: 1.25rem"></i>

            <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium">
              Price in $
            </p>
          </div>
          <div
            class="md:flex md:space-x-6 mt-8 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-y-8 flex-wrap"
          >
            <div
              v-for="(price, index) of uniquePrice"
              :key="index"
              class="flex justify-start items-center"
            >
              <Checkbox
                class="mr-2"
                :inputId="`${uniquePrice[index]}-${uniquePrice[index + 1]}`"
                :name="`${uniquePrice[index]}-${uniquePrice[index + 1]}`"
                :value="`${uniquePrice[index]}-${uniquePrice[index + 1]}`"
                v-model="priceCollection"
                v-if="uniquePrice?.[index + 1]"
              />
              <div class="inline-block" v-if="uniquePrice?.[index + 1]">
                <div class="flex space-x-6 justify-center items-center">
                  <label
                    class="mr-2 text-sm leading-3 dark:text-gray-300 font-normal text-gray-600"
                    :for="`${uniquePrice[index]}-${uniquePrice[index + 1]}`"
                    >{{ uniquePrice[index] }}-{{
                      uniquePrice?.[index + 1]
                    }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Apply Filter Button (Large Screen) -->

        <div
          class="hidden md:block absolute right-0 bottom-0 md:py-10 lg:px-20 md:px-6 py-9 px-4"
        >
          <Button
            @click="applyFilters()"
            outlined
            class="py-4 px-10 text-white"
          >
            Apply Filter
          </Button>
        </div>

        <!-- Apply Filter Button (Table or lower Screen) -->

        <div class="block md:hidden w-full mt-10">
          <Button
            outlined
            @click="applyFilters()"
            class="w-full py-4 px-10 text-white"
          >
            <span class="mx-auto"> Apply Filter</span>
          </Button>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center" v-if="pending ?? true">
      <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div
            class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"
          ></div>
          <div
            class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"
          ></div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 m-2">
      <product
        @refreshCartApi="refreshCartApi()"
        :product="product"
        v-for="(product, index) of appliedFilteredProducts.slice(
          productStartingNum,
          productEndingNum
        )"
        :key="index"
      />
    </div>
    <Pagination
      v-if="appliedFilteredProducts.length"
      @paginationChanges="onPaginationUpdate"
      :rows="productPageLimit"
      :totalRecords="appliedFilteredProducts.length"
    />
    <div
      v-if="appliedFilteredProducts.length == 0 && !pending"
      class="px-6 md:px-0 flex justify-center"
    >
      <div
        class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl"
      >
        <p
          class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4"
        >
          Product Not Found
        </p>
        <p class="text-gray-500 mt-4 pb-4 text-center">
          Sorry, the Product you are looking for is not exist please search
          again .
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Pagination from "../../components/Pagination.vue";

const { searchBarEnable } = useSearchBar();
const { auth } = useAuth();
const { products } = useProducts();
const { cartProducts } = useCartProducts();

const categoryCollection = ref([]);
const ratingCollection = ref([]);
const priceCollection = ref([]);
const productPageLimit = ref(10);
const productStartingNum = ref(0);
const productEndingNum = ref(productPageLimit.value);
const pending = ref(true);
const {
  data: productData,
  pending: fetchingStatus,
  refresh: indexProductRefresh,
} = await useFetch("http://localhost:5000/api/v1/get-products", {
  method: "GET",

  headers: {
    authorization: `Bearer ${auth.value.accessToken}`,
  },
});
const {
  data: Cart,
  pending: fetchingCartStatus,
  refresh: cartProductRefresh,
} = await useHttpGet("http://localhost:5000/api/v1/get-user-cart");



const productsAddedToCart = computed(() => {
    cartProducts.value.cart = Cart.value.userCart;

  return Cart.value.userCart?.productDetails ?? [];
});

function cartProductsAndIndexProductsCompare() {
  products.value.products_collection =
    productData.value.map((product) => {
      const product_exist = productsAddedToCart.value.find((cartProduct) => {

        return cartProduct.productId._id == product._id;
      });

      if (product_exist) {
        product.productQuantityInCart = product_exist.quantity;
        return product;
      }
      product.productQuantityInCart = 0;
      return product;
    }) ?? [];
}
cartProductsAndIndexProductsCompare();

pending.value = fetchingStatus.value;

async function refreshCartApi() {
  await cartProductRefresh({});
  await indexProductRefresh({});
  cartProductsAndIndexProductsCompare();

}
function onPaginationUpdate(page) {
  productPageLimit.value = page.rows;
  productStartingNum.value = page.first;
  productEndingNum.value = (page.page + 1) * page.rows;
}
definePageMeta({
  layout: "user",
  middleware: ["user"],
});

const uniqueCategory = computed(() => {
  const set = new Set();

  for (const pData of products.value.products_collection) {
    set.add(pData.category);
  }

  return [...set];
});

const uniquePrice = computed(() => {
  const set = new Set();

  for (const pData of products.value.products_collection) {
    set.add(pData.price);
  }

  const values = [...set].sort((pv, cv) => {
    return pv - cv;
  });

  // Get the first and last value
  const firstValue = values[0];
  const lastValue = values[values.length - 1];

  // Calculate the step size
  const stepSize = (lastValue - firstValue) / 5;

  // Generate 6 rounded values (including first and last values)
  const roundedValues = [];
  for (let i = 0; i <= 5; i++) {
    const roundedValue = Math.round((firstValue + stepSize * i) * 100) / 100; // Round to 2 decimal places
    roundedValues.push(roundedValue);
  }

  return roundedValues.map((v) => {
    return Math.round(v);
  });
});
onMounted(() => {
  searchBarEnable.value.isEnable = true;
});

function showFilters() {
  var fSection = document.getElementById("filterSection");
  if (fSection.classList.contains("hidden")) {
    fSection.classList.remove("hidden");
    fSection.classList.add("block");
  } else {
    fSection.classList.add("hidden");
  }
}
const searchBarValueProp = inject("searchBarValueProp");
function applyFilters() {}

function closeFilterSection() {
  var fSection = document.getElementById("filterSection");
  fSection.classList.add("hidden");
}

// const categoryFiteredProduct = computed(() => {
//   return products.value.products_collection.filter((product) => {
//     return categoryCollection.value.includes(product?.category);
//   });
// });
const numberRating = computed(() => {
  return ratingCollection.value.map((rating) => {
    return rating.slice(0, 1);
  });
});
// const ratingsFiteredProduct = computed(() => {
//   return products.value.products_collection.filter((product) => {
//     return numberRating.value.some((rating) => {
//       return product.rating.rate >= rating;
//     });
//   });
// });

// const priceFiteredProduct = computed(() => {
//   return products.value.products_collection.filter((product) => {
//     return priceCollection.value.some((priceString) => {
//       return (
//         parseInt(priceString.split("-")[0]) <= product.price &&
//         parseInt(priceString.split("-")[1]) >= product.price
//       );
//     });
//   });
// });
const searchProducts = computed(() => {
  return products.value.products_collection.filter((product) => {
    return [
      `${product.category}`.toLowerCase(),
      `${product.title}`.toLowerCase(),
    ].some((v) => {
      return v.includes(searchBarValueProp.value.toLowerCase());
    });
  });
});
const appliedFilteredProducts = computed(() => {
  let productArray = searchProducts.value;

  const categoryFitered =
    productArray.filter((product) => {
      return categoryCollection.value.includes(product?.category);
    }) ?? [];

  if (categoryFitered.length > 0 || categoryCollection.value.length > 0) {
    productArray = categoryFitered;
  }

  const ratingFilterd =
    productArray.filter((product) => {
      return numberRating.value.some((rating) => {
        return product.rating.rate >= rating;
      });
    }) ?? [];

  if (ratingFilterd.length > 0 || numberRating.value.length > 0) {
    productArray = ratingFilterd;
  }

  const priceFilterd =
    productArray.filter((product) => {
      return priceCollection.value.some((priceString) => {
        return (
          parseInt(priceString.split("-")[0]) <= product.price &&
          parseInt(priceString.split("-")[1]) >= product.price
        );
      });
    }) ?? [];
  if (priceFilterd.length > 0 || priceCollection.value.length > 0) {
    productArray = priceFilterd;
  }

  return productArray;
});
</script>

<style scoped>
/* .checkbox:checked + .check-icon {
  display: flex;
} */
</style>
