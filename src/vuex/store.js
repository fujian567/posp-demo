import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    orderListDataTable: [],
    totalCount: 0,
    totalMoney: 0
}

const mutations={
    update(state,tempData){
        state.orderListDataTable=tempData
    },
    updateTotalCount(state,totalCount){
        state.totalCount=totalCount
    },
    updateTotalMoney(state,totalMoney){
        state.totalMoney=totalMoney
    }
}

export default new Vuex.Store({
    state,
    mutations
})