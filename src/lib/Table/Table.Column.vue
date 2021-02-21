<template>
  <div></div>
</template>
<script>
export default {
  name: "BUI-TableColumn", 
  props: {
    text: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    width: {
      type: Number
    }
  }
};
</script>
<style lang="scss" scoped>
</style>