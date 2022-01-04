<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: 3
    })
    // this.scroll.scrollTo(0, 0)
    // this.scroll.on()
  },
  // beforeDestroy() {
  //   //别忘了在页面销毁的时候 移除这个BScroll实例对象不然它会一直在内存中，占用资源
  //   this.scroll = null
  // }
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
</style>