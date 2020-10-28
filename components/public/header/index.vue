<template>
  <el-row
  class="m-header"
  :gutter="0">
    <el-col :span="4"><geo/></el-col>
    <el-col :span="6"><user/></el-col>
    <el-col :span="14"><navbar/></el-col>
  </el-row>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'
import Navbar from './nav.vue'

export default {
  components: {
    Geo,
    User,
    Navbar
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import "@/assets/css/public/header.scss";
</style>
