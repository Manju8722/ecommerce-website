<template>
  <div class="md:mx-6 mx-2 mb-4">
    <Paginator
      :rows="props.rows"
      :totalRecords="props.totalRecords"
      :rowsPerPageOptions="[5,10, 20, 30]"
      @page="updatePage($event)"
    ></Paginator>
  </div>
</template>
<script setup>
const props = defineProps({
  rows: {
    type: Number,
  },
  totalRecords: {
    type: Number,
  },
});

const emit = defineEmits(["paginationChanges"]);
function updatePage(event) {
  emit("paginationChanges", {...event});
}
</script>
