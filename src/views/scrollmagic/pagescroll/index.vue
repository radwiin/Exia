<template>
  <div class="page-container">
    <div style="height:100%">
      HEADER
    </div>
    <div id="pin-container">
      <section class="panel one">
        <b>ONE</b>
      </section>
      <section class="panel two">
        <b>TWO</b>
      </section>
      <section class="panel three">
        <b>THREE</b>
      </section>
      <section class="panel four">
        <b>FOUR</b>
      </section>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax } from 'gsap'
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'
import { ScrollMagicPluginDebug } from './scrollmagic-plugin-debug'

export default {
  name: 'pagescroll',
  mounted() {
    console.info('mounted')
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)
    ScrollMagicPluginDebug(ScrollMagic)
    var controller = new ScrollMagic.Controller({
      container: '.page-container'
    })

    var wipeAnimation = new TimelineMax()
      .fromTo('section.panel.two', 1, { x: '-100%' }, { x: '0%', ease: 'Linear.easeNone' }) // in from left
      .fromTo('section.panel.three', 1, { x: '100%' }, { x: '0%', ease: 'Linear.easeNone' }) // in from right
      .fromTo('section.panel.four', 1, { y: '-100%' }, { y: '0%', ease: 'Linear.easeNone' }) // in from top

    new ScrollMagic.Scene({
      triggerElement: '#pin-container',
      triggerHook: 'onLeave',
      duration: '300%'
    })
      .setPin('#pin-container')
      .setTween(wipeAnimation)
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  overflow-y: auto;
}

#pin-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.panel {
  height: 100%;
  width: 100%;
  position: absolute;

  b {
    position: relative;
    display: block;
    top: 50%;
    text-align: center;
    color: white;
  }
}

.one {
  background-color: blue;
}

.two {
  background-color: turquoise;
}

.three {
  background-color: green;
}

.four {
  background-color: brown;
}
</style>
