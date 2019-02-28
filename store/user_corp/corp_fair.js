// 招聘会
import * as types from '@/store/.mutation.js';

const api = {
  query: '/jobs/jobfair/corp/mylist',
  fetch: '/jobs/jobfair/corp/fetch',
  delete: '/jobs/jobfair/corp/job/delete',
  update:' /corp/job/update'
};
// initial state
export const state = () => ({
  items: [],
  fetchlist: null,
});

// actions
export const actions = {
  async query({ commit }, { corpid }) { // 查询
    const params = { corpid:corpid };
    const res = await this.$axios.$get(api.query, { params });
    if (res.errcode === 0) {
      commit(types.LOADED_TOP, res);
    }
    return res;
  },
  async fetch({ commit }, {corpid,fair_id} ) { // 详细查询
    const params = {corpid:corpid,fair_id:fair_id};
    const res = await this.$axios.$get(api.fetch, { params });
    if (res.errcode === 0) {
      commit(types.LOADED_DETAIL, res);
    }
    return res;
  },
  async delete({ commit }, {corpid,job_id} ) { // 删除
    const params = {corpid:corpid,job_id:job_id};
    const res = await this.$axios.$post(api.delete, null, { params });
    if (res.errcode === 0) {
      commit(types.LOADED_DETAIL, res);
    }
    return res;
  },
  async update({ commit }, {corpid,job_id,name,count,requirement} ) { // 修改
    const params = {corpid:corpid,job_id:job_id};
    const parameter = {name:name,count:count,requirement:requirement}
    const res = await this.$axios.$post(api.delete, {parameter}, { params });
    if (res.errcode === 0) {
      commit(types.LOADED_DETAIL, res);
    }
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED_TOP](state, { data}) {
    state.items = data
  },
  [types.LOADED_DETAIL](state, { data }) {
    state.fetchlist = data
    console.log(data)
  }
};

export const namespaced = true;