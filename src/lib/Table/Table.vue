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
            <th v-if="$slots.default" ref="actionsHeader"></th>
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
              <td v-if="$slots.default">
                <div ref="actions" style="display: inline-block">
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
                <td
                  v-for="n in expendedCellColSpan"
                  class="descriptionHolder"
                ></td>
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
<script>
import Icon from "../Icon.vue";
export default {
  name: "BUI-Table",
  components: {
    Icon,
    vnodes: {
      functional: true,
      render: (h, context) => context.props.vnodes
    }
  },
  data() {
    return {
      expendedIDs: [],
      columns: []
    };
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
      type: Array,
      default: () => []
    },
    compact: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      required: true,
      validator(array) {
        if (array.filter(item => item.id === undefined).length > 0) {
          return false;
        } else {
          return true;
        }
      }
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
  watch: {
    selectedItems() {
      if (this.selectedItems.length === this.dataSource.length) {
        this.$refs.allChecked.indeterminate = false;
      } else if (this.selectedItems.length === 0) {
        this.$refs.allChecked.indeterminate = false;
      } else {
        this.$refs.allChecked.indeterminate = true;
      }
    }
  },
  methods: {
    inExpendedIds(id) {
      return this.expendedIDs.indexOf(id) >= 0;
    },
    expendItem(id) {
      if (this.inExpendedIds(id)) {
        this.expendedIDs.splice(this.expendedIDs.indexOf(id), 1);
      } else {
        this.expendedIDs.push(id);
      }
    },
    changeOrderBy(key) {
      const copy = JSON.parse(JSON.stringify(this.orderBy));
      let oldValue = copy[key];
      if (oldValue === "asc") {
        copy[key] = "desc";
      } else if (oldValue === "desc") {
        copy[key] = true;
      } else {
        copy[key] = "asc";
      }
      this.$emit("update:orderBy", copy);
    },
    inSelectedItems(item) {
      return this.selectedItems.filter(i => i.id === item.id).length > 0;
    },
    onChangeItem(item, index, e) {
      let selected = e.target.checked;
      let copy = JSON.parse(JSON.stringify(this.selectedItems));
      if (selected) {
        copy.push(item);
      } else {
        copy = copy.filter(i => i.id !== item.id);
      }
      this.$emit("update:selectedItems", copy);
    },
    onChangeAllItems(e) {
      let selected = e.target.checked;
      this.$emit("update:selectedItems", selected ? this.dataSource : []);
    }
  },
  mounted() {
    this.columns = this.$slots.default.map(node => {
      let { text, field, width } = node.componentOptions.propsData;
      let render = node.data.scopedSlots && node.data.scopedSlots.default;
      return {
        text,
        field,
        width,
        render
      };
    });
    // let result = this.columns[0].render({ value: "bren" });
    // console.log(result);
    let table2 = this.$refs.table.cloneNode(false);
    this.table2 = table2;
    table2.classList.add("BUI-table-copy");
    let tHead = this.$refs.table.children[0];
    let { height } = tHead.getBoundingClientRect();
    this.$refs.wrapper.style.paddingTop = height + "px";
    this.$refs.tableWrapper.style.height = this.height - height + "px";
    table2.appendChild(tHead);
    this.$refs.wrapper.appendChild(table2);
    if (this.$scopedSlots.default) {
      let div = this.$refs.actions[0];
      let { width } = div.getBoundingClientRect();
      let parent = div.parentNode;
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
      this.$refs.actionsHeader.style.width = width2;
      this.$refs.actions.map(div => {
        div.parentNode.style.width = width2;
      });
    }
  },
  computed: {
    areAllItemsSelected() {
      const a = this.dataSource.map(item => item.id).sort();
      const b = this.selectedItems.map(item => item.id).sort();
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
    },
    expendedCellColSpan() {
      let result = 0;
      if (this.checkable) {
        result += 1;
      }
      if (this.expendField) {
        result += 1;
      }
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
@import "Table.scss";
</style>