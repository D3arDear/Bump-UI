<demo>
基本布局组件
</demo>
<template>
  <Layout class="layout-out" :style="{ height: 'calc( 100vh - 50px )' }">
    <Sider class="sider">sider</Sider>
    <Layout class="layout">
      <Header class="header">header</Header>
      <Content class="content">content</Content>
      <Footer class="footer">footer</Footer>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '../lib/Layout/Layout.vue'
import Sider from '../lib/Layout/Sider.vue'
import Header from '../lib/Layout/Header.vue'
import Content from '../lib/Layout/Content.vue'
import Footer from '../lib/Layout/Footer.vue'
</script>

<style lang="scss">
.layout-out {
  overflow: hidden;
}
.sider,
.header,
.content,
.footer {
  background: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
}
</style>