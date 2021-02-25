<demo>
基本用法
</demo>
<template>
  <div>
    <div style="padding: 20px">
      <Cascader
        v-model:source="source"
        popover-height="200px"
        v-model:selected="selected"
        :load-data="loadData"
        inputLabel="城市"
      ></Cascader>
    </div>
    {{ selected.map((item) => item.name) }}
  </div>
</template>
<script lang="ts">
import Button from "../../lib/Button/Button.vue";
import Cascader from "../../lib/Cascader/Cascader.vue";
import db from './db.js'
import Popover from '../../lib/Popover/Popover.vue'
import { onMounted, ref } from 'vue';
function ajax(parentId = 0) {
  return new Promise((success, fail) => {
    setTimeout(() => {
      let result = db.filter((item) => item.parent_id === parentId)
      // 找出顶级
      result.forEach(node => {
        // 找出顶级的子集
        if (db.filter(item => item.parent_id === node.id).length > 0) {
          // 发现该级还有子集，那么该级就不是叶子节点
          node.isLeaf = false
        } else {
          // 否则就是叶子节点
          node.isLeaf = true
        }
      })
      success(result)
    }, 1000)
    // 模拟发请求获取信息的环境
  })
}
export default {
  name: "demo",
  components: {
    Button,
    Cascader,
    Popover,
  },
  setup() {
    const selected = ref([])
    const source = ref([])
    onMounted(() => {
      ajax(0).then(result => {
        source.value = result
      })
    })
    const loadData = ({ id }, updateSource) => {
      // 调用请求方法再找下一级
      ajax(id).then(result => {
        console.log(result)
        updateSource(result)
      })
    }
    return { selected, source, loadData }
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  max-width: 100%;
}
html {
  --font-size: 14px;
}
body {
  font-size: var(--font-size);
}
</style>