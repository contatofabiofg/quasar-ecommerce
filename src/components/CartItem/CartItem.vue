<template>
  <div class="row bg-grey-1 q-ma-sm shadow-1">
    <q-item class="col-9">
      <q-item-section side>
        {{ (props.cartItem?.index as number) + 1 }}
      </q-item-section>
      <q-item-section v-if="props.cartItem?.image" avatar>
        <img :src="props.cartItem?.image" alt="" class="cartImage" />
      </q-item-section>

      <q-item-section>
        <q-item-label :title="props.cartItem?.title">{{
          props.cartItem?.title
        }}</q-item-label>
        <q-item-label :title="props.cartItem?.description" caption>{{
          (props.cartItem?.description as string).slice(0, 35) + '(...)'
        }}</q-item-label>
        <q-item-label class="text-blue-grey-8"
          >R$
          {{ props.cartItem?.price.toFixed(2).replace('.', ',') }}</q-item-label
        >
      </q-item-section>
    </q-item>
    <q-item class="col-2 items-center">
      <q-btn
        flat
        dense
        round
        icon="remove_circle_outline"
        @click="store.decrement(props.cartItem?.index as number)"
      >
      </q-btn>
      <span class="text-h6 q-mx-sm">{{ props.cartItem?.qtd }}</span>
      <q-btn
        flat
        dense
        round
        icon="add_circle_outline"
        @click="store.increment(props.cartItem?.index as number)"
      >
      </q-btn>
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useCartStore } from 'src/stores/cartStore'
import { ICartItem } from '../../types/ICartItem'

// withDefaults(
//   defineProps({
//     type: Object as PropType<ICartItem>,
//   }),
//   {
//     description: '',
//     link: '#',
//     icon: '', //inserir imagem padrão
//   }
// )

const props = defineProps({
  cartItem: Object as PropType<ICartItem>,
})

const store = useCartStore()
</script>

<style scoped>
.cartImage {
  width: 35px;
}
</style>
