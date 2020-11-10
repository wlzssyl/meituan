<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"
        ></a>
        <span class="login">
          <em class="bold">已有美团账号?</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small"
              class="button"
            >登录</el-button>
          </a>
        </span>
      </header>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'blank'
}
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
