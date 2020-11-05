<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="leave"
    >
      <dt>全部分类</dt>
      <dd
        v-for="(value, index) in menu"
        :key="index"
        @mouseenter="enter"
      >
        <i :class="value.type"/>
        {{ value.name }}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div
      class="detail"
      v-if="kind"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave"
    >
      <template
        v-for="(item, index) in curdetail.child"
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
      return this.menu.filter((item) => {
        return item.type === this.kind
      })[0]
    }
  },
  methods: {
    leave () {
      const self = this
      self._timer = setTimeout(() => {
        self.kind = ''
      }, 150)
    },
    enter (event) {
      this.kind = event.target.querySelector('i').className
    },
    detailEnter () {
      clearTimeout(this._timer)
    },
    detailLeave () {
      this.kind = ''
    }
  }
}
</script>

<style>

</style>
