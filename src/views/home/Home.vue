<template>
  <div id="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>

    <Scroll class="content">
      <HomeSwiper :banners="banners" />
      <recommendView :recommends="recommends" />
      <feature />
      <TabControl @tabClick="tabClick1" :titles="['流行', '新款', '精选']" class="Tab-control" />
      <Goodlist :goods="showGoods" />
    </Scroll>
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import recommendView from './childComps/HomeRecommendView.vue'
import feature from './childComps/FeatureView.vue'

import Navbar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Goodlist from '../../components/content/goods/Goodslist.vue'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidate, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    recommendView,
    feature,
    Navbar,
    TabControl,
    Goodlist,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop'
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 网络请求
    this.getHomeMultidate()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    // 事件监听
    tabClick1(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    getHomeMultidate() {
      getHomeMultidate().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>
<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}
.Tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  height: 10px;
}
</style>