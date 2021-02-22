<template>
  <div class="BUI-table-wrapper" ref="wrapper">
    <div :style="{ height, overflow: 'auto' }" ref="tableWrapper">
      <table
        class="BUI-table"
        :class="{ bordered, compact, striped: striped }"
        ref="table"
      >
        <thead>
          <tr>
            <th
              v-if="expendField"
              :style="{ width: '36px' }"
              class="BUI-table-center"
            ></th>
            <th
              v-if="checkable"
              :style="{ width: '50px' }"
              class="BUI-table-center"
            >
              <input
                type="checkbox"
                @change="onChangeAllItems"
                ref="allChecked"
                :checked="areAllItemsSelected"
              />
            </th>
            <th :style="{ width: '50px' }" v-if="numberVisible">#</th>
            <th
              :style="{ width: column.width + 'px' }"
              :key="column.field"
              v-for="column in columns"
            >
              <div class="BUI-table-header">
                {{ column.text }}
                <span
                  v-if="column.field in orderBy"
                  class="BUI-table-sorter"
                  @click="changeOrderBy(column.field)"
                >
                  <Icon
                    name="up"
                    :class="{ active: orderBy[column.field] === 'asc' }"
                  ></Icon>
                  <Icon
                    name="down"
                    :class="{ active: orderBy[column.field] === 'desc' }"
                  ></Icon>
                </span>
              </div>
            </th>
            <th v-if="context.slots.default()" ref="actionsHeader"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in dataSource" :key="item.id">
            <tr>
              <td
                v-if="expendField"
                :style="{ width: '36px' }"
                class="BUI-table-center"
              >
                <Icon
                  v-if="item.description"
                  :class="{ active: inExpendedIds(item.id) }"
                  class="BUI-table-expendIcon"
                  name="right"
                  @click="expendItem(item.id)"
                />
              </td>
              <td
                v-if="checkable"
                :style="{ width: '50px' }"
                class="BUI-table-center"
              >
                <input
                  type="checkbox"
                  @change="onChangeItem(item, index, $event)"
                  :checked="inSelectedItems(item)"
                />
              </td>
              <td v-if="numberVisible" :style="{ width: '50px' }">
                {{ index + 1 }}
              </td>
              <template v-for="column in columns" :key="column.field">
                <td :style="{ width: column.width + 'px' }">
                  <template v-if="column.render">
                    <vnodes
                      :vnodes="column.render({ value: item[column.field] })"
                    ></vnodes>
                  </template>
                  <template v-else>
                    {{ item[column.field] }}
                  </template>
                </td>
              </template>
              <td v-if="context.slots.default()">
                <div
                  :ref="
                    (el) => {
                      actions[index] = el;
                    }
                  "
                  style="display: inline-block"
                >
                  <slot :item="item"></slot>
                </div>
              </td>
            </tr>
            <transition name="scroll">
              <tr
                class="descriptionTr"
                v-if="inExpendedIds(item.id)"
                :key="`${item.id}-expend`"
              >
                <td v-for="n in expendedCellColSpan" class="descriptionHolder">
                  {{ n }}
                </td>
                <td
                  class="description"
                  :colspan="columns.length + expendedCellColSpan"
                >
                  {{ item[expendField] }}
                </td>
              </tr>
            </transition>
          </template>
        </tbody>
      </table>
    </div>
    <div class="BUI-table-loading" v-if="loading">
      <Icon name="loading" />
    </div>
  </div>
</template>
<script lang="ts">
import Icon from "../Icon.vue";
import { computed, createApp, h, onBeforeUpdate, onMounted, onUpdated, PropType, reactive, ref, watchEffect } from 'vue';
interface IDataSource {
  id: number
}
export default {
  name: "BUI-Table",
  components: {
    Icon,
    vnodes: {
      functional: true,
      render: (h, context) => context.props.vnodes
    }
  },
  props: {
    checkable: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    expendField: {
      type: String
    },
    height: {
      type: Number
    },
    orderBy: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array as PropType<IDataSource[]>,
      default: () => []
    },
    compact: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array as PropType<IDataSource[]>,
      required: true,
    },
    numberVisible: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const expendedIDs = ref([])
    const columns = ref([])
    const table = ref<HTMLTableElement>(null)
    const wrapper = ref<HTMLDivElement>(null)
    const tableWrapper = ref<HTMLDivElement>(null)
    const actions = reactive<HTMLDivElement[]>([])
    const actionsHeader = ref<HTMLDivElement>(null)
    const allChecked = ref<HTMLInputElement>(null)


    const expendItem = (id) => {
      if (inExpendedIds(id)) {
        console.log(id)
        expendedIDs.value = expendedIDs.value.splice(expendedIDs.value.indexOf(id), 1);
      } else {
        expendedIDs.value.push(id);
      }
    }
    const inExpendedIds = (id) => {
      return expendedIDs.value.indexOf(id) >= 0;
    }
    const changeOrderBy = (key) => {
      const copy = JSON.parse(JSON.stringify(props.orderBy));
      let oldValue = copy[key];
      if (oldValue === "asc") {
        copy[key] = "desc";
      } else if (oldValue === "desc") {
        copy[key] = true;
      } else {
        copy[key] = "asc";
      }
      context.emit("update:orderBy", copy);
    }
    const inSelectedItems = (item) => {
      return props.selectedItems.filter(i => i.id === item.id).length > 0;
    }
    const onChangeItem = (item, index, e) => {
      let selected = e.target.checked;
      let copy = JSON.parse(JSON.stringify(props.selectedItems));
      if (selected) {
        copy.push(item);
      } else {
        copy = copy.filter(i => i.id !== item.id);
      }
      context.emit("update:selectedItems", copy);
    }
    const onChangeAllItems = (e) => {
      let selected = e.target.checked;
      context.emit("update:selectedItems", selected ? props.dataSource : []);
    }

    const areAllItemsSelected = computed(() => {
      const a = props.dataSource.map(item => item.id).sort();
      const b = props.selectedItems.map(item => item.id).sort();
      if (a.length !== b.length) {
        return false;
      }
      let equal = true;
      for (let index = 0; index < a.length; index++)
        if (a[index] !== b[index]) {
          equal = false;
          break;
        }
      return equal;
    })

    const expendedCellColSpan = () => {
      let result = 0;
      if (props.checkable) {
        result += 1;
      }
      if (props.expendField) {
        result += 1;
      }
      return result;
    }
    // const columnsVnode = (column) => {
    //   h()
    // }

    onMounted(() => {
      columns.value = context.slots.default().map(node => {
        let { text, field, width } = node.props;
        let render = node.props.slotScope;
        return {
          text,
          field,
          width,
          render,
        };
      });
      // console.log(columns.value)
      // let result = columns.value[0].render({ value: "bren" });
      let table2 = table.value.cloneNode(false);
      table2.classList.add("BUI-table-copy");
      let tHead = table.value.children[0];
      let { height } = tHead.getBoundingClientRect();
      wrapper.value.style.paddingTop = height + "px";
      tableWrapper.value.style.height = props.height - height + "px";
      table2.appendChild(tHead);
      wrapper.value.appendChild(table2);
      if (context.slots.default()) {
        let div = actions[0];
        let { width } = div.getBoundingClientRect();
        let parent = div.parentElement;
        let style = getComputedStyle(parent);
        let paddingLeft = style.getPropertyValue("padding-left");
        let paddingRight = style.getPropertyValue("padding-Right");
        let borderLeft = style.getPropertyValue("border-left-width");
        let borderRight = style.getPropertyValue("border-right-width");
        let width2 =
          width +
          parseInt(paddingLeft) +
          parseInt(paddingRight) +
          parseInt(borderLeft) +
          parseInt(borderRight) +
          "px";
        actionsHeader.value.style.width = width2;
        actions.map(div => {
          div.parentElement.style.width = width2;
        });
      }
    })
    onMounted(() => {
      watchEffect(() => {
        if (props.checkable) {
          if (props.selectedItems.length === props.dataSource.length) {
            allChecked.value.indeterminate = false;
          } else if (props.selectedItems.length === 0) {
            allChecked.value.indeterminate = false;
          } else {
            allChecked.value.indeterminate = true;
          }
        }
      }, { flush: 'post' })

    })
    return {
      context,
      expendedIDs,
      columns,
      inSelectedItems,
      inExpendedIds,
      expendItem,
      wrapper, tableWrapper, table, actionsHeader, allChecked, actions,
      areAllItemsSelected,
      expendedCellColSpan,
      onChangeAllItems,
      changeOrderBy,
      onChangeItem
    };
  },
};
</script>

<style scoped lang="scss">
@import "Table.scss";
</style>