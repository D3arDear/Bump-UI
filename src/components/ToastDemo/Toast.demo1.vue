<demo>
默认 Toast 开关
</demo>
<template>
  <div class="Toast-section">
    <div class="Toast-section-item">
      <Button @click="openTop">上面</Button>
      <Toast v-if="top" :closeButton="{ text: '关闭', callback: closeTop }">
        默认上面
      </Toast>
    </div>
    <div class="Toast-section-item">
      <Button @click="openBottom">下面</Button>
      <Toast
        position="bottom"
        v-if="bottom"
        :closeButton="{ text: '×', callback: closeBottom }"
      >
        通过 position 决定 toast 位置
      </Toast>
    </div>
    <div class="Toast-section-item">
      <Button @click="openMiddle">中间</Button>
      <Toast
        position="middle"
        v-if="middle"
        :closeButton="{ text: '关闭', callback: closeMiddle }"
      >
        通过 closeButton 的 callback 控制关闭回调
      </Toast>
    </div>
    <div class="Toast-section-item">
      <Button @click="openBottom2">自动关闭</Button>
      <Toast
        position="bottom"
        v-if="bottom2"
        :autoClose="5"
        :closeButton="{ text: '关闭', callback: closeBottom2 }"
      >
        也可以添加一个自动关闭时间 autoClose 添加一个自动关闭时间(单位：秒)
        默认为三秒
      </Toast>
    </div>
  </div>
</template>


<script lang="ts">
import Toast from "../lib/Toast/Toast.vue";
import Button from '../lib/Button/Button.vue'
import { ref } from 'vue';
export default {
  components: { Toast, Button },
  setup() {
    const top = ref(false)
    const middle = ref(false)
    const bottom = ref(false)
    const bottom2 = ref(false)
    const openTop = () => {
      top.value = true
    }
    const openBottom = () => {
      bottom.value = true
    }
    const openBottom2 = () => {
      bottom2.value = true
    }
    const openMiddle = () => {
      middle.value = true
    }
    const closeTop = () => {
      top.value = false;
    }
    const closeBottom = () => {
      bottom.value = false;
    }
    const closeMiddle = () => {
      middle.value = false;
    }
    const closeBottom2 = () => {
      bottom2.value = false;
    }
    return {
      top, middle, bottom, openTop, openBottom, openMiddle, closeTop, closeBottom, closeMiddle, bottom2, openBottom2, closeBottom2
    }
  }
}
</script>

<style lang="scss" scoped>
.Toast-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  &-item {
    margin: 10px;
  }
}
</style>