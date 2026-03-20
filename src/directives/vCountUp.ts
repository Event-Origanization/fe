import type { Directive } from 'vue';

interface CountUpState {
  observer: IntersectionObserver;
  startAnimation: (val: string | number | null | undefined) => void;
  frameId?: number;
}

const stateMap = new WeakMap<HTMLElement, CountUpState>();

export const vCountUp: Directive<HTMLElement, string | number | null | undefined> = {
  mounted(el, binding) {
    const startAnimation = (targetValue: string | number | null | undefined) => {
      const state = stateMap.get(el);
      if (state?.frameId) {
        cancelAnimationFrame(state.frameId);
      }

      if (targetValue === undefined || targetValue === null) return;

      // Extract numerical part and suffix/prefix
      const strValue = String(targetValue);
      const match = strValue.match(/(\d+)(.*)/);
      if (!match) {
        el.innerText = strValue;
        return;
      }

      const endValue = parseInt(match[1], 10);
      const suffix = match[2] || '';
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      // Easing function: easeOutExpo
      const easeOutExpo = (t: number): number => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      let frame = 0;
      const animate = (): void => {
        frame++;
        const progress = easeOutExpo(frame / totalFrames);
        const currentValue = Math.round(endValue * progress);
        
        // Update element content
        if (suffix === '+') {
          el.innerHTML = `${currentValue}<span class="text-brand-500 tracking-tight ml-1">+</span>`;
        } else {
          el.innerText = `${currentValue}${suffix}`;
        }

        if (frame < totalFrames) {
          const frameId = requestAnimationFrame(animate);
          const currentState = stateMap.get(el);
          if (currentState) {
            currentState.frameId = frameId;
          }
        }
      };

      animate();
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startAnimation(binding.value);
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    
    // Store state in WeakMap
    stateMap.set(el, {
      observer,
      startAnimation
    });
  },
  
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      const state = stateMap.get(el);
      if (state) {
        state.startAnimation(binding.value);
      }
    }
  },

  unmounted(el) {
    const state = stateMap.get(el);
    if (state) {
      state.observer.disconnect();
      if (state.frameId) {
        cancelAnimationFrame(state.frameId);
      }
      stateMap.delete(el);
    }
  }
};
