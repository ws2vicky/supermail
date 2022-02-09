<template>
  <div class="goods">
    <Goodslistitem v-for="(item, index) in goods" :key="index" :gooditem="item"></Goodslistitem>
  </div>
</template>

<script>
import Goodslistitem from './Goodslistitem.vue'

export default {
  components: {
    Goodslistitem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* margin: 2px; */
  padding: 2px;
}
</style>