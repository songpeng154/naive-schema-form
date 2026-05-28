import { useMutationObserver, useParentElement } from '@vueuse/core'
import { onMounted, ref, type Ref } from 'vue'

function elementIndex(el: Ref<HTMLElement | undefined>) {
  const index = ref(-1)
  const parentElement = useParentElement()

  const setIndex = () => {
    if (!parentElement.value) {
      index.value = -1
      return
    }
    index.value = Array.from(parentElement.value.children).findIndex(item => item === el.value)
  }

  useMutationObserver(parentElement, setIndex, {
    childList: true,
  })

  onMounted(setIndex)

  return index
}

export default elementIndex

