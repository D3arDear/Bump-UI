<template>
  <div>
    <slot></slot>
  </div>
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
    },
    value: {
      type: String
    }
  }
};
</script>