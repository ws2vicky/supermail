<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" @load="Swiperitem1" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  components: { Swiper, SwiperItem },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad1: false
    }
  },
  methods: {
    Swiperitem1() {
      this.$emit('Swiperitem1')
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>