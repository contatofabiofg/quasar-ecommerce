<template>
  <q-list>
    <q-item-label header class="row justify-between">
      <span class="text-h5">Carrinho</span>
      <div class="relative-position" @click="$emit('close')">
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
          text-color="white"
          class="absolute-top-right bg-red-5"
          >{{ cartStore.state.length }}</q-avatar
        >
      </div>
    </q-item-label>

    <CartItem
      v-for="(item, index) in cartItens"
      :key="index"
      :cartItem="{ ...item, index }"
    />

    <div class="total q-pa-lg shadow-1 absolute">
      <span class="text-h5"
        >Total: R${{ total().toFixed(2).replace('.', ',') }}</span
      >
    </div>
  </q-list>
</template>
<script setup lang="ts">
import { ComputedRef, computed, ref } from 'vue'
import CartItem from 'src/components/CartItem/CartItem.vue'
import { ICartItem } from 'src/types/ICartItem'
import { useCartStore } from 'src/stores/cartStore'

const cartStore = useCartStore()
defineEmits(['close'])

const cartItens: ComputedRef<ICartItem[]> = computed(() => {
  return cartStore.state as ICartItem[]
})

function total() {
  return cartItens.value.reduce((total, item) => {
    let parcial = item.price * item.qtd

    return total + parcial
  }, 0)
}
</script>
<style scoped>
.total {
  right: 20px;
  bottom: 20px;
}
</style>
