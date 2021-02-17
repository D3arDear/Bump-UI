<demo>
默认 collapse 
</demo>
<template>
  <div class="switchSection">
    <Collapse :selected="selectedTab" @update:selected="change">
      <Collapse-item title="标题1" name="1">内容1</Collapse-item>
      <Collapse-item title="标题2" name="2">内容2</Collapse-item>
      <Collapse-item title="标题3" name="3">内容3</Collapse-item>
    </Collapse>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue';
import Collapse from '../lib/Collapse/Collapse.vue'
import CollapseItem from '../lib/Collapse/Collapse.item.vue'
export default {
  components: { Collapse, CollapseItem },
  setup() {
    const selectedTab = ref([]);
    const change = (event) => {
      console.log('event', event)
      console.log('外面改之前', selectedTab)
      selectedTab.value = event
      console.log('外面', selectedTab)
    }
    return { selectedTab, change };
  },
}
</script>

<style lang="scss" scoped>
</style>