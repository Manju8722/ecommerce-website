<template>
  <section
    v-if="cartProducts.cart && cartProducts.cart.productDetails.length"
    class="h-screen py-12 sm:py-16 lg:py-20"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
      </div>
      <div class="mx-auto mt-8 max-w-2xl md:mt-12">
        <div class="bg-white shadow">
          <div class="px-4 py-6 sm:px-8 sm:py-10">
            <div class="flow-root">
              <ul class="-my-8 py-4">
                <li
                  v-for="(product, index) of cartProducts.cart.productDetails"
                  :key="index"
                  class="flex flex-col space-y-3 border-b py-6 my-4 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                >
                  <div class="shrink-0">
                    <img
                      class="h-36 w-36 max-w-full rounded-lg object-cover"
                      :src="product.productId.image"
                      alt=""
                    />
                  </div>

                  <div class="relative flex flex-1 flex-col justify-between">
                    <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                      <div class="pr-8 md:px-2 sm:pr-5">
                        <p class="text-base font-semibold text-gray-900">
                          {{ product.productId.title }}
                        </p>
                        <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">
                          {{ product.productId.category }}
                        </p>
                      </div>

                      <div
                        class="mt-4 md:px-2 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end"
                      >
                        <p
                          class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
                        >
                          <span class="text-sm">
                            ({{ product.quantity }} *
                            {{ product.productPrice }})</span
                          >
                          ${{ product.quantity * product.productPrice }}
                        </p>

                        <div class="sm:order-1">
                          <div
                            class="mx-auto flex h-8 border border-emerald-500 rounded-full items-stretch text-gray-600"
                          >
                            <button
                              @click="onAddToCart(product, -1)"
                              v-ripple="{
                                pt: {
                                  root: {
                                    style: 'background: rgba(75, 175, 80, 0.3)',
                                  },
                                },
                              }"
                              class="p-ripple items-center border-r border-emerald-500 justify-center rounded-l-md px-4 transition"
                            >
                              -
                            </button>
                            <div
                              class="flex w-full items-center justify-center p-4 text-lg uppercase transition"
                            >
                              {{ product.quantity }}
                            </div>
                            <button
                              @click="onAddToCart(product, 1)"
                              v-ripple="{
                                pt: {
                                  root: {
                                    style: 'background: rgba(75, 175, 80, 0.3)',
                                  },
                                },
                              }"
                              class="p-ripple flex border-l border-emerald-500 items-center justify-center rounded-r-md px-4 transitio"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="absolute top-0 right-2 flex sm:bottom-0 sm:top-auto"
                    >
                      <Button
                        @click="onTrashAddedItem(product.productId._id)"
                        rounded
                        icon="pi pi-trash"
                        outlined
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-6 border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-400">Subtotal</p>
                <p class="text-lg font-semibold text-gray-900">
                  ${{ Math.round(cartProducts.cart.totaPrice) }}
                </p>
              </div>
              <!-- <div class="flex items-center justify-between">
                <p class="text-sm text-gray-400">Shipping</p>
                <p class="text-lg font-semibold text-gray-900">$8.00</p>
              </div> -->
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span class="text-xs font-normal text-gray-400">$</span>
                {{ Math.round(cartProducts.cart.totaPrice) }}
              </p>
            </div>

            <div class="mt-6 mb-4 text-center">
              <Button
                @click="onCheckout()"
                outlined
                :icon="checkoutLoading ? 'pi pi-spin pi-spinner' : 'pi pi-spin'"
                :label="!checkoutLoading ? 'Checkout' : ''"
                type="button"
                class="w-full px-6 py-4 text-lg font-semibold text-emerald-500 transition-all duration-200 ease-in-out"
              >
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else class="px-6 md:px-0 flex justify-center my-6">
    <div
      class="bg-white border md:w-1/2 w-full border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl"
    >
      <p
        class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4"
      >
        <i class="pi pi-shopping-cart" style="font-size: 2.5rem"></i>
      </p>
      <p class="text-gray-500 mt-4 pb-4 text-center">Your Cart is Empty</p>
      <Button
        label="Shop"
        outlined
        @click="
          async () => {
            await navigateTo('/products');
          }
        "
      >
      </Button>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user"],
});
const { searchBarEnable } = useSearchBar();

const { cartProducts } = useCartProducts();
const { auth } = useAuth();

const checkoutLoading = ref(false);

function onTrashAddedItem(_id) {
  const {
    data: Cart,
    pending,
    error,
  } = useFetch("http://localhost:5000/api/v1/delete-cart-product/" + _id, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${auth.value.accessToken}`,
    },
  });
  if (!error.value) {
    const delete_product = cartProducts.value.cart.productDetails.find(
      (product) => {
        return product.productId._id == _id;
      }
    );
    const delete_product_total_q = delete_product.quantity;
    const delete_product_total_p =
      delete_product.quantity * delete_product.productPrice;

    cartProducts.value.cart.productDetails =
      cartProducts.value.cart.productDetails.filter((product) => {
        return product.productId._id !== _id;
      });
    cartProducts.value.cart.quantity -= 1;
    cartProducts.value.cart.totalQuantity -= delete_product_total_q;
    cartProducts.value.cart.totaPrice -= delete_product_total_p;
  }
}

async function onAddToCart(product, addRminus) {
  const {
    data,
    pending: productAddedToCartDetchStatus,
    error,
  } = await useFetch("http://localhost:5000/api/v1/add-product-to-cart", {
    method: "POST",
    body: {
      productId: product.productId._id,
      price: product.productId.price,
      addRminus,
    },
    headers: {
      authorization: `Bearer ${auth.value.accessToken}`,
    },
  });
  if (!error.value) {
    cartProducts.value.cart.totalQuantity += addRminus;
    if (addRminus == -1) {
      cartProducts.value.cart.totaPrice -= product.productPrice;
    }
    if (addRminus == 1) {
      cartProducts.value.cart.totaPrice += product.productPrice;
    }
    if (addRminus == -1 && product.quantity == 1) {
      cartProducts.value.cart.quantity += addRminus;
      cartProducts.value.cart.productDetails =
        cartProducts.value.cart.productDetails.filter((p) => {
          return p.productId._id !== product.productId._id;
        });
      return;
    }
    product.quantity = product.quantity + addRminus;
  }
}
const {
  data: Cart,
  pending: fetchingCartStatus,
  refresh: cartProductRefresh,
} = await useHttpGet("http://localhost:5000/api/v1/get-user-cart");

cartProducts.value.cart = Cart.value.userCart;

async function onCheckout() {
  checkoutLoading.value = true;
  const { data, pending, error } = await useFetch(
    "http://localhost:5000/api/v1/stripe-checkout",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth.value.accessToken}`,
      },
      body: {
        productDetail: cartProducts.value.cart.productDetails,
        userId: auth.value.user.id,
      },
    }
  );
  if (!error.value) {
    checkoutLoading.value = false;
    if (data.value.url) {
      await navigateTo(data.value.url, { external: true });
    }
  }
  // setTimeout(() => {
  //     checkoutLoading.value = false;
  // }, 5000);
}

onMounted(async () => {
  searchBarEnable.value.isEnable = false;
});
</script>

<!-- <pre class="hidden">
    {
      id: 'cs_test_b1beGF3cW0x7A8OKF23Slfo9HuynSgmWiMV97SM10l3NKkdM2MNLdYx0SI',
      object: 'checkout.session',
      after_expiration: null,
      allow_promotion_codes: null,
      amount_subtotal: 4000,
      amount_total: 4000,
      automatic_tax: { enabled: false, liability: null, status: null },
      billing_address_collection: null,
      cancel_url: 'http://localhost:3000/products/cancel',
      client_reference_id: null,
      client_secret: null,
      consent: null,
      consent_collection: null,
      created: 1715755119,
      currency: 'usd',
      currency_conversion: null,
      custom_fields: [],
      custom_text: {
        after_submit: null,
        shipping_address: null,
        submit: null,
        terms_of_service_acceptance: null
      },
      customer: 'cus_Q6p8T1hxBiBbw5',
      customer_creation: null,
      customer_details: {
        address: {
          city: 'CSK',
          country: 'US',
          line1: 'new york',
          line2: 'CSK',
          postal_code: '37063',
          state: 'TN'
        },
        email: 'vue.dev@incipientinfo.com',
        name: 'vue.dev@incipientinfo.com',
        phone: null,
        tax_exempt: 'none',
        tax_ids: []
      },
      customer_email: null,
      expires_at: 1715841519,
      invoice: null,
      invoice_creation: {
        enabled: false,
        invoice_data: {
          account_tax_ids: null,
          custom_fields: null,
          description: null,
          footer: null,
          issuer: null,
          metadata: {},
          rendering_options: null
        }
      },
      livemode: false,
      locale: null,
      metadata: {},
      mode: 'payment',
      payment_intent: 'pi_3PGbUeSB0GJQPeBH09zQQ4R7',
      payment_link: null,
      payment_method_collection: 'if_required',
      payment_method_configuration_details: { id: 'pmc_1OhmqvSB0GJQPeBHf9GxTjZo', parent: null },
      payment_method_options: { card: { request_three_d_secure: 'automatic' } },
      payment_method_types: [ 'card' ],
      payment_status: 'paid',
      phone_number_collection: { enabled: false },
      recovered_from: null,
      saved_payment_method_options: { allow_redisplay_filters: [ 'always' ], payment_method_save: null },
      setup_intent: null,
      shipping_address_collection: null,
      shipping_cost: null,
      shipping_details: null,
      shipping_options: [],
      status: 'complete',
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:3000/products/success',
      total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
      ui_mode: 'hosted',
      url: null
    }</pre
      > -->
