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
        <span>Exia is a storage for my work.</span>
      </div>
    </div>
    <div style="padding:30px 0 0 30px;">
      <span style="font-size:24px;vertical-align:middle"
        >These are all EXIA hava.</span
      >
    </div>
    <el-row :gutter="30" style="margin:0 20px;">
      <el-col v-bind="contentColSpan">
        <div style="padding: 30px 0">
          <span style="font-size:20px;color:#707175">Framework</span>
        </div>
        <el-collapse v-model="frameworkActiveNames">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col v-bind="contentColSpan">
        <div style="padding: 30px 0">
          <span style="font-size:20px;color:#707175">Component</span>
        </div>
        <el-collapse v-model="contentActiveNames">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col v-bind="personColSpan">
        <div style="padding: 30px 0">
          <span style="font-size:20px;color:#707175">About Author</span>
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
    getGitHubUserInfo("radwiin")
      .then(rsp => {
        this.authorInfo = rsp.data;
      })
      .catch(console.error);
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
