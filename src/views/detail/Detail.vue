<template>
  <div id="Detail">
    <!-- <DetailNavBar style="position: fixed; top: 0px" /> -->
    <DetailNavBar class="detail-nav" />
    <Scroll class="content" ref="scroll3">
      <DetailSwiper :topImages="topImages" @Swiperitem1="imageLoad" />
      <DetailBaseInfo :goods="goods" />
      <DetaliShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad11" />
      <DetailParamInfo :paramInfo="paramInfo" />
    </Scroll>
    <BackTop @click.native="BackTop2"></BackTop>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetaliShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'
export default {
  name: 'Detail',
  components: { Scroll, DetailNavBar, DetailSwiper, DetailBaseInfo, DetaliShopInfo, DetailGoodsInfo, DetailParamInfo, BackTop },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  created() {
    this.iid = this.$route.query.iid
    this.getDetail(this.iid)
  },
  methods: {
    getDetail() {
      getDetail(this.iid).then(res => {
        const data = res.result
        console.log(res.result)
        this.topImages = data.itemInfo.topImages

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 店铺数据
        this.shop = new Shop(data.shopInfo)
        // 商品数据
        this.detailInfo = data.detailInfo
        // 商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        console.log(this.goods)
        console.log(this.shop)
        console.log(this.detailInfo)
        console.log(this.paramInfo)
      })
    },
    imageLoad() {
      this.$refs.scroll3.refresh()
    },
    imageLoad11() {
      this.$refs.scroll3.refresh()
    },
    BackTop2() {
      console.log('111')
    }
  }
}
</script>
<style scoped>
#Detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0; */
}
</style>