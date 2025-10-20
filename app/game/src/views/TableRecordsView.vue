<script setup>
import OneRecord from '@/components/tableRecords/OneRecord.vue'
import { useRecordsStore } from '@/stores/records'

const recordsStore = useRecordsStore()
</script>

<template>
    <div class="table-records">
        <p>
            Таблица рекордов
        </p>
        <hr/>
        <OneRecord
            v-for="(record, index) in recordsStore.records"
            :key="index"
            :record="record"
            :place="index + 1"
        />
    </div>
</template>

<style scoped>
.table-records{
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50vw;
    height: 50vh;
}
</style>