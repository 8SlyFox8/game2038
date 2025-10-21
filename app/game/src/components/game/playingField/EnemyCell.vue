<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const enemyCellProps = defineProps(['number'])

const pupilLeft = ref(null)
const pupilRight = ref(null)

const handleMouseMove = (e) => {
    if (pupilLeft.value) {
        movePupil(pupilLeft.value, e)
    }
    if (pupilRight.value) {
        movePupil(pupilRight.value, e)
    }
}

const movePupil = (pupil, e) => {
    const rect = pupil.getBoundingClientRect()
    const x = (e.pageX - rect.left) / 150 + 'px'
    const y = (e.pageY - rect.top) / 150 + 'px'
    pupil.style.transform = `translate3d(${x}, ${y}, 0px)`
}

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
    <div>
        <div class="playing-field_enemy-cell">
            <p class="playing-field_enemy-cell_number"> {{ number }} </p>
        </div>
        <div class="playing-field_enemy-face">
            <div class="playing-field_enemy-face_eye">
                <div
                    ref="pupilLeft" 
                    class="playing-field_enemy-face_eye_pupil"
                >
                </div>
            </div>
            <div class="playing-field_enemy-face_eye">
                <div
                    ref="pupilRight"
                    class="playing-field_enemy-face_eye_pupil"
                >
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.playing-field_enemy-cell, .playing-field_enemy-face{
    width: 5vw;
    background-color: black;  
    border-left: 2px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
}

.playing-field_enemy-cell{
    border-top: 2px solid white;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.playing-field_enemy-cell_number {
    font-size: 4vh;
}

.playing-field_enemy-face{
    height: 3vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.playing-field_enemy-face_eye{
    width: 1vw;
    height: 1vh;
    background-color: white;  
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.playing-field_enemy-face_eye_pupil{
    width: 0.5vmin;
    height: 0.5vmin;
    background-color: black;
}
</style>