<template>
  <div class="pos">
    <el-row>
      <el-col :span="8" id="order-list" class="pos-order">
        <div class="grid-content bg-purple">
          <order></order>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <product></product>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import order from '../order/order'
import product from '../product/product'
export default {
  name: 'pos',
  mounted:function(){
    var orderHight=document.body.clientHeight;
    document.getElementById('order-list').style.height=orderHight+'px'
  },
  components:{
    order,
    product
  }
}
</script>

<style scoped>
.pos-order{
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
</style>
