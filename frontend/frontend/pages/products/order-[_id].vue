<template>
  <section class="py-24 my-6 px-4 relative">
    <div class="w-full max-w-7xl px-5 p-4 rounded-md lg-6 mx-auto bg-white">
      <h2
        class="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11"
      >
        Your Order Confirmed
      </h2>
      <h6 class="font-medium text-xl leading-8 text-black mb-3">
        Hello, {{ auth.user.fullName }}
      </h6>
      <p class="font-normal text-lg leading-8 text-gray-500 mb-11">
        Your order has been completed and processing to shipping.
      </p>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 py-6 border-y border-gray-100 mb-6"
      >
        <div class="box group">
          <p
            class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700"
          >
            Ordered Date
          </p>
          <h6 class="font-semibold font-manrope text-base leading-9 text-black">
            {{ formatDateAndTime(Order.createdAt) }}
          </h6>
        </div>

        <div class="box group">
          <p
            class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700"
          >
            Order Id / Payment Id
          </p>
          <h6 class="font-semibold font-manrope text-base leading-9 text-black">
            {{ Order.paymentIntentId }}
          </h6>
        </div>
        <div class="box group">
          <p
            class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700"
          >
            Payment Method
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="32"
            viewBox="0 0 46 32"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="45"
              height="31"
              rx="5.5"
              fill="#1F72CD"
            />
            <rect
              x="0.5"
              y="0.5"
              width="45"
              height="31"
              rx="5.5"
              stroke="#F3F4F6"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.1282 11.333L3.88672 20.9953H8.96437L9.59385 19.4548H11.0327L11.6622 20.9953H17.2512V19.8195L17.7493 20.9953H20.6404L21.1384 19.7947V20.9953H32.7621L34.1755 19.4948L35.4989 20.9953L41.4691 21.0078L37.2143 16.1911L41.4691 11.333H35.5915L34.2157 12.8058L32.9339 11.333H20.2888L19.203 13.8269L18.0917 11.333H13.0246V12.4688L12.461 11.333H8.1282ZM9.1107 12.7051H11.5858L14.3992 19.2571V12.7051H17.1105L19.2835 17.4029L21.2862 12.7051H23.984V19.6384H22.3424L22.329 14.2055L19.9358 19.6384H18.4674L16.0607 14.2055V19.6384H12.6837L12.0435 18.0841H8.58456L7.94566 19.6371H6.13627L9.1107 12.7051ZM32.1608 12.7051H25.4859V19.6343H32.0574L34.1755 17.3379L36.217 19.6343H38.3512L35.2493 16.1898L38.3512 12.7051H36.3096L34.2023 14.9752L32.1608 12.7051ZM10.3147 13.8782L9.17517 16.6471H11.453L10.3147 13.8782ZM27.1342 15.4063V14.1406V14.1394H31.2991L33.1165 16.1636L31.2186 18.1988H27.1342V16.817H30.7756V15.4063H27.1342Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="box group">
          <p
            class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700"
          >
            Address
          </p>
          <h6 class="font-semibold font-manrope text-base leading-9 text-black">
            {{ Object.values(Order.shipping.address).join(" ") }}
          </h6>
        </div>
        <div class="box group">
          <p
            class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700"
          >
            Shipping Status
          </p>
          <h6 class="font-semibold font-manrope text-base leading-9 text-black">
            {{ Order.deliveryStatus }}
          </h6>
        </div>
      </div>

      <div
        v-for="(product, index) of Order?.cart"
        :key="index"
        class="grid grid-cols-7 w-full border-b border-gray-100"
      >
        <div class="col-span-2 md:col-span-2">
          <img
            :src="product.productId.image"
            :alt="product.productId.title"
            class="w-24"
          />
        </div>
        <div
          class="col-span-7 md:col-span-6 max-sm:mt-5 flex flex-col justify-center"
        >
          <div class="flex flex-col justify-between">
            <div>
              <h5
                class="font-manrope font-semibold text-2xl leading-9 text-black mb-6"
              >
                {{ product.productId.title }}
              </h5>
              <p class="font-normal text-xl leading-8 text-gray-500">
                Quantity :
                <span class="text-black font-semibold">{{
                  product.quantity
                }}</span>
              </p>
              <p class="font-normal text-xl leading-8 text-gray-500">
                Price :
                <span class="text-black font-semibold"
                  >${{ product.productPrice }}</span
                >
              </p>
            </div>

            <h5
              class="font-manrope font-semibold text-2xl leading-10 text-black sm:text-right mt-3"
            >
              <span class="text-sm"
                >({{ product.quantity }} * {{ product.productPrice }})
              </span>
              ${{ product.quantity * product.productPrice }}
            </h5>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center sm:justify-end w-full my-4">
        <div class="w-full">
          <div
            v-if="Order.subtotal !== Order.total"
            class="flex items-center justify-between mb-6"
          >
            <p class="font-normal text-xl leading-8 text-gray-500">Subtotal</p>
            <p class="font-semibold text-xl leading-8 text-gray-900">
              ${{ Order.subtotal / 100 }}
            </p>
          </div>
          <div
            v-if="Order.subtotal !== Order.total"
            class="flex items-center justify-between mb-6"
          >
            <p class="font-normal text-xl leading-8 text-gray-500">
              Shipping Charge
            </p>
            <p class="font-semibold text-xl leading-8 text-gray-900">
              ${{ (Order.total - Order.subtotal) / 100 }}
            </p>
          </div>

          <div class="flex items-center justify-between py-6">
            <p
              class="font-manrope font-semibold text-2xl leading-9 text-gray-900"
            >
              Total
            </p>
            <p
              class="font-manrope font-bold text-2xl leading-9 text-indigo-600"
            >
              ${{ Order.total / 100 }}
            </p>
          </div>
        </div>
      </div>
      <div class="data">
        <p class="font-normal text-lg leading-8 text-gray-500 mb-11">
          We'll be sending a shipping confirmation email when the items shipped
          successfully.
        </p>
        <h6 class="font-manrope font-bold text-2xl leading-9 text-black mb-3">
          Thank you for shopping with us!
        </h6>
      </div>
    </div>
  </section>
</template>

<script setup>
const { auth } = useAuth();
definePageMeta({
  layout: "user",
  middleware: ["user"],
});
const { _id } = useRoute().params;

const { data: Order, pending: fetchingCartStatus } = await useHttpGet(
  "http://localhost:5000/api/v1/get-order/" + _id
);

function formatDateAndTime(isoString) {
  const date = new Date(isoString);

  // Get date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Get time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  // Format date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
}
</script>
