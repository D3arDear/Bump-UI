<demo>
图标按钮
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button
        class="button"
        :linearColor="{
          colors: ['#FE6B8B', '#FF8E53'],
          angle: '45',
        }"
        :icon="{ name: 'down', right: false }"
      >
        图标按钮
      </Button>
      <Button
        class="button"
        :linearColor="{
          colors: ['#FE6B8B', '#FF8E53'],
          angle: '45',
        }"
        :icon="{ name: 'setting', right: false }"
      />
      <Button class="button" :icon="{ name: 'down', right: false }" rounded />
      <Button class="button" :icon="{ name: 'setting', right: true }" rounded>
        设置
      </Button>
      <Button
        class="button"
        size="medium"
        :icon="{ name: 'setting', right: false }"
        rounded
      >
        设置
      </Button>
      <Button
        class="button"
        size="small"
        :icon="{ name: 'setting', right: true }"
        rounded
      >
        设置
      </Button>
      <Button
        class="button"
        size="mini"
        :icon="{ name: 'setting', right: false }"
        rounded
      >
        设置
      </Button>
    </section>
  </div>
</template>
<script lang="ts">
import Icon from '../lib/Icon.vue'
import Button from "../lib/Button/Button.vue";
export default {
  components: {
    Button,
    Icon
  },
  setup() {
    const onClick = () => {
      console.log("hi");
    };
    return { onClick };
  },
};
</script>
<style lang="scss" scoped>
@import "./Button.demo.scss";
</style>