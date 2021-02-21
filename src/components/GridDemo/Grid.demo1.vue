<demo>
基本 Grid 布局
</demo>
<template>
  <Row class="demoRow">
    <Col span="8">
      <div class="demoCol">8</div>
    </Col>
    <Col span="8">
      <div class="demoCol">8</div>
    </Col>
    <Col span="8">
      <div class="demoCol">8</div>
    </Col>
  </Row>
  <Row class="demoRow">
    <Col span="6">
      <div class="demoCol">6</div>
    </Col>
    <Col span="6">
      <div class="demoCol">6</div>
    </Col>
    <Col span="6">
      <div class="demoCol">6</div>
    </Col>
    <Col span="6">
      <div class="demoCol">6</div>
    </Col>
  </Row>
  <Row class="demoRow">
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
    <Col span="4">
      <div class="demoCol">4</div>
    </Col>
  </Row>
  <Row class="demoRow">
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
    <Col span="2">
      <div class="demoCol">2</div>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import Row from '../../lib/Grid/Row.vue'
import Col from '../../lib/Grid/Col.vue'
</script>

<style lang="scss">
.demoRow {
  margin: 10px 0;
}
.demoCol {
  height: 50px;
  border: 1px solid #eee;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>