import { ref, onMounted, onUnmounted } from 'vue';

export function useWindowSize() {
  const width = ref(0);
  const height = ref(0);

  const updateWindowSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      updateWindowSize();
      window.addEventListener('resize', updateWindowSize);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateWindowSize);
    }
  });

  return { width, height };
}
