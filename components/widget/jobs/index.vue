<template>
  <div class="box">
    <div class="header fj">
      <div class="btnbox left">
        <div
          class="btn"
          v-for="(item,index) in tabs"
          :key="index"
          :class="{btnx:index == key}"
          @mouseenter="btnshow(item)"
        >{{item.label}}</div>
      </div>
      <div class="all right">
        <span class="right a" @click="all">更多>></span>
      </div>
    </div>

    <tab-item-jobfair v-show="link == 'jobfair'"/>
    <tab-item-campus v-show="link == 'campus'"/>
    <tab-item-jobinfo v-show="link == 'jobinfo'"/>
  </div>
</template>

<script>
import TabItemCampus from "./campus";
import TabItemJobfair from "./jobfair";
import TabItemJobinfo from "./jobinfo";

export default {
  name: "JobsWidget",
  components: {
    TabItemCampus,
    TabItemJobfair,
    TabItemJobinfo
  },
  data() {
    return {
      key: 0,
      link: "jobfair",
      tabs: [
        {
          label: "招聘会",
          link: "jobfair",
          key: 0
        },
        {
          label: "宣讲会",
          link: "campus",
          key: 1
        },
        {
          label: "招聘信息",
          link: "jobinfo",
          key: 2
        },
      ]
    };
  },
  methods: {
    btnshow(item) {
      this.key = item.key;
      this.link = item.link;
    },
    all() {
      location.href = "/jobs/jobinfo";
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 841px;
  margin-left: 17px;
  height: 373px;
  border-top: 2px solid #60b0f4;
}
.header {
  width: 100%;
}
.btnbox {
  width: 50%;
  border-left: 1px solid #ddd;
  display: flex;
}
.btn {
  width: 33.3%;
  text-align: center;
  font-size: 1em;
  font-weight: 600;
  line-height: 3em;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.btnx {
  border-bottom: 1px solid #fff;
  color: #60b0f4;
}
.all {
  width: 50%;
  color: #60b0f4;
  line-height: 3em;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
}
.icon {
  margin-top: 4%;
  margin-left: 3%;
  margin-right: 5%;
}
.a {
  cursor: pointer;
}
</style>
