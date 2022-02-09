<template>
  <div id="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
    <TabControl @tabClick="tabClick1" ref="TabControl1" :titles="['流行', '新款', '精选']" class="TabControl" v-show="isTabFixed" />
    <Scroll class="content" ref="scroll" @pullingUp="loadMore" :probeType="3" @scroll="contentscroll" :pullUpLoad="true">
      <HomeSwiper :banners="banners" @Swiperitem="Swiperitem" />
      <recommendView :recommends="recommends" />
      <feature />
      <TabControl @tabClick="tabClick1" ref="TabControl2" :titles="['流行', '新款', '精选']" class="Tab-control" :class="{ fixed: isTabFixed }" />
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
import { debounce } from 'common/utils'
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // this.$refs.scroll.startTimer()
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    // this.$refs.scroll.stopTimer()
    console.log()
  },
  created() {
    // 网络请求
    this.getHomeMultidate()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 监听img加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$off('imgageload').$on('imgageload', () => {
      refresh()
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
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },
    BackTop1() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentscroll(position) {
      this.isShowBackTop = -position.y > 1000
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // 网络请求方法
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
        this.$refs.scroll.finishPullUp()
      })
    },
    // 监听轮播图加载完成
    Swiperitem() {
      // this.$refs.scroll.refresh()
      // const refresh = debounce(this.$refs.scroll.refresh)
      // refresh()
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
      console.log(this.tabOffsetTop)
    },
    loadMore() {
      var a = {}
      console.log('111', a)
      this.getHomeGoods(this.currentType)
    }
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
  /* 
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9; */
}
/* .Tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 93px);
  margin-top: 44px;

  overflow: hidden; */
}
/* .fixed {
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
  z-index: 9;
} */
.TabControl {
  position: relative;
  z-index: 9;
}
</style>