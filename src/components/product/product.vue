<template>
  <div>
      <div class="often-product">
          <div class="title">常用商品</div>
          <div class="product-list">
            <ul>
                <li v-for="product in oftenProducts" @click="addOrderList(product)">
                    <span class="op-title">{{product.goodsName}}</span>
                    <span class="op-price">￥{{product.price}}元</span>
                </li>
            </ul>
          </div>
      </div>
      <div class="product">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="汉堡" name="hamburg">
                <div class="product-list">                   
                    <ul>
                        <li v-for="hamburg in hamburgs" @click="addOrderList(hamburg)">
                            <span class="hb-img">
                                <img :src=hamburg.goodsImg width="100%">
                            </span>
                            <span class="hb-title">{{hamburg.goodsName}}</span>
                            <span class="hb-price">￥{{hamburg.price}}元</span>
                        </li>
                    </ul> 
                </div>
            </el-tab-pane>
            <el-tab-pane label="小食" name="snack">
              <div class="product-list">                   
                    <ul>
                        <li v-for="snack in snacks" @click="addOrderList(snack)">
                            <span class="hb-img">
                                <img :src=snack.goodsImg width="100%">
                            </span>
                            <span class="hb-title">{{snack.goodsName}}</span>
                            <span class="hb-price">￥{{snack.price}}元</span>
                        </li>
                    </ul> 
                </div>  
            </el-tab-pane>
            <el-tab-pane label="缤纷饮料" name="drinks">
                <div class="product-list">                   
                    <ul>
                        <li v-for="drink in drinks" @click="addOrderList(drink)">
                            <span class="hb-img">
                                <img :src=drink.goodsImg width="100%">
                            </span>
                            <span class="hb-title">{{drink.goodsName}}</span>
                            <span class="hb-price">￥{{drink.price}}元</span>
                        </li>
                    </ul> 
                </div>  
            </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import store from '@/vuex/store'
export default {
    name: 'product',
    data() {
        return {
            activeName: 'hamburg',
            oftenProducts: [],
            hamburgs: [],
            snacks: [],
            drinks: []
        }
    },
    created: function () {
         axios.get('/api/oftenGoods').then(retData => {
            this.oftenProducts = retData.data.data
        }
        ).catch(error => {
            console.log(error)
        }),
        axios.get('/api/typeGoods').then(retData => {
            this.hamburgs = retData.data.data[0]
            this.snacks = retData.data.data[1]
            this.drinks = retData.data.data[2]
        }
        ).catch(error => {
             console.log(error)
        })
    },
    methods: {
        handleClick(tab, event) {
        },
        addOrderList(product) {
            let isExist = false
            let orderListData = this.$store.state.orderListDataTable
            let totalCount = this.$store.state.totalCount
            let totalMoney = this.$store.state.totalMoney
            if (orderListData.length > 0){
                for (let i = 0; i < orderListData.length ; i++){
                    if (orderListData[i].goodsId == product.goodsId) {
                       isExist=true
                    }
                }
            }        
            if(isExist){
                let tempGoodsIdArr=orderListData.filter(e =>e.goodsId == product.goodsId)
                // let tempGoodsIdArr=orderListData.filter(function(orderListData){
                //     return orderListData.goodsId==product.goodsId
                // })
                tempGoodsIdArr[0].num++                
            }else{
                orderListData.push({ 'goodsName': product.goodsName, 'num': 1, 'price': product.price, 'goodsId': product.goodsId });                     
            } 
            totalMoney = product.price + totalMoney
            totalCount++
            this.$store.commit('updateTotalCount', totalCount)
            this.$store.commit('updateTotalMoney', totalMoney)
            this.$store.commit('update', orderListData)
            console.log(orderListData)
        }
    },
    store
}
</script>
<style scoped>
.often-product{
    height: 200px;
    width: 100%;
    
}
.often-product .title{
    height: 41px;
    text-align: left;
    padding-left: 20px;
    border-bottom: 1px solid #dedcc6;
    line-height:41px;
    font-weight: bold;
    background-color: #f9fafc;
}
.product-list{
    margin: 10px 0 0 10px;
}
.often-product li{
    float: left;
    margin: 4px 6px;
    padding: 4px 6px;
    background-color: #fff;
    border: 1px solid #e5e9f2; 
    cursor: pointer;   
}
.op-title,.op-price{
    font-size: 15px;
}
.op-price{
      color:#58b7ff; 
   }
.product{
clear: both;
}
.product li{
    float: left;
    margin: 2px;
    padding:2px;
    background-color: #fff;
    border: 1px solid #e5e9f2;
    width: 23%;  
    height: auto;  
    overflow: hidden;
    cursor: pointer;
}
.product li span{
    float: left;
    display: block;
}
.hb-img{
    width: 40%;
}
.hb-title{
    padding-left: 10px;
    font-size: 18px;
    color:brown;
}
.hb-price{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
}
</style>


