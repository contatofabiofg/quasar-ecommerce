<template>
  <div class="bg-grey-1 q-ma-sm q-pa-md shadow-1 relative-position">
    <q-item style="width: 200px">
      <q-item-section class="column items-center relative-position">
        <div
          class="pageImage row items-center justify-center"
          :style="'background-image: url(' + item?.image + ');'"
        ></div>
        <q-item-label
          class="q-my-xs text-center ellipsis"
          :title="item?.title"
          >{{ item?.title }}</q-item-label
        >
        <q-item-label
          class="q-my-xs ellipsis"
          :title="item?.description"
          caption
          >{{ item?.description }}</q-item-label
        >
        <div v-if="item && item.discount" class="row">
          <q-item-label
            class="q-my-xs text-blue-grey-8 text-caption text-strike q-mr-sm"
            >R$ {{ item?.price?.toFixed(2).replace('.', ',') }}</q-item-label
          >
          <q-item-label class="q-my-xs text-blue-grey-8 text-h6"
            >R$
            {{ priceWithDiscount.toFixed(2).replace('.', ',') }}</q-item-label
          >
        </div>
        <q-item-label v-else class="q-my-xs text-blue-grey-8 text-h6"
          >R$ {{ item?.price?.toFixed(2).replace('.', ',') }}</q-item-label
        >
        <q-btn outline class="q-my-xs" @click="openModal()">VER DETALHES</q-btn>
      </q-item-section>
    </q-item>

    <div
      v-if="item && item.discount"
      class="absolute-top-right bookmark row items-center justify-center"
    >
      <div class="text-grey-1 text-bold text-caption">-10%</div>
    </div>

    <!-- MODAL -->
    <q-dialog v-model="modal">
      <q-card class="row q-pa-sm items-start">
        <q-card-section class="row full-width justify-end q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="row full-width">
          <div class="col-4 q-my-auto q-mx-md">
            <VueMagnifier :src="item!.image" width="300" mgShape="square" />
          </div>
          <div class="col-7">
            <q-card-section>
              <div class="text-h6">{{ item?.title }}</div>
            </q-card-section>

            <q-card-section
              class="q-pt-none"
              :class="descriptionModalOpen ? undefined : 'ellipsis'"
            >
              {{ item?.description }}

              <q-card-section class="q-pa-none">
                <a
                  class="cursor-pointer text-primary"
                  v-if="descriptionModalOpen"
                  @click="descriptionModalOpen = false"
                  >Ver menos</a
                >
                <a
                  v-else
                  class="cursor-pointer text-primary"
                  @click="descriptionModalOpen = true"
                  >Ver mais</a
                >
              </q-card-section>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Cor &#9632; &#9632; &#9632; &#9632;
            </q-card-section>

            <div v-if="item && item.discount" class="row justify-center">
              <q-item-label
                class="q-my-xs text-blue-grey-8 text-caption text-strike q-mr-sm"
                >R$
                {{ item?.price?.toFixed(2).replace('.', ',') }}</q-item-label
              >
              <q-item-label class="q-my-xs text-blue-grey-8 text-h4"
                >R$
                {{
                  priceWithDiscount.toFixed(2).replace('.', ',')
                }}</q-item-label
              >
            </div>
            <q-item-label v-else class="q-my-xs text-blue-grey-8 text-h6"
              >R$ {{ item?.price?.toFixed(2).replace('.', ',') }}</q-item-label
            >
            <div class="row justify-center">
              <q-btn
                color="black"
                class="justify-center full-width q-my-md"
                @click="addToCart()"
                >Adicionar ao Carrinho</q-btn
              >
            </div>
          </div>
        </q-card-section>
      </q-card></q-dialog
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType } from 'vue'
import { useCartStore } from 'src/stores/cartStore'
import { IProduct } from 'src/types/IProduct'
import VueMagnifier from '@websitebeaver/vue-magnifier'
import '@websitebeaver/vue-magnifier/styles.css'

let props = defineProps({
  item: Object as PropType<IProduct>,
})

const itemToCart = ref({ ...props.item, qtd: 1, index: 0 })

watch(
  () => props.item,
  () => {
    itemToCart.value = { ...props.item, qtd: 1, index: 0 }
  }
)

const store = useCartStore()
const rate = 10
const modal = ref(false)
const descriptionModalOpen = ref(false)
const priceWithDiscount = computed(() => {
  return (
    (props.item?.price as number) - ((props.item?.price as number) * rate) / 100
  )
})

function addToCart() {
  modal.value = false
  if (itemToCart.value.discount) {
    itemToCart.value.price = priceWithDiscount.value
  }
  store.add(itemToCart.value as IProduct)
}

function openModal() {
  modal.value = true
}
</script>
<style scoped>
.pageImage {
  width: 100px;
  height: 100px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.modalImage {
  width: 200px;
  height: 200px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.bookmark {
  background-image: url('../../assets/bookmark.png');
  background-position: center;
  background-size: cover;
  width: 50px;
  height: 50px;
}
</style>
