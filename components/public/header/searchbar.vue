<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
      :span="3"
      class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
      </el-col>
      <el-col
      :span="15"
      class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点"></el-input>
          <button class="el-button el-button-primary"><i class="el-icon-search"></i></button>
          <dl class="hotPlace">
            <dt>热门搜索</dt>
            <dd>火锅</dd>
            <dd>臭鳜鱼</dd>
            <dd>罍街</dd>
            <dd>黄山烧饼</dd>
          </dl>
          <!-- <dl class="searchList">
            <dd>火锅</dd>
          </dl> -->
        </div>
        <p class="suggest">
          <a href="">包公园</a>
          <a href="">逍遥津</a>
          <a href="">李鸿章故居</a>
        </p>
      </el-col>
      <el-col
      :span="6"
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

}
</script>

<style>

</style>
