<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
      :span="4"
      class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
      </el-col>
      <el-col
      :span="16"
      class="center">
        <div class="wrapper">
          <el-input
          v-model="search"
          placeholder="搜索商家或地点"
          @focus="focus"
          @blur="blur"
          @input="input"></el-input>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl
          v-if="isHotPlace"
          class="hotPlace">
            <dt>热门搜索</dt>
            <dd
            v-for="(value, index) in hotPlace"
            :key="index">{{ value }}</dd>
          </dl>
          <dl
          v-if="isSearchList"
          class="searchList">
            <dd
            v-for="(value, index) in searchList"
            :key="index">{{ value }}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="">包公园</a>
          <a href="">逍遥津</a>
          <a href="">李鸿章故居</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/takeout" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/takeout" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/takeout" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/takeout" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/takeout" class="business">商家入驻</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/takeout" class="takeout">美团公益</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
      :span="4"
      class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFocus: false,
      search: '',
      hotPlace: ['罍街', '庐州太太', '臭鳜鱼', '黄山烧饼'],
      searchList: ['冒菜', '火锅']
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      const self = this
      setTimeout(() => {
        self.isFocus = false
      }, 180)
    },
    input () {
      console.log('input事件')
    }
  }
}
</script>

<style lang="scss">
  // @import "@/assets/css/public/header/search.scss";
</style>
