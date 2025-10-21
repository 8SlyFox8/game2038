<template>
    <div>
        <div class="playing-field_empty-space">
        </div>
        <div class="playing-field_empty-cell">
        </div>
    </div>
</template>

<style scoped>
.playing-field_empty-space{
    width: 5vw;
    height: 3vh;
    background-color: black;    
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-top: 2px solid black;
}

.playing-field_empty-cell{
    width: 5vw;
    height: 7vh;
    background-color: black;    
    border: 2px dashed rgba(255, 255, 255, 0.5);
}
</style>