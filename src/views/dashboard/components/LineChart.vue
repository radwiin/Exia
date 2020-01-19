<template>
  <div class="page-container" id="container"></div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  name: "LineChart",
  mounted() {
    const data = [];
    const chart = new G2.Chart({
      container: "container",
      forceFit: true,
      height: 500,
      padding: "auto"
    });
    chart.source(data, {
      time: {
        alias: "时间",
        type: "time",
        mask: "HH:mm:ss",
        tickCount: 10,
        nice: false
      },
      temperature: {
        alias: "平均温度(°C)",
        min: 10,
        max: 35
      },
      type: {
        type: "cat"
      }
    });
    chart
      .line()
      .position("time*temperature")
      .color("type", ["#fe9f21", "#36c2cf"])
      .shape("smooth")
      .size(2);
    chart.render();
    setInterval(function() {
      const now = new Date();
      const time = now.getTime();
      const temperature1 = ~~(Math.random() * 5) + 22;
      const temperature2 = ~~(Math.random() * 7) + 17;
      if (data.length >= 20) {
        data.shift();
        data.shift();
      }
      data.push({
        time,
        temperature: temperature1,
        type: "记录1"
      });
      data.push({
        time,
        temperature: temperature2,
        type: "记录2"
      });
      chart.changeData(data);
    }, 2000);
  }
};
</script>

<style></style>
