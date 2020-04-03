<template>
  <div class="page-container">
    <div style="padding:30px;">
      <span style="font-size:32px;vertical-align:middle">EXIA</span>
      <el-tag
        color="#36c2cf"
        effect="dark"
        style="vertical-align:middle;border-color:#36c2cf;margin-left:8px;"
      >
        v0.1.0
      </el-tag>

      <div style="margin: 8px 0 0 2px">
        <span>EXIA是一个前端开发仓库.</span>
      </div>
    </div>
    <div style="padding:30px 0 0 30px;">
      <span style="font-size:24px;vertical-align:middle"
        >EXIA主要包括以下内容：</span
      >
    </div>
    <el-row :gutter="30" style="margin:0 20px;">
      <el-col v-bind="contentColSpan">
        <div style="padding: 30px 0">
          <span style="font-size:20px;color:#707175">架构</span>
        </div>
        <el-collapse v-model="frameworkActiveNames">
          <el-collapse-item title="代码结构" name="1">
            <div>
              完善的代码结构分化；
            </div>
          </el-collapse-item>
          <el-collapse-item title="RBAC" name="2">
            <div>
              基础的角色权限控制系统；
            </div>
          </el-collapse-item>
          <el-collapse-item title="配置化" name="3">
            <div>丰富的配置项自定义网页样式；</div>
          </el-collapse-item>
          <el-collapse-item title="易用性" name="4">
            <div>
              提供丰富的demo案例；帮助开发者快速上手、启动项目；
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col v-bind="contentColSpan">
        <div style="padding: 30px 0">
          <span style="font-size:20px;color:#707175">仓库</span>
        </div>
        <el-collapse v-model="contentActiveNames">
          <el-collapse-item title="组件库" name="1">
            <div>
              自定义Vue组件库，主要分为依赖element-ui与不依赖的两种组件；
            </div>
          </el-collapse-item>
          <el-collapse-item title="效果库" name="2">
            <div>
              使用绘图、动画技术以及Vue的部分特性所实现的视觉效果库；
            </div>
          </el-collapse-item>
          <el-collapse-item title="工具库" name="3">
            <div>纯函数方法库，多用于辅助开发者进行数据处理；</div>
          </el-collapse-item>
          <el-collapse-item title="案例库" name="4">
            <div>
              使用第三方能力所实现的demo案例库；如工作流、拖拽、滚动等；
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col v-bind="personColSpan">
        <div style="padding: 30px 0">
          <span style="font-size:20px;color:#707175">作者</span>
        </div>
        <div class="author-wrapper">
          <el-avatar
            class="author-avatar"
            shape="square"
            :size="50"
            :src="authorInfo.avatar_url"
          />
          <div class="author-main">
            <span class="author-name">{{ authorInfo.name }}</span>
            <a
              class="author-github"
              :href="authorInfo.html_url"
              target="_blank"
            >
              {{ authorInfo.html_url }}
            </a>
          </div>
        </div>
        <div>
          <span></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getGitHubUserInfo } from "@/api";
export default {
  name: "dashboard",
  data: () => ({
    authorInfo: {},
    frameworkActiveNames: ["1", "2", "3", "4"],
    contentActiveNames: ["1", "2", "3", "4"],
    contentColSpan: {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 9,
      xl: 9
    },
    personColSpan: {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 6,
      xl: 6
    }
  }),
  created() {
    getGitHubUserInfo("radwiin").then(rsp => {
      this.authorInfo = rsp;
    });
  }
};
</script>

<style lang="scss" scoped>
.author-wrapper {
  display: flex;

  .author-avatar {
    flex-shrink: 0;
  }

  .author-main {
    flex-grow: 1;
    padding-left: 16px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;

    .author-name {
      font-size: 20px;
    }

    .author-github {
      color: #409eff;
    }
  }
}
</style>
