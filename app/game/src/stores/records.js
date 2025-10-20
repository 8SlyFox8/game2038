import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordsStore = defineStore('records', () => {
  const records = ref([])

  function addRecord(name, score) {
    records.value.push({ name, score })

    records.value.sort((a, b) => b.score - a.score)
    
    if (records.value.length > 10) {
      records.value.pop()
    }
  }

  return {
    records,
    addRecord,
  }
},
{
  persist: true,
})