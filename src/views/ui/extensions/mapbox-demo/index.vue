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
      style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
      center: [114, 38.54], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })
    map.addControl(new MapboxLanguage({ defaultLanguage: 'zh' }))
  }
}
</script>

<style></style>
