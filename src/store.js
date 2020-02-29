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
      });
    },
    changeDataType (state) {
      if (state.dataType === 'restriction') state.dataType = 'mask';
      else state.dataType = 'restriction';
    },
  },
  actions: {
    getRestrictionData (context) {
      context.commit('getRestrictionData');
    },
    getMaskData (context) {
      context.commit('getMaskData');
    },
    changeDataType (context) {
      context.commit('changeDataType');
    },
  }
})