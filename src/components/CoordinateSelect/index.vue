<template>
  <div class="coordinate-select-container">
    <div ref="map" class="map-container"></div>
    <div class="search-container">
      <el-select
        v-model="searchValue"
        value-key="uid"
        filterable
        remote
        clearable
        placeholder="搜索"
        :remote-method="remoteMethod"
        :loading="searchLoading"
        style="width:300px"
        @change="handleSearchResultSelect"
      >
        <el-option
          v-for="item in searchResultOptions"
          :key="item.uid"
          :label="item.title"
          :value="item"
        >
          <span style="float: left; padding-right: 1rem">{{ item.title }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.address
          }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="info-container">
      <div>
        <div>地址</div>
        <span>{{ theLocation.address || "无数据" }}</span>
      </div>
      <div>
        <div>坐标</div>
        <span>{{ `(${theLocation.longitude},${theLocation.latitude})` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoordinateSelect",
  props: {
    value: {
      type: Object,
      default: () => ({
        longitude: "", // 经度
        latitude: "", // 纬度
        address: "" // 地址说明
      })
    },
    ak: {
      type: String,
      default: "IZ6VQxuV12p9N8muj3dPOwwgZ0HbMBvz"
    }
  },
  data() {
    return {
      BMap: null,
      map: null,
      localSearch: null,
      geocoder: null,

      theLocation: { ...this.value },

      searchValue: "",
      searchLoading: false,
      searchResultOptions: []
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.theLocation = { ...newVal };
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    locate(location = this.theLocation, beCenter = true, zoom = 15) {
      const {
        BMap: { Point, Marker, LocalCity },
        map
      } = this;
      let promise;
      if (
        !location ||
        !location.longitude ||
        !location.latitude ||
        !location.address
      ) {
        // 数据不满足，将默认定位到本地城市
        promise = new Promise(resolve => {
          new LocalCity().get(res => {
            location = {
              longitude: res.center.lng,
              latitude: res.center.lat,
              address: res.name
            };
            resolve(location);
          });
        });
      } else {
        // 数据满足，按数据进行定位
        promise = Promise.resolve(location);
      }
      promise.then(location => {
        const thePoint = new Point(location.longitude, location.latitude);
        const theMarker = new Marker(thePoint);
        map.clearOverlays();
        map.addOverlay(theMarker);
        beCenter && map.centerAndZoom(thePoint, zoom);
        this.$emit("input", location);
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.localSearch.search(query);
      } else {
        this.searchResultOptions = [];
      }
    },
    handleSearchResultSelect(item) {
      if (item !== undefined && item !== "") {
        let location = {
          longitude: item.point.lng,
          latitude: item.point.lat,
          address: item.address
        };
        this.locate(location);
      }
    },
    handleSearchComplete(localResult) {
      this.searchLoading = false;
      this.searchResultOptions = localResult.Uq;
    },
    handleMapClick(e) {
      const {
        BMap: { Point },
        geocoder,
        locate
      } = this;
      geocoder.getLocation(new Point(e.point.lng, e.point.lat), res => {
        let location = {
          longitude: res.point.lng,
          latitude: res.point.lat,
          address: res.address
        };
        locate(location, false);
      });
    },
    init() {
      this.getMapScript().then(BMap => {
        this.BMap = BMap;

        const { Map, Point, LocalSearch, Geocoder } = BMap;
        const { handleSearchComplete, handleMapClick } = this;

        this.map = new Map(this.$refs.map, { enableMapClick: false }); // 创建地图实例
        this.map.enableScrollWheelZoom();
        this.map.centerAndZoom(new Point(116.404, 39.915), 15); // 初始化地图，设置中心点坐标和地图缩放级别

        this.map.addEventListener("click", handleMapClick); // 添加地图点击事件

        this.localSearch = new LocalSearch(this.map); // 用于地址查询
        this.localSearch.setSearchCompleteCallback(handleSearchComplete);

        this.geocoder = new Geocoder(); // 用于坐标反查

        this.locate();
      });
    },
    getMapScript() {
      if (!global.BMap) {
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
          $script.src = `https://api.map.baidu.com/api?v=3.0&ak=${this.ak}&callback=_initBaiduMap`;
        });
        return global.BMap._preloader;
      } else if (!global.BMap._preloader) {
        return Promise.resolve(global.BMap);
      } else {
        return global.BMap._preloader;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.coordinate-select-container {
  height: 500px;
  position: relative;

  .map-container {
    height: 100%;
  }

  .search-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .info-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(28, 28, 28, 0.8);
    padding: 5px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;

    > div > div {
      display: inline-block;
      font-weight: 500;
      padding: 0.25rem 0.5em;
      text-align: right;
    }
  }
}
</style>
