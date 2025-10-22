import { ref, onMounted, onUnmounted } from 'vue';

export function useInput(callbacks) {
    const isDragging = ref(false)
    const startX = ref(0)
    const startY = ref(0)
    const threshold = 50

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                callbacks.onArrowUp()
                break;
            case 'ArrowDown':
                callbacks.onArrowDown()
                break;
            case 'ArrowLeft':
                callbacks.onArrowLeft()
                break;
            case 'ArrowRight':
                callbacks.onArrowRight()
                break;
        }
    };

    const handleMouseDown = (event) => {
        if (event.button === 0) {
            isDragging.value = true
            startX.value = event.clientX
            startY.value = event.clientY
        }
    };

    const handleMouseMove = (event) => {
        if (!isDragging.value) return

        const deltaX = event.clientX - startX.value
        const deltaY = event.clientY - startY.value

        if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    callbacks.onSwipeRight()
                } else {
                    callbacks.onSwipeLeft()
                }
            } else {
                if (deltaY > 0) {
                    callbacks.onSwipeDown()
                } else {
                    callbacks.onSwipeUp()
                }
            }
            isDragging.value = false;
        }
    };

    const handleMouseUp = () => {
        isDragging.value = false;
    };

    onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    });

    return {
        isDragging,
    };
}