<template>
  <div class="page-container">
    <div style="padding:30px;">
      <span style="font-size:32px;vertical-align:middle">EXIA</span>
      <el-tag color="#36c2cf" effect="dark" style="vertical-align:middle;border-color:#36c2cf;margin-left:8px;">
        v0.1.0
      </el-tag>

      <div style="margin: 8px 0 0 2px">
        <span>Welcome, vistor.</span>
      </div>
    </div>
    <!-- <el-row :gutter="20" style="margin:0 20px;">
      <el-col v-bind="cardColSpan" v-for="(item, index) in cardList" :key="index">
        <el-card shadow="hover" style="margin: 10px 0; cursor: pointer;" :body-style="{ padding: '0px' }">
          <div class="card" :style="{ background: item.background }">
            <div class="card-left-part">
              <div class="card-value">{{ item.value }}</div>
              <div class="card-title">{{ item.title }}</div>
              <div class="card-description">{{ item.description }}</div>
            </div>
            <div class="card-right-part">
              <svg-icon :icon-class="item.icon" class-name="card-icon" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row> -->

    <div style="padding: 30px 30px">
      <div style="margin: 10px 0">
        <ra-card style="width:400px" header="Title">
          <p style="margin: 0 0 0.6rem 0">
            You can use title-color prop to change color of title of card. This prop supports hex, rgba, rgb and theme colors.
          </p>
          <p style="margin: 0">
            Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I
            love.
          </p>
        </ra-card>
      </div>
      <div style="margin: 10px 0">
        <weather-card style="width:400px"></weather-card>
      </div>
      <div style="margin: 10px 0">
        <cube-card style="width:170px"></cube-card>
      </div>
      <div style="margin: 10px 0">
        <rect-card style="width:305px" />
      </div>
      <div style="margin: 10px 0">
        <area-card style="width:305px" />
      </div>
      <div style="margin: 10px 0">
        <line-card style="width:400px" />
      </div>
    </div>
  </div>
</template>

<script>
import RaCard from '@/components/RaCard'
import CubeCard from './components/CubeCard'
import RectCard from './components/RectCard'
import AreaCard from './components/AreaCard'
import LineCard from './components/LineCard'
import WeatherCard from './components/WeatherCard'

export default {
  name: 'dashboard',
  components: {
    RaCard,
    CubeCard,
    RectCard,
    AreaCard,
    LineCard,
    WeatherCard
  },
  data: () => ({
    frameworkActiveNames: ['1', '2', '3', '4'],
    cardColSpan: {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6
    },
    cardList: [
      {
        value: '50%',
        title: 'Saving for Home',
        description: 'Lorem ipsum dolor',
        icon: 'build',
        background: '#5473e8'
      },
      {
        value: '50%',
        title: 'Saving for Home',
        description: 'Lorem ipsum dolor',
        icon: 'build',
        background: '#36c2cf'
      },
      {
        value: '50%',
        title: 'Saving for Home',
        description: 'Lorem ipsum dolor',
        icon: 'build',
        background: '#fe9f21'
      },
      {
        value: '50%',
        title: 'Saving for Home',
        description: 'Lorem ipsum dolor',
        icon: 'build',
        background: '#d9dced'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 150px;
  border-radius: 4px;
  display: flex;
  padding-left: 30px;
  padding-right: 30px;

  &-left-part {
    flex-grow: 1;
    width: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    .card-value {
      font-size: 36px;
      color: #ffffff;
    }

    .card-title {
      font-size: 16px;
      color: #ffffff;
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-description {
      font-size: 16px;
      color: #ffffff;
      opacity: 0.7;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &-right-part {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    .card-icon {
      width: 72px;
      height: 72px;
      color: #ffffff;
    }
  }
}
</style>
