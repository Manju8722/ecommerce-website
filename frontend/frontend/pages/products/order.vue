<template>
  <div class="mx-auto px-4 py-5 sm:px-6 lg:px-8">
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-semibold text-gray-900">Your Orders</h1>
    </div>
    <div class="mx-auto mt-8 max-w-2xl md:mt-12" v-if="Orders?.length">
      <div class="bg-white shadow">
        <div class="px-4 py-6 sm:px-8 sm:py-10">
          <div class="flow-root">
            <ul class="-my-8 py-4">
              <li
                v-for="(product, index) of Orders"
                :key="index" @click="onOrderProduct(product._id)"
                class="flex flex-col space-y-3 cursor-pointer border-b py-6 my-4 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
              >
                <div class="shrink-0">
                  <img
                    class="h-36 w-36 max-w-full rounded-lg object-cover"
                    :src="product?.cart?.[0].productId?.image"
                    alt="No Iamge"
                  />
                </div>

                <div class="relative flex  flex-row border rounded-md p-2  gap-2 items-center justify-between">
             
                
                      <p class="text-xs font-semibold text-gray-900">
                       Order Date: <p class="text-sm">{{ formatDateAndTime(product?.createdAt)}}</p>
                      </p>
                    
            

                      <p class="text-xs font-semibold text-gray-900">
                       Shipping Status: <p class="text-sm">{{ product.deliveryStatus }}</p>
                      </p>
                    
                 
                      <p
                        class="shrink-0 w-20 text-xs font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
                      >
                        <span class="text-sm">
                         Total Amount</span
                        >
                        ${{ product.total }}
                      </p>

                      <p
                        class="shrink-0 w-20 text-xs font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
                      >
                        <span class="text-sm">
                         Payment Status</span
                        >
                        ${{ product.payment_status }}
                      </p>

                      
                   
               

                  
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="px-6 md:px-0 flex justify-center my-6">
    <div
      class="bg-white border md:w-1/2 w-full border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl"
    >
      <p
        class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4"
      >
        <i class="pi pi-shopping-cart" style="font-size: 2.5rem"></i>
      </p>
      <p class="text-gray-500 mt-4 pb-4 text-center">Your Order is Empty</p>
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
  </div>
</template>
<script setup>
const { searchBarEnable } = useSearchBar();

definePageMeta({
  layout: "user",
  middleware: ["user"],
});
const { data: Orders, pending: fetchingCartStatus } = await useHttpGet(
  "http://localhost:5000/api/v1/get-orders"
);
onMounted(async () => {
  searchBarEnable.value.isEnable = false;
});
function formatDateAndTime(isoString) {
  const date = new Date(isoString);

  // Get date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Get time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, '0');

  // Format date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
}

async function onOrderProduct(_id){
await navigateTo('/products/order-'+_id);
}



</script>
