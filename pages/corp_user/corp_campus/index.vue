<template>
  <div class="right data">
    <el-button class="left btnx" type="text" @click="handleAdd">添加宣讲会</el-button>
    <br>
    <ul>
      <li class="fj" v-for="(item,index) in items" :key="index">
        <div class="left fj txtbox">
          <img src="/www/img/logo1.png" class="img left">
          <div class="left titbox">
            <div class="fj">
              <a @click="Obtain(item)" class="left">{{item.subject}}</a>
              <el-button
                class="right btn"
                type="text"
                v-if="item.status == 1"
                @click="handleUpdate(item)"
              >更改</el-button>
            </div>
            <p class="left">举办单位：{{item.corpname}}</p>
            <p>分站信息：{{item.unit}}</p>
            <p>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination class="pv" @current-change="handleCurrentChange" :current-page.sync="size" :page-size="pagesize"
                   layout="prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers,mapGetters } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers(
  "corp_user/corp_campus"
);
export default {
  name: "TabItemJobfair",
  data() {
    return {
      size: 0,
      pagesize: 10,
    };
  },
  methods: {
    ...mapActions(["query"]),
    handleCurrentChange(val) {
      let corpid = this.userinfo.corpid;
      this.size = val
      this.query({ corpid: corpid, size: val, pagesize: this.pagesize });
    },
    Obtain(item) {
      let _id = item._id;
      this.$router.push("/jobs/campus/" + _id);
    },
    handleAdd(item) {
      this.$router.push("/corp_user/corp_campus/updata")
    },
    handleUpdate (item) {
      let _id = item._id;
      this.$router.push({path:"/corp_user/corp_campus/updata",query:{id:_id}});
    }
  },
  mounted() {
    if (this.userinfo !== null) {
      let corpid = this.userinfo.corpid;
      let size = this.size;
      let pagesize = this.pagesize;
      this.query({ corpid: corpid, size: size, pagesize: pagesize });
    }
  },
  computed: {
    ...mapState(["items",'total']),
    ...mapGetters(["userinfo"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "~@/assets/jobs.less";
.titbox {
  width: 90%;
}
.btnx{
  padding: 3px 0;
  display: block;
  background: linear-gradient(#0097c4,#117bb0);
  color: #fff;
  text-align: center;
  padding: 8px;
  margin-left: 3%;
}
</style>
