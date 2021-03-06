// 求职信
import * as types from '@/store/.mutation.js';

const api = {
  query: '/jobs/letter/list',
  fetch: '/jobs/letter/fetch',
  reply: '/jobs/letter/reply',
};
// initial state
export const state = () => ({
  items: [],
  currents: null,
  total: null,
});

// actions
export const actions = {
  async query({ commit }, { corpid,type,size,pagesize }) { // 查询
    const params = { corpid:corpid,type:type,limit:pagesize,skip:(size-1)*pagesize };
    const res = await this.$axios.$get(api.query,{ params });
    if (res.errcode === 0) {
      commit(types.LOADED_LIST, res);
    }
    return res;
  },
  async fetch({ commit }, { id }) { // 详细查询
    const params = { id:id };
    const res = await this.$axios.$get(api.fetch,{ params });
    if (res.errcode === 0) {
      commit(types.LOADED_DETAIL, res.data);
    }
    return res;
  },
  async reply({ commit }, {id,corpid,reply,status} ) { // 回复
    const params = {id:id,corpid:corpid};
    const parameter = {reply:reply,status:status}
    const res = await this.$axios.$post(api.reply, { ...parameter},{params});
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED_LIST](state, res) {
    state.items = res.data
    state.total = res.total
  },
  [types.LOADED_DETAIL](state, data) {
    state.currents = data
  },
};

export const namespaced = true;
