<template>
  <div class="Tabs-demo">
    <h1>Tabs 组件</h1>
    <div class="Tabs-demo__section">
      <h2>基本用法</h2>
      <section>
        <Tabs v-model:selected="tabsValue">
          <Tab title="导航1">
            <div>
              这这里有很长一段内容这里有很长一段内容这里有很长一段内容这里有很长一段内容里有很长一段内容
            </div>
            <p>
              这里有很长的正文这里有很长的正文这里有很长的正文这里有很长的正文这里有很长的正文这里有很长的正文这里有很长的正文这里有很长的正文这里有很长的正文
            </p>
            <div>内容1</div>
          </Tab>
          <Tab title="不可用" disabled>
            <div>内容2</div>
            <div>内容2</div>
            <div>内容2</div>
            <div>内容2</div>
          </Tab>
          <Tab title="导航2">
            <div>内容2</div>
            <div>内容2</div>
            <div>内容2</div>
            <div>内容2</div>
          </Tab>
        </Tabs>
      </section>
    </div>
  </div>
</template>

<script>
import Tabs from '../components/lib/Tabs/Tabs.vue'
import Tab from '../components/lib/Tabs/Tab.vue'
import { ref } from 'vue';
export default {
  name: "TabsDemo",
  components:{
    Tabs,
    Tab
  },
  setup(){
    const tabsValue = ref('导航1')
    return {tabsValue}
  }
};
</script>

<style lang="scss" scope>
.Tabs-demo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
    }
  }
}
</style>
