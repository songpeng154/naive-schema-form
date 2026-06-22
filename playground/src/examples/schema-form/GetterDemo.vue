<script setup lang="ts">
import { NButton } from 'naive-ui'
import { computed, ref } from 'vue'

// 模拟外部传入的配置（属性带有 Ref）
const schema = ref([
  { title: ref('我是初始标题 1'), hide: ref(false) },
  { title: ref('我是初始标题 2'), hide: ref(false) },
  { title: ref('我是初始标题 3'), hide: ref(false) },
])

const otherState = ref(false)

// ==========================================
// 1. 普通模式：没有使用 Getter
// ==========================================
const eagerComputedList = computed(() => {
  console.log('❌ [普通模式] 触发 computed 重新求值！开始执行全量 map 循环...')
  return schema.value.map((item, index) => {
    console.log(`   👉 [普通模式] 正在全量处理第 ${index + 1} 项`)
    return {
      index,
      // 直接取值：导致 computed 收集了 item.title 和 item.hide 和 otherState 的依赖！
      title: item.title as unknown as string,
      hide: item.hide as unknown as boolean,
      test: otherState.value, // 模拟组件中存在的全局变量/无关依赖
    } as any
  })
})

// ==========================================
// 2. 懒加载模式：使用 Getter
// ==========================================
const lazyComputedList = computed(() => {
  console.log('✅ [Getter模式] 触发 computed 重新求值！(只在初始化或 schema 增删时才会跑)')
  return schema.value.map((item, index) => {
    console.log(`   🚀 [Getter模式] 仅建立映射关系，不取值 (第 ${index + 1} 项)`)
    return {
      index,
      // 使用 getter：只有模板真正渲染到这行时，才会触发取值，从而由渲染函数局部收集依赖
      get title() {
        console.log(`   🎯 [Getter模式] 模板局部取值: 第 ${index + 1} 项标题`)
        return item.title as unknown as string
      },
      get hide() {
        return item.hide as unknown as boolean
      },
      get test() {
        return otherState.value
      },
    }
  })
})

// === 操作方法 ===
function changeTitle() {
  console.log('\n--- 🖱️ 触发操作：改变第一个标题 ---')
  schema.value[0].title = `修改后标题 ${Math.floor(Math.random() * 100)}`
}

function changeOtherState() {
  console.log('\n--- 🖱️ 触发操作：改变无关状态 ---')
  otherState.value = !otherState.value
}

function pushNewItem() {
  console.log('\n--- 🖱️ 触发操作：新增一行数据 ---')
  schema.value.push({
    title: ref(`新增的标题 ${schema.value.length + 1}`),
    hide: ref(false),
  })
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">
      Vue Getter 性能与依赖精准收集 Demo
    </h2>
    <div class="flex gap-4 mb-4">
      <NButton type="primary" @click="changeTitle">
        改变第一个标题
      </NButton>
      <NButton type="warning" @click="changeOtherState">
        改变其它无关状态
      </NButton>
      <NButton type="info" @click="pushNewItem">
        新增一行数据
      </NButton>
    </div>

    <div class="flex gap-8 mb-8">
      <div class="border p-4 flex-1 rounded bg-red-50/50">
        <h3 class="font-bold text-red-600 mb-2">
          1. 普通 Computed (无 Getter)
        </h3>
        <p class="text-gray-500 text-sm mb-4">
          每次修改任何依赖，整个大循环都会重跑
        </p>
        <div v-for="item in eagerComputedList" :key="item.index" class="mb-2 p-2 bg-white rounded shadow-sm">
          {{ item.title }}
        </div>
      </div>

      <div class="border p-4 flex-1 rounded bg-green-50/50">
        <h3 class="font-bold text-green-600 mb-2">
          2. 懒加载 Computed (使用 Getter)
        </h3>
        <p class="text-gray-500 text-sm mb-4">
          循环只跑一次，按需、局部触发 Getter
        </p>
        <div v-for="item in lazyComputedList" :key="item.index" class="mb-2 p-2 bg-white rounded shadow-sm">
          {{ item.title }}
        </div>
      </div>
    </div>

    <div class="bg-gray-100 p-4 rounded text-sm">
      <p class="font-bold text-lg mb-2">
        💡 测试说明 (请按 F12 打开控制台查看日志)
      </p>
      <ul class="list-disc pl-5 space-y-2">
        <li>
          <strong>点击【改变第一个标题】：</strong>你会发现「普通 Computed」的整个外层 <code>.map</code> 循环重跑了 N 次，而「Getter 模式」的循环<strong>一次都没跑</strong>，它只单独、精准地触发了第一个元素的 <code>get title()</code>。
        </li>
        <li>
          <strong>点击【改变无关状态】：</strong>「普通 Computed」依然整个循环重跑（因为它在解包时收集了过多的无用依赖）！而 Getter 模式则完全没反应。
        </li>
        <li>
          <strong>点击【新增一行数据】：</strong>这时两边都会跑，因为改变了 <code>schema.value</code> 数组本身的长度，这才是 <code>computed</code> 真正应该关心的事情。
        </li>
      </ul>
    </div>
  </div>
</template>
