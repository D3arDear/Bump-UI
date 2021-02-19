<demo>
设置空隙
</demo>
<template>
  <Row class="demoRow" gutter="10">
    <Col span="8">
      <div class="demoCol">8</div>
    </Col>
    <Col span="8" offset="8">
      <div class="demoCol">8</div>
    </Col>
  </Row>
  <Row class="demoRow" gutter="10">
    <Col span="6" offset="6">
      <div class="demoCol">6</div>
    </Col>
    <Col span="6" offset="6">
      <div class="demoCol">6</div>
    </Col>
  </Row>
  <Row class="demoRow" gutter="10">
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4" offset="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4" offset="8">
      <div class="demoCol">4</div>
    </Col>
  </Row>
  <Row class="demoRow" gutter="10">
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2" offset="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2" offset="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2" offset="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2" offset="2">
      <div class="demoCol">2</div>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import Row from '../lib/Grid/Row.vue'
import Col from '../lib/Grid/Col.vue'
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