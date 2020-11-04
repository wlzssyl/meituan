<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd
        v-for="(value, index) in menu"
        :key="index"
      >
        <i :class="value.type"/>
        {{ value.name }}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail">
      <template
        v-for="(item, index) in curdetail"
      >
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v"
        >{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点', '饮品', '小吃', '自助餐']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星级',
              child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            }
          ]
        }
      ]
    }
  },
  computed: {
    curdetail () {
      return []
    }
  }
}
</script>

<style>

</style>
