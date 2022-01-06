<template>
  <Swiper>
    <Swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="Swiperitem" />
      </a>
    </Swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    Swiperitem() {
      this.$emit('Swiperitem')
    }
  }
}
</script>

<style scoped>
</style>

