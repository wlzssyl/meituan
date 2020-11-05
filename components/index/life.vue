<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"/>
      </el-col>
      <el-col :span="6">
        3
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">1</el-col>
      <el-col :span="7">2</el-col>
      <el-col :span="4">3</el-col>
      <el-col :span="6">4</el-col>
    </el-row>
  </div>
</template>

<script>
import Slider from './slider'

export default {
  components: {
    Slider
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/life.scss";
</style>
