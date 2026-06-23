import { reactive, ref } from 'vue'
import { cloneDeep, isEqual } from 'es-toolkit'

const rawObj = {
  name: '',
  type: 1,
  parentId: undefined,
  path: undefined
}

const form = ref(rawObj)

const snapshot = cloneDeep(form.value)

console.log('isEqual:', isEqual(form.value, snapshot))

// Let's also check if any values change
const form2 = ref(rawObj)
const snapshot2 = cloneDeep(form2.value)

console.log('isEqual after reactive:', isEqual(form2.value, snapshot2))
