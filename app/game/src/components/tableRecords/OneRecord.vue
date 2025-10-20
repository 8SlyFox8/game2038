<script setup>
const recordProps = defineProps(['record', 'place'])
</script>

<template>
    <div class="one-record">
        <p>
            {{ place }}. {{ record.name }}
        </p>
        <p>
            {{ record.score }}
        </p>
    </div>
</template>

<style scoped>
.one-record{
    display: flex;
    justify-content: space-between;
}
</style>