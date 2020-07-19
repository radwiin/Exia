<template>
  <div class="ra-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="ra-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div :class="['ra-card__body', bodyClass]" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaCard',
  props: {
    header: {},
    bodyClass: {
      type: String,
      default: ''
    },
    bodyStyle: {},
    shadow: {
      type: String
    },
    titleColor: {
      type: String
    },
    cardBackground: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.ra-card {
  border-radius: 0.5rem;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.ra-card.is-always-shadow,
.ra-card.is-hover-shadow:focus,
.ra-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ra-card__header {
  padding: 1.3rem 1.3rem 0;
  box-sizing: border-box;
  color: #2c2c2c;
  font-size: 1.2rem;
}
.ra-card__body {
  padding: 1.3rem;
  color: #626262;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.01rem;
}
</style>
