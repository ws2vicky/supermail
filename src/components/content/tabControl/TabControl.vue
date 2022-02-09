<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" @click="itemClink(index)" :key="index" class="tab-control-item" :class="{ active: index === currentIndex }">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClink(index) {
      // this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style scoped>
.tab-control {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
  /* padding-bottom: 5px; */
}
span {
  padding: 5px;
}
</style>