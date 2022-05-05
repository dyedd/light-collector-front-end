<template>
  <div id="tp-weather-widget"></div>
</template>
<script>
import { defineComponent } from "vue";
import weather from "../utils/weather";
export default defineComponent({
  setup() {
    return {
      weather,
    };
  },
});
</script>
