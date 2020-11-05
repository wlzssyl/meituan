<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        <elife/>
      </el-col>
    </el-row>
    <el-row :span="24">
      3
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Elife from '@/components/index/life'

export default {
  components: {
    Emenu,
    Elife
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
