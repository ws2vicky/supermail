<template>
  <div id="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
    <HomeSwiper :banners="banners" />
    <recommendView :recommends="recommends" />
    <feature />
  </div>
</template>
<script>
import Navbar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import recommendView from './childComps/HomeRecommendView.vue'
import feature from './childComps/FeatureView.vue'
import { getHomeMultidate } from 'network/home'

export default {
  name: 'Home',
  components: {
    Navbar,
    HomeSwiper,
    recommendView,
    feature
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
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>
