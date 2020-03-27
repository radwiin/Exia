<template>
  <div class="page-container" id="myContainer" style="overflow-y:auto">
    <section style="height:100%">header</section>
    <section class="panel blue">
      <b>ONE</b>
    </section>
    <section class="panel turquoise">
      <b>TWO</b>
    </section>
    <section class="panel green">
      <b>THREE</b>
    </section>
    <section class="panel bordeaux">
      <b>FOUR</b>
    </section>
  </div>
</template>

<script>
import ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

export default {
  name: "pagescroll",
  mounted() {
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
    var controller = new ScrollMagic.Controller({
      container: "#myContainer",
      globalSceneOptions: {
        triggerHook: "onLeave",
        duration: "100%" // this works just fine with duration 0 as well
        // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
        // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
      }
    });

    // get all slides
    var slides = document.querySelectorAll("section.panel");

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: slides[i]
      })
        .setPin(slides[i], { pushFollowers: false })
        .addTo(controller);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  height: 100%;
  width: 100%;
}

.blue {
  background-color: blue;
}

.turquoise {
  background-color: turquoise;
}

.green {
  background-color: green;
}

.bordeaux {
  background-color: brown;
}
</style>
