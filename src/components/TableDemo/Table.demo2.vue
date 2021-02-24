<demo>
紧凑型样式
</demo>
<template>
  <div>
    <Table
      :data-source="sourceData"
      bordered
      v-model:selectedItems="selected"
      @update:orderBy="changeOrderBy"
      :orderBy="orderBy"
      :loading="loading"
      :height="300"
      expend-field=""
      :striped="false"
      checkable
      compact
    >
      <TableColumn text="id" field="id" :width="50"></TableColumn>
      <TableColumn text="姓名" field="name" :width="100">
        <template v-slot="props">
          <a>{{ props.name }}</a>
        </template>
      </TableColumn>
      <TableColumn text="分数" field="score" :width="100"></TableColumn>
      <TableColumn text="排名" field="rank" :width="100"></TableColumn>
    </Table>
  </div>
</template>
<script lang="ts">
import Table from "../../lib/Table/Table.vue";
import { reactive, ref } from 'vue';
import TableColumn from '../../lib/Table/Table.Column.vue';
export default {
  components: {
    Table,
    TableColumn
  },
  setup() {
    const error = ref('')
    const selected = ref([])
    const loading = ref(false)
    const orderBy = reactive({
      score: "desc",
      rank: "desc"
    })
    const sourceData = ref([
      {
        id: 1,
        name: "Brendan",
        score: 100,
        rank: 1,
        description: "这个人很浮躁"
      },
      {
        id: 2,
        name: "Oracle",
        score: 99,
        rank: 2,
        description: "这个人很懒"
      },
      {
        id: 3,
        name: "Zealot",
        score: 98,
        rank: 3,
        description: "这个人很疯狂"
      },
      { id: 4, name: "Frank", score: 97, rank: 4 },
      { id: 5, name: "Jack", score: 97, rank: 5 },
      { id: 6, name: "Clark", score: 97, rank: 6 },
      { id: 8, name: "Bruce", score: 96, rank: 7 },
      { id: 9, name: "Peter", score: 95, rank: 8 },
      { id: 10, name: "Tony", score: 94, rank: 9 },
      { id: 11, name: "Brendan", score: 100, rank: 1 },
      { id: 12, name: "Oracle", score: 99, rank: 2 },
      { id: 13, name: "Zealot", score: 98, rank: 3 },
      { id: 14, name: "Frank", score: 97, rank: 4 },
      { id: 15, name: "Jack", score: 97, rank: 5 },
      { id: 16, name: "Clark", score: 97, rank: 6 },
      { id: 18, name: "Bruce", score: 96, rank: 7 },
      { id: 19, name: "Peter", score: 95, rank: 8 },
      { id: 20, name: "Tony", score: 94, rank: 9 }
    ])
    const changeOrderBy = (event) => {
      loading.value = true
      setTimeout(() => {
        let changedField = ''
        Object.keys(orderBy).forEach(field => {
          if (orderBy[field] !== event[field]) {
            changedField = field
          }
        })
        if (event[changedField] === 'desc') {
          sourceData.value = sourceData.value.sort((a, b) => a[changedField] - b[changedField])
        } else if (event[changedField] === 'asc') {
          sourceData.value = sourceData.value.sort((a, b) => b[changedField] - a[changedField])
        }
        orderBy[changedField] = event[changedField]
        loading.value = false
      }, 3000)
    }
    return {
      orderBy, sourceData, error, selected, loading, changeOrderBy,
    }
  }

}
</script>