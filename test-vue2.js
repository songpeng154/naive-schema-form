import { ref } from 'vue'
const schema = ref([
  { title: ref('Hi') }
])
schema.value[0].title = 'Bye'
console.log(schema.value[0].title)
