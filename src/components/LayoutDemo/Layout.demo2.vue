<demo>
没有 Aside 的布局
</demo>
<template>
  <Layout class="layout" :style="{ height: 'calc( 100vh - 50px )' }">
    <Header class="header">header</Header>
    <Content class="content">content</Content>
    <Footer class="footer">footer</Footer>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '../../lib/Layout/Layout.vue'
import Header from '../../lib/Layout/Header.vue'
import Content from '../../lib/Layout/Content.vue'
import Footer from '../../lib/Layout/Footer.vue'
</script>

<style lang="scss">
.layout {
  background: none;
}
.header,
.content,
.footer {
  background: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
}
</style>