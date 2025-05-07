<template>
  <div class="device-card" :class="{ 'device-card--active': device.status }">
    <div class="device-card__header">
      <h3 class="device-card__title">{{ device.name }}</h3>
      <span class="device-card__room">{{ device.room }}</span>
    </div>
    
    <div class="device-card__status">
      <div class="device-card__icon" :class="{ 'active': device.status }">
        <i :class="deviceIcon"></i>
      </div>
      <button 
        class="device-card__toggle-btn" 
        :class="{ 'active': device.status }"
        @click="toggleDevice"
      >
        {{ device.status ? '开启' : '关闭' }}
      </button>
    </div>
    
    <!-- 灯光亮度控制 -->
    <div v-if="device.type === 'light' && device.status" class="device-card__control">
      <small>亮度: {{ device.brightness }}%</small>
      <input 
        type="range" 
        min="0" 
        max="100" 
        :value="device.brightness" 
        @input="updateBrightness"
        class="device-card__slider"
      />
    </div>
    
    <!-- 空调温度控制 -->
    <div v-if="device.type === 'ac' && device.status" class="device-card__control">
      <small>温度: {{ device.temperature }}°C</small>
      <input 
        type="range" 
        min="16" 
        max="30" 
        :value="device.temperature" 
        @input="updateTemperature"
        class="device-card__slider"
      />
    </div>
    
    <!-- 窗帘开合度控制 -->
    <div v-if="device.type === 'curtain'" class="device-card__control">
      <small>开合度: {{ device.openPercentage }}%</small>
      <input 
        type="range" 
        min="0" 
        max="100" 
        :value="device.openPercentage" 
        @input="updateOpenPercentage"
        class="device-card__slider"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'DeviceCard',
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    
    // 设备图标
    const deviceIcon = computed(() => {
      switch (props.device.type) {
        case 'light': return 'fas fa-lightbulb';
        case 'ac': return 'fas fa-snowflake';
        case 'outlet': return 'fas fa-plug';
        case 'curtain': return 'fas fa-blinds';
        case 'tv': return 'fas fa-tv';
        default: return 'fas fa-lightbulb';
      }
    });
    
    // 开关设备
    const toggleDevice = () => {
      store.dispatch('toggleDevice', { 
        id: props.device.id, 
        status: !props.device.status 
      });
    };
    
    // 更新亮度
    const updateBrightness = (event) => {
      store.dispatch('updateDevice', {
        id: props.device.id,
        data: { brightness: parseInt(event.target.value) }
      });
    };
    
    // 更新温度
    const updateTemperature = (event) => {
      store.dispatch('updateDevice', {
        id: props.device.id,
        data: { temperature: parseInt(event.target.value) }
      });
    };
    
    // 更新窗帘开合度
    const updateOpenPercentage = (event) => {
      store.dispatch('updateDevice', {
        id: props.device.id,
        data: { openPercentage: parseInt(event.target.value) }
      });
    };
    
    return {
      deviceIcon,
      toggleDevice,
      updateBrightness,
      updateTemperature,
      updateOpenPercentage
    };
  }
}
</script>

<style lang="scss" scoped>
.device-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  &__title {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  &__room {
    font-size: 12px;
    color: #666;
    background: #f0f0f0;
    padding: 3px 8px;
    border-radius: 10px;
  }
  
  &__status {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  &__icon {
    font-size: 24px;
    color: #ccc;
    margin-right: 15px;
    
    &.active {
      color: #4caf50;
    }
  }
  
  &__toggle-btn {
    background: #f0f0f0;
    color: #333;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: #e0e0e0;
    }
    
    &.active {
      background: #4caf50;
      color: white;
      
      &:hover {
        background: #3d8b40;
      }
    }
  }
  
  &__control {
    margin-top: 10px;
    
    small {
      display: block;
      margin-bottom: 5px;
      color: #666;
    }
  }
  
  &__slider {
    width: 100%;
    cursor: pointer;
  }
}
</style>