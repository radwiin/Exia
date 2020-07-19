<template>
  <el-card class="card-wrapper" :body-style="{ padding: '1.5rem', background: 'rgba(0,0,0,.6)' }">
    <div class="row-1">
      <h3>Cloudy</h3>
      <p>NanJing</p>
    </div>
    <div class="row-2">
      <svg-icon icon-class="cloudy" class-name="cloudy-icon" />
      <h2>-6 °</h2>
    </div>
    <div class="row-3">
      <span>Precipitation</span>
      <span>48%</span>
    </div>
    <div class="row-3">
      <span>Humidity</span>
      <span>60%</span>
    </div>
    <div class="row-3">
      <span>Wind</span>
      <span>4823 km/h</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'WeatherCard'
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  border-radius: 10px;
  background: url('~@/assets/cloudy.jpg') center center/cover;
  color: #fff;

  .row-1 {
    margin-top: 2rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    h3 {
      font-weight: 500;
      line-height: 1.2;
      font-size: 1.5rem;
      margin: 0 0 0.5rem 0;
    }

    p {
      margin: 0 0 1.5rem 0;
    }
  }

  .row-2 {
    margin-bottom: 8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .cloudy-icon {
      width: 84px;
      height: 84px;
    }

    h2 {
      font-size: 3.5rem;
      margin: 0;
    }
  }

  .row-3 {
    padding: 0 22px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 500;
  }
}
</style>
