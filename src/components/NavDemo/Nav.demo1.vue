<demo>
Nav 的基本用法
</demo>
<template>
  <div>
    <Nav v-model:selected="selected">
      <NavItem name="home">首页</NavItem>
      <SubNav name="about">
        <template v-slot:title>关于</template>
        <NavItem name="culture">企业文化</NavItem>
        <NavItem name="developer">开发团队</NavItem>
        <SubNav name="contacts">
          <template slot="title">联系方式</template>
          <NavItem name="wechat">微信</NavItem>
          <NavItem name="qq">QQ</NavItem>
          <SubNav name="phone">
            <template slot="phone">电话</template>
            <NavItem name="telephone">固话</NavItem>
            <NavItem name="mobilePhone">手机</NavItem>
          </SubNav>
        </SubNav>
      </SubNav>
    </Nav>
  </div>
</template>
<script lang="ts">
import Nav from '../../lib/Nav/Nav.vue'
import NavItem from '../../lib/Nav/Nav-Item.vue'
import SubNav from '../../lib/Nav/Sub-Nav.vue'
import { ref } from 'vue';
export default {
  components: {
    Nav, NavItem, SubNav
  },
  setup() {
    const selected = ref([])
    return {
      selected
    };
  }
}
</script>