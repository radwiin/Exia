<template>
  <el-dialog
    :visible="visible"
    @update:visible="handleVisibleUpdate"
    title="坐标选择"
    width="65%"
    @open="handlePositionDialogOpen"
    @close="handlePositionDialogClose"
  >
    <div class="coordinate-select">
      <div class="left-top">
        <el-select
          v-model="value"
          value-key="uid"
          filterable
          remote
          clearable
          placeholder="搜索"
          :remote-method="remoteMethod"
          :loading="loading"
          style="width:300px"
          @change="handleSelect"
        >
          <el-option
            v-for="item in options"
            :key="item.uid"
            :label="item.title"
            :value="item"
          >
            <span style="float: left; padding-right: 1rem">{{
              item.title
            }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.address
            }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="right-top">
        <div>
          <div>地址</div>
          <span>{{ theLocation.address || "无数据" }}</span>
        </div>
        <div>
          <div>坐标</div>
          <span>{{ theLocation.point | pointFormat }}</span>
        </div>
      </div>
      <div ref="map" id="map-container" style="height:100%"></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        size="small"
        icon="el-icon-close"
        @click="handlePositionCancelClick"
        >取消</el-button
      >
      <el-button
        size="small"
        icon="el-icon-check"
        type="primary"
        @click="handlePositionConfirmClick"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "CoordinateSelectDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    location: {
      type: Object,
      default: () => ({
        address: "",
        point: { lng: "", lat: "" }
      })
    }
  },
  data() {
    return {
      address: "",
      point: { lng: "", lat: "" },
      theLocation: this.location,
      ak: "IZ6VQxuV12p9N8muj3dPOwwgZ0HbMBvz",
      BMap: null,
      map: null,
      localSearch: null,
      geocoder: null,
      loading: false,
      value: null,
      options: []
    };
  },
  watch: {
    location: {
      handler(newVal) {
        this.theLocation = newVal || {};
      },
      immediate: true,
      deep: true
    }
  },
  filters: {
    pointFormat(val) {
      if (val !== undefined) {
        return `(${val.lng} , ${val.lat})`;
      } else {
        return "无数据";
      }
    }
  },
  methods: {
    handleVisibleUpdate(val) {
      this.$emit("update:visible", val); // 桥接
    },
    handlePositionDialogOpen() {
      this.reset();
    },
    handlePositionDialogClose() {},
    handlePositionCancelClick() {
      this.$emit("update:visible", false);
    },
    handlePositionConfirmClick() {
      this.$emit("update:location", this.theLocation);
      this.$emit("update:visible", false);
    },
    locate({ title, point } = this.theLocation, beCenter = true, zoom = 15) {
      if (title == undefined) {
        this.value = null;
        this.options = [];
      }
      const {
        BMap: { Point, Marker, LocalCity },
        map
      } = this;
      let promise;
      if (point) {
        promise = Promise.resolve(point);
      } else {
        promise = new Promise(resolve => {
          new LocalCity().get(res => {
            this.theLocation = {
              address: res.name,
              point: res.center
            };
            resolve(res.center);
          });
        });
      }
      promise.then(point => {
        const thePoint = new Point(point.lng, point.lat);
        const theMarker = new Marker(thePoint);
        map.clearOverlays();
        map.addOverlay(theMarker);
        beCenter && map.centerAndZoom(thePoint, zoom);
        // this.$emit('update:location', this.theLocation)
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.localSearch.search(query);
      } else {
        this.options = [];
      }
    },
    handleSearchComplete(localResult) {
      this.loading = false;
      this.options = localResult.Sq;
    },
    handleSelect(item) {
      if (item !== undefined && item !== "") {
        this.theLocation = {
          address: item.address,
          point: item.point
        };
        this.locate();
      }
    },
    handleMapClick(e) {
      const {
        BMap: { Point },
        geocoder,
        locate
      } = this;
      geocoder.getLocation(new Point(e.point.lng, e.point.lat), res => {
        this.theLocation = {
          address: res.address,
          point: res.point
        };
        locate(this.theLocation, false);
      });
    },
    init(BMap) {
      if (!this.map) {
        // 第一次初始化
        const { handleSearchComplete, handleMapClick } = this;
        const { Map, Point, LocalSearch, Geocoder } = BMap;

        this.map = new Map(this.$refs.map, { enableMapClick: false }); // 创建地图实例
        this.map.enableScrollWheelZoom();
        this.map.centerAndZoom(new Point(116.404, 39.915), 15); // 初始化地图，设置中心点坐标和地图缩放级别

        this.map.addEventListener("click", handleMapClick); // 添加地图点击事件

        this.localSearch = new LocalSearch(this.map); // 用于地址查询
        this.localSearch.setSearchCompleteCallback(handleSearchComplete);

        this.geocoder = new Geocoder(); // 用于坐标反查
      }

      //初始化定位
      setTimeout(() => {
        this.locate();
      }, 100);
      // this.locate()
    },
    initMap(BMap) {
      if (!this.BMap) {
        this.BMap = BMap;
      }
      this.init(BMap);
    },
    getMapScript() {
      if (!global.BMap) {
        const ak = this.ak;
        global.BMap = {};
        global.BMap._preloader = new Promise(resolve => {
          global._initBaiduMap = function() {
            resolve(global.BMap);
            global.document.body.removeChild($script);
            global.BMap._preloader = null;
            global._initBaiduMap = null;
          };
          const $script = document.createElement("script");
          global.document.body.appendChild($script);
          $script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=_initBaiduMap`;
        });
        return global.BMap._preloader;
      } else if (!global.BMap._preloader) {
        return Promise.resolve(global.BMap);
      } else {
        return global.BMap._preloader;
      }
    },
    reset() {
      const { getMapScript, initMap } = this;
      getMapScript().then(initMap);
    }
  }
};
</script>

<style lang="scss" scoped>
.coordinate-select {
  position: relative;
  height: 500px;
}

.left-top {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
}

.right-top {
  background: rgba(28, 28, 28, 0.8);
  padding: 5px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;

  > div > div {
    display: inline-block;
    font-weight: 500;
    padding: 0.25rem 0.5em;
    text-align: right;
  }
}
</style>
