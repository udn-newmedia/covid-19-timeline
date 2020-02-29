import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

const restrictionUrl = './data/restriction.json';
const maskUrl = './data/mask.json';

export default new Vuex.Store({
  state: {
    restrictionData: null,
    maskData: null,
    dataType: 'restriction',
  },
  getters: {},
  mutations: {
    getRestrictionData (state) {
      axios.get(restrictionUrl)
      .then(res => {
        if (res.request.readyState && res.status === 200) {
          state.restrictionData = JSON.parse(JSON.stringify(res.data));
        }
      });
    },
    getMaskData (state) {
      axios.get(maskUrl)
      .then(res => {
        if (res.request.readyState && res.status === 200) {
          state.maskData = JSON.parse(JSON.stringify(res.data));
        }
      })
    },
    changeDataType (state, payload) {
      state.dataType = payload;
    },
    updateDataActive (state, payload) {
      // year: ...,
      // date: ...,
      // dataType: ...,
      // status: ...
      if (payload.dataType === 'restriction') {
        state.restrictionData[payload.year][payload.date].active = payload.status;
      }
      if (payload.dataType === 'mask') {
        state.maskData[payload.year][payload.date].active = payload.status;
      }
    },
  },
  actions: {
    getRestrictionData (context) {
      context.commit('getRestrictionData');
    },
    getMaskData (context) {
      context.commit('getMaskData');
    },
    changeDataType (context, payload) {
      context.commit('changeDataType', payload);
    },
    updateDataActive(context, payload) {
      context.commit('updateDataActive', payload);
    }
  }
})