<template>
  <div class="page-container">
    <div>operate</div>
    <div v-for="(equation, index) in equationList" :key="index">
      <div>
        <span> raw: </span>
        <span> {{ `${equation} = ` }}</span>
        <span>{{ eval(equation) }}</span>
      </div>
      <div>
        <span> jexl: </span>
        <span> {{ `${equation} = ` }}</span>
        <span>{{ operate(equation) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import operate from "@/utils/operate";
export default {
  name: "operate",
  data: () => ({
    eval: global.eval,
    operate,
    equationList: ["0.1 - 0.01"]
  })
};
</script>

<style></style>
