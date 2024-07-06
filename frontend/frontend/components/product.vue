<template>
  <div id="signleCard" class="bg-white rounded-lg p-8">
    <h2
      class="text-end font-semibold capitalize text-lg my-2 leading-8 text-emerald-500"
    >
      {{ props.product.category }}
    </h2>
    <div class="relative overflow-hidden prod-img">
      <img
        class="object-contain aspect-[3/2] image"
        :src="props.product.image"
        alt="Product"
      />
      <!-- <div id="bgApply" class="absolute inset-0 bg-black opacity-40 hidden"></div> -->
      <div class="absolute inset-0 flex items-center justify-center">
        <button
          @click="viewProduct(props.product.id)"
          class="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300"
        >
          View Product
        </button>
      </div>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mt-4">
      {{
        props.product.title.length > 25
          ? props.product.title.slice(0, 25) + " ..."
          : props.product.title
      }}
    </h3>
    <p class="text-gray-500 text-sm mt-2">
      {{
        props.product.description.length > 100
          ? props.product.description.slice(0, 100) + " ..."
          : props.product.description
      }}
    </p>
    <div class="flex items-center justify-between mt-4">
      <span class="text-gray-900 font-bold text-lg"
        >${{ props.product.price }}</span
      >
      <Button
        v-if="!props.product.productQuantityInCart"
        @click="onAddToCart(props.product, 1)"
        icon="pi pi-cart-plus"
        rounded
        outlined
        label="Add To Cart"
      >
      </Button>
      <div v-else class="sm:order-1">
        <div
          class="mx-auto flex h-8 border border-emerald-500 rounded-full items-stretch text-gray-600"
        >
          <button
            @click="onAddToCart(props.product, -1)"
            v-ripple="{
              pt: {
                root: {
                  style: 'background: rgba(75, 175, 80, 0.3)',
                },
              },
            }"
            class="p-ripple items-center border-r border-emerald-500 justify-center rounded-l-md px-4 transition"
          >
          <i class="pi pi-minus " style="font-size: 1rem"></i>
          </button>
          <div
            class="flex w-full items-center justify-center px-4 text-lg py-2 uppercase transition"
          >
            {{ props.product.productQuantityInCart }}
          </div>
          <button @click="onAddToCart(props.product, 1)"
            v-ripple="{
              pt: {
                root: {
                  style: 'background: rgba(75, 175, 80, 0.3)',
                },
              },
            }"
            class="p-ripple flex border-l border-emerald-500 items-center justify-center rounded-r-md px-4 transitio"
          >
          <i class="pi pi-plus" style="font-size: 1rem"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["product"]);
const { auth } = useAuth();
async function viewProduct(id) {
  await navigateTo(`/products/${id}`);
}

const emit = defineEmits(["refreshCartApi"]);
async function onAddToCart(product, addRminus) {
  const { data: cartProducts, pending: productAddedToCartDetchStatus } =
    await useFetch("http://localhost:5000/api/v1/add-product-to-cart", {
      method: "POST",
      body: {
        productId: product._id,
        price: product.price,
        addRminus,
      },
      headers: {
        authorization: `Bearer ${auth.value.accessToken}`,
      },
    });
  if (!productAddedToCartDetchStatus.value) {
    emit("refreshCartApi");
  }
}
</script>
<style scoped>
.prod-img {
  cursor: pointer;
  transition: background-color 0.9s ease;
}

.prod-img:hover {
  background-color: gray;
}

.prod-img:hover .image {
  mix-blend-mode: color-burn;
}

/* #signleCard:hover #bgApply{
    display: block;
    
} */
</style>
