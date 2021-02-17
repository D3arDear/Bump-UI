<demo>
默认 collapse 
</demo>
<template>
  <div class="switchSection">
    <Collapse v-model:selected="selectedTab">
      <Collapse-item title="标题1" name="1">内容1</Collapse-item>
      <Collapse-item title="标题2" name="2">内容2</Collapse-item>
      <Collapse-item title="标题3" name="3">内容3</Collapse-item>
    </Collapse>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Collapse from '../lib/Collapse/Collapse.vue'
import CollapseItem from '../lib/Collapse/Collapse.item.vue'
export default {
  components: { Collapse, CollapseItem },
  setup() {
    const selectedTab = ref([]);
    return { selectedTab };
  },
}
</script>

<style lang="scss" scoped>
</style>