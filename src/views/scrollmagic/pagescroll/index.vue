<template>
  <div class="page-container" id="myContainer" style="overflow:auto">
    <div id="container">
      <div id="block">
        Hi there !
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMagic from "scrollmagic";
export default {
  name: "pagescroll",
  mounted() {
    let controller = new ScrollMagic.Controller({
      container: "#myContainer"
    });

    // eslint-disable-next-line no-undef
    let blockTween = new TweenMax.to("#block", 1.5, {
      backgroundColor: "red"
    });

    new ScrollMagic.Scene({
      triggerElement: "#container"
    })
      .setTween(blockTween)
      .addIndicators()
      .addTo(controller);
  }
};
</script>

<style lang="scss" scoped>
#container {
  margin: 100vh 0;
  padding: 50px;
  outline: 1px dashed orange;
}

#block {
  padding: 10px;
  border: 1px solid black;
  font-family: Helvetica;
}
</style>
