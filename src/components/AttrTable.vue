<template>
  <div class="tableContainer">
    <h2>{{ title }}</h2>
    <Table
      :data-source="sourceData"
      :striped="false"
      expend-field="description"
    >
      <TableColumn text="参数" field="attr" :width="100"></TableColumn>
      <TableColumn text="说明" field="content" :width="200"> </TableColumn>
      <TableColumn text="类型" field="type" :width="150"> </TableColumn>
      <TableColumn text="可选值" field="option" :width="100"></TableColumn>
      <TableColumn text="默认值" field="default" :width="100"></TableColumn>
      <TableColumn text="必填" field="required" :width="50"></TableColumn>
    </Table>
  </div>
</template>
<script lang="ts">
import Table from "../lib/Table/Table.vue";
import { PropType } from 'vue';
import TableColumn from '../lib/Table/Table.Column.vue';
interface ISourceDataItem {
  attr: string,
  content: string,
  type: string,
  option: string,
  default: string,
  required: string,
  description?: string
}
export default {
  props: {
    title: {
      type: String
    },
    sourceData: {
      type: Array as PropType<ISourceDataItem[]>,
      require: true
    }
  },
  components: {
    Table,
    TableColumn
  },
  setup() {
  }

}
</script>
<style lang="scss" scoped>
@import "../lib/style/theme.scss";
.tableContainer {
  width: 100%;
  h2 {
    margin: 80px 0 40px;
    color: rgba(ContrastText($--color--background), 0.75);
  }
}
</style>