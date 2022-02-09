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
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    Swiperitem() {
      if (!this.isLoad) {
        this.$emit('Swiperitem')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
</style>

