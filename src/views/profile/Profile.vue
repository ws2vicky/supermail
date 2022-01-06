<template>
  <div>
    <BackTop class="content" :probeType="0"></BackTop>
  </div>
</template>

<script>
import BackTop from 'components/content/backTop/BackTop'

export default {
  name: 'Profile',
  components: {
    BackTop
  }
}
</script>

<style scoped>
.content {
  height: 300px;
}
</style>
