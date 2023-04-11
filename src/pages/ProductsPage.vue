<template>
  <q-page class="q-ml-md">
    <img src="../assets/5594188.png" alt="" class="bannerProduct q-mt-md" />
    <div class="q-py-md" style="max-width: 700px">
      <q-input
        outlined
        v-model="input"
        label="Buscar produtos"
        @keyup.enter="search()"
      ></q-input>
    </div>
    <q-list style="max-width: 1050px">
      <q-item-label header class="text-h5"> Produtos </q-item-label>

      <div class="row" style="max-width: 1050px">
        <PageItem
          v-for="(item, index) in pageItems"
          :key="index"
          :item="item"
          class="flex"
        />
      </div>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import PageItem from 'src/components/PageItem/PageItem.vue'
import { IProduct } from 'src/types/IProduct'
import { useProductsStore } from '../stores/ProductsStore'

defineProps({
  pageItems: Array as PropType<IProduct[]>,
})

const productStore = useProductsStore()
const input = ref('')

function search() {
  productStore.searchProduct(input.value)
}
</script>
<style scoped>
.bannerProduct {
  width: 980px;
}
</style>
