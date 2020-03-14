<template>
  <div class="page-container">
    <coordinate-select v-model="location" style="height:100%" />
  </div>
</template>

<script>
import CoordinateSelect from "@/components/CoordinateSelect";

export default {
  name: "coordinate-select-demo",
  components: { CoordinateSelect },
  data: () => ({
    location: {
      longitude: 118.92423670941807,
      latitude: 32.06696524757061,
      address: "江苏省南京市栖霞区"
    }
  }),
  methods: {}
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
</style>
