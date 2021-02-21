<demo>
基本用法
</demo>
<template>
  <div>
    <div style="padding: 20px">
      <Cascader
        :source.sync="source"
        popover-height="200px"
        :selected.sync="selected"
        :load-data="loadData"
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
import { ref } from 'vue';
function ajax(parentId = 0) {
  return new Promise((success, fail) => {
    setTimeout(() => {
      let result = db.filter((item) => item.parent_id == parentId)
      result.forEach(node => {
        if (db.filter(item => item.parent_id === node.id).length > 0) {
          node.isLeaf = false
        } else {
          node.isLeaf = true
        }
      })
      success(result)
    }, 3000)
  })
}
export default {
  name: "demo",
  components: {
    "Button": Button,
    "Cascader": Cascader,
    "Popover": Popover,
  },
  setup() {
    const selected = ref([])
    const source = ref([])
    ajax(0).then(result => {
      source.value = result
    })
    const loadData = ({ id }, updateSource) => {
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