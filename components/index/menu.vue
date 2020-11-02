<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd
        v-for="(value, index) in menu"
        :key="index"
      >
        <i :class="value.type"/>
        <span class="arrow">{{ value.name }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          type: 'food',
          name: '美食'
        }
      ]
    }
  }
}
</script>

<style>

</style>