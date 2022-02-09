<template>
  <div>
    <Navbar>
      <div slot="left" class="back" @click="back"><img src="~assets/img/common/back.svg" alt="" /></div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" @click="itemClink(index)" :class="{ active: index === currentIndex }">
          <span>{{ item }}</span>
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/NavBar'
export default {
  components: { Navbar },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClink(index) {
      this.currentIndex = index
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
  /* justify-content: space-around; */
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style> 