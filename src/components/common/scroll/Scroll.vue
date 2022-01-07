<template>
  <div class="wrapper" ref="wrapper">
    <div>
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
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    }
  }
  // this.scroll.on('pullingUp', () => {
  //   this.$emit('pullingUp')
  // })
  // this.scroll.scrollTo(0, 0)
  // this.scroll.on()

  // beforeDestroy() {
  //   //别忘了在页面销毁的时候 移除这个BScroll实例对象不然它会一直在内存中，占用资源
  //   this.scroll = null
  // }

  // finishPullUp() {
  //   this.scroll.finishPullUp()
  // }
}
</script>

<style scoped>
</style>