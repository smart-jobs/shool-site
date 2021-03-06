import * as types from '@/store/.mutation.js';

const topSize = 6;
const pageSize = 10;

const api = {
  simple: '/jobs/jobfair/simple_g',
  query: '/jobs/jobfair/query_g',
  fetch: '/jobs/jobfair/fetch',
  corp_list: '/jobs/jobfair/corp/list',
  calendar: '/jobs/jobfair/calendar',
  corp_apply: '/jobs/jobfair/corp/apply',
  user_apply: '/jobs/jobfair/ticket/apply',
  corp_fetch: '/jobs/jobfair/corp/fetch2',
};
// initial state
export const state = () => ({
  tops: [],
  items: [],
  current: null,
  total: 0,
  corp_list: [],
});

// actions
export const actions = {
  async top({ commit }, paging = {}) {
    const { size = topSize } = paging;
    const params = { skip: 0, limit: size };
    const res = await this.$axios.$get(api.simple, { params });
    if (res.errcode === 0) {
      commit(types.LOADED_TOP, res);
    }
    return res;
  },
  async query({ commit }, { paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page - 1) * size);
    const params = { skip, limit: size };
    const res = await this.$axios.$get(api.query, { params });
    if (res.errcode === 0) {
      commit(types.LOADED_LIST, res);
    }
    return res;
  },
  async fetch({ commit }, { id }) {
    const res = await this.$axios.$get(`${api.fetch}?id=${id}`);
    if (res.errcode === 0) commit(types.LOADED_DETAIL, res.data);
    return res;
  },
  async corplist({ commit }, { id }) {
    const res = await this.$axios.$get(api.corp_list, { params: { fair_id: id, limit: 500 } });
    if (res.errcode === 0) commit(types.LOADED_CORP_LIST, res.data);
    return res;
  },
  async calendar({ commit }, { month }) {
    const res = await this.$axios.$get(`${api.calendar}?month=${month}`);
    return res;
  },
  async corp_apply({ commit }, { corpid, fair_id, jobs }) {
    //
    const params = { corpid: corpid, fair_id: fair_id };
    const res = await this.$axios.$post(api.corp_apply, { jobs }, { params });
    return res;
  },
  async user_apply({ commit }, { userid, fair_id }) {
    //
    const params = { userid: userid, fair_id: fair_id };
    const res = await this.$axios.$post(api.user_apply, null, { params });
    return res;
  },
  async corp_fetch({ commit }, { id }) {
    const res = await this.$axios.$get(api.corp_fetch, { params: { id } });
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED_TOP](state, { data }) {
    state.tops = data;
  },
  [types.LOADED_LIST](state, { data, total }) {
    state.items = data;
    state.total = total;
  },
  [types.LOADED_DETAIL](state, payload) {
    state.current = payload;
  },
  [types.LOADED_CORP_LIST](state, payload) {
    state.corp_list = payload;
  },
};

export const namespaced = true;
