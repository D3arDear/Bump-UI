<template>
  <div class="Tabs-demo">
    <h1>Tabs 组件</h1>
    <div class="Tabs-demo__section">
      <h2>基本用法</h2>
      <section>
        <Tabs>
          <div>内容1</div>
          <Tab title="导航1">内容1</Tab>
          <Tab title="导航2">内容2</Tab>
        </Tabs>
      </section>
    </div>
  </div>
</template>

<script>
import Tabs from '../components/lib/Tabs/Tabs.vue'
import Tab from '../components/lib/Tabs/Tab.vue'
export default {
  name: "TabsDemo",
  components:{
    Tabs,
    Tab
  }
};
</script>

<style lang="scss" scope>
.Tabs-demo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .button {
        margin: 5px;
      }
    }
  }
}
</style>
