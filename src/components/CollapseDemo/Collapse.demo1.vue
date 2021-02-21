<demo>
默认 collapse 
</demo>
<template>
  <div class="switchSection">
    <Collapse v-model:selected="selectedTab">
      <Collapse-item
        v-for="(item, index) in contents"
        :title="item.title"
        :name="(index + 1).toString()"
        :key="index"
      >
        {{ item.content }}
      </Collapse-item>
    </Collapse>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Collapse from '../../lib/Collapse/Collapse.vue'
import CollapseItem from '../../lib/Collapse/Collapse.item.vue'
export default {
  components: { Collapse, CollapseItem },
  setup() {
    const selectedTab = ref([]);
    const change = (event) => {
      selectedTab.value = event
    }
    const contents = [
      {
        title: '目标',
        content: `明确坚持和发展中国特色社会主义，总任务是实现社会主义现代化和中华民族伟大复兴，
        在全面建成小康社会的基础上，分两步走在本世纪中叶建成富强民主文明和谐美丽的社会主义现代化强国；`
      },
      {
        title: '主要矛盾',
        content: `明确新时代我国社会主要矛盾是人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾
        必须坚持以人民为中心的发展思想，不断促进人的全面发展、全体人民共同富裕；`
      },
      {
        title: '布局',
        content: `明确中国特色社会主义事业总体布局是“五位一体”、战略布局是“四个全面”，
        强调坚定道路自信、理论自信、制度自信、文化自信；`
      },
      {
        title: '改革目标',
        content: '明确全面深化改革总目标是完善和发展中国特色社会主义制度、推进国家治理体系和治理能力现代化；'
      },
      {
        title: '依法治国目标',
        content: '明确全面推进依法治国总目标是建设中国特色社会主义法治体系、建设社会主义法治国家；'
      },
      {
        title: '人民军队',
        content: '明确党在新时代的强军目标是建设一支听党指挥、能打胜仗、作风优良的人民军队，把人民军队建设成为世界一流军队；'
      },
      {
        title: '外交',
        content: '明确中国特色大国外交要推动构建新型国际关系，推动构建人类命运共同体；'
      },
      {
        title: '本质特征',
        content: `明确中国特色社会主义最本质的特征是中国共产党领导，中国特色社会主义制度的最大优势是中国共产党领导，
        党是最高政治领导力量，提出新时代党的建设总要求，突出政治建设在党的建设中的重要地位。`
      }

    ]
    return { selectedTab, change, contents };
  },
}
</script>

<style lang="scss" scoped>
</style>