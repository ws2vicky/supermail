<template>
  <div id="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>

    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll" :pullUpLoad="true">
      <HomeSwiper :banners="banners" @Swiperitem="Swiperitem" />
      <recommendView :recommends="recommends" />
      <feature />
      <TabControl @tabClick="tabClick1" :titles="['流行', '新款', '精选']" class="Tab-control" />
      <Goodlist :goods="showGoods" />
    </Scroll>
    <BackTop @click.native="BackTop1" v-show="isShowBackTop" />
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import recommendView from './childComps/HomeRecommendView.vue'
import feature from './childComps/FeatureView.vue'

import Navbar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Goodlist from 'components/content/goods/Goodslist'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidate, getHomeGoods } from 'network/home'
// import { getUsersInfo } from 'network/mock'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    recommendView,
    feature,
    Navbar,
    TabControl,
    Goodlist,
    Scroll,
    BackTop
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
      currentType: 'pop',
      isShowBackTop: false
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

    // getUsersInfo().then(res => {
    //   console.log(res)
    // })
  },
  mounted() {
    // 监听img加载完成
    this.$bus.$on('imgageload', () => {
      console.log(this.$refs.scroll.refresh)
      this.$refs.scroll.refresh()
    })
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
    BackTop1() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentscroll(position) {
      this.isShowBackTop = -position.y > 1000
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

        // this.$refs.scroll.finishPullUp()
      })
    },
    // 监听轮播图加载完成
    Swiperitem() {
      this.$refs.scroll.refresh()
    }
    // loadMore() {
    //   console.log('1111111')
    //   this.getHomeGoods(this.currentType)
    //   this.$refs.scroll.scroll.refresh()
    // }
  }
}
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
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
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 93px);
  margin-top: 44px;

  overflow: hidden; */
}
</style>