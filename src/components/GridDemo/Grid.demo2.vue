<demo>
gutter 属性
</demo>
<template>
  <Row class="demorow" gutter="10">
    <Col span="8">
      <div class="democol">8</div>
    </Col>
    <Col span="8">
      <div class="democol">8</div>
    </Col>
    <Col span="8">
      <div class="democol">8</div>
    </Col>
  </Row>
  <Row class="demorow" gutter="10">
    <Col span="6">
      <div class="democol">6</div>
    </Col>
    <Col span="6">
      <div class="democol">6</div>
    </Col>
    <Col span="6">
      <div class="democol">6</div>
    </Col>
    <Col span="6">
      <div class="democol">6</div>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import Row from '../../lib/Grid/Row.vue'
import Col from '../../lib/Grid/Col.vue'
</script>

<style lang="scss">
.demorow {
  margin: 10px 0;
}
.democol {
  height: 50px;
  border: 1px solid #eee;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>