<template>
  <page-container style="padding-bottom: 20px">
    <div ref="mapbox" style="height:100%;"></div>
  </page-container>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
export default {
  name: 'mapbox-demo',
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFkd2lpbiIsImEiOiJja2R5Nmh1MWwxY3J0Mndub285dHIwc3A5In0.ac5hyVhwTJacJf92xeYRTg'
    const map = new mapboxgl.Map({
      container: this.$refs.mapbox,
      style: 'mapbox://styles/radwiin/ckdy713s545f919p7x8ea5pt3', // stylesheet location
      center: [120.52139282226561, 32.56041416198585], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })
  }
}
</script>

<style></style>
