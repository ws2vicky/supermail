<template>
  <div class="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
    <HomeSwiper :banners="banners" />
    <recommendView :recommends="recommends" />
  </div>
</template>
<script>
import Navbar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import recommendView from './childComps/HomeRecommendView.vue'
import { getHomeMultidate } from 'network/home'

export default {
  name: 'Home',
  components: {
    Navbar,
    HomeSwiper,
    recommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidate().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
}
</style>
