<template>
  <q-layout view="hHr LpR lFr">
    <q-header>
      <q-toolbar class="bg-blue-grey-7">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Ecommerce </q-toolbar-title>

        <div class="relative-position" @click="cartOpen = !cartOpen">
          <q-btn
            flat
            dense
            round
            icon="shopping_cart"
            aria-label="Shopping Cart"
          />
          <q-avatar
            v-if="cartStore.state.length > 0"
            size="17px"
            class="absolute-top-right bg-red-5"
            >{{ cartStore.state.length }}</q-avatar
          >
        </div>
      </q-toolbar>
    </q-header>

    <!-- MENU -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <MenuArea
          v-for="menuItem in Menus"
          :key="menuItem.title"
          :menuItem="menuItem"
        />
      </q-list>
    </q-drawer>

    <!-- CART -->
    <q-drawer side="right" v-model="cartOpen" bordered :width="500">
      <CartArea />
    </q-drawer>

    <q-page-container>
      <ProductsPage :pageItems="productsStore.getProducts" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MenuArea from 'src/components/MenuArea/MenuArea.vue'
import { IMenuItem } from 'src/types/IMenuItem'
import CartArea from 'src/components/CartArea/CartArea.vue'
import ProductsPage from 'src/pages/ProductsPage.vue'
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/ProductsStore'
//import { IPageItem } from 'src/components/PageItem/IPageItem'

const cartOpen = ref(false)
const leftDrawerOpen = ref(false)
const cartStore = useCartStore()
const productsStore = useProductsStore()
//const products: Ref<IPageItem[]> = ref([{}] as IPageItem[])

productsStore.syncProducts()

const Menus: IMenuItem[] = [
  {
    title: 'Categorias',
    link: '',
    linkFunction: productsStore.changeCategory,
    children: [
      {
        title: 'Todas',
        link: 'all',
        linkFunction: () => {
          return null
        },
      },
      {
        title: 'Masculina',
        link: "men's clothing",
        linkFunction: () => {
          return null
        },
      },
      {
        title: 'Femininas',
        link: "women's clothing",
        linkFunction: () => {
          return null
        },
      },
      {
        title: 'Eletrônicos',
        link: 'electronics',
        linkFunction: () => {
          return null
        },
      },
      {
        title: 'Acessórios',
        link: 'jewelery',
        linkFunction: () => {
          return null
        },
      },
    ],
  },
]

watch(cartStore, () => {
  console.log(cartStore)
  if (cartStore.cart.length === 1) {
    cartOpen.value = true
  } else if (cartStore.cart.length === 0) {
    cartOpen.value = false
  }
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
