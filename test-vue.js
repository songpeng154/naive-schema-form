import { ref } from 'vue'
const schema = ref([
  { title: ref('Hi') }
])
console.log('type:', typeof schema.value[0].title)
console.log('value:', schema.value[0].title)
