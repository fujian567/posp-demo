<<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="点餐" name="ordering">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
        <el-table-column  prop="num" label="数量" align="center" width="80"></el-table-column>
        <el-table-column  prop="price" label="金额" align="center" width="80"></el-table-column>
        <el-table-column label="操作" fixed="right" width="160" align="center">
          <template scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">增加</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="totalbox">
        <div class="total">合计</div>
        <div class="totalcount">{{totalCount}}</div>
        <div class="totalmoney">{{totalMoney}}元</div>
      </div>
      <div class="order-handling clear">
        <el-button type="success" @click="settleAccounts()">结账</el-button>
        <el-button type="warning">挂单</el-button>
        <el-button type="danger" @click="delAllGoods()">删除</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="挂单" name="hangorder">挂单</el-tab-pane>
    <el-tab-pane label="外卖" name="takeoutorder">外卖</el-tab-pane>
  </el-tabs>
</template>
<<script>
import store from '@/vuex/store'
import { mapState } from 'vuex';
export default {
  name:'order',
  data() {
     return {
       activeName: 'ordering',       
       tableData: this.$store.state.orderListDataTable
      }
    },
    methods: {
      handleClick(tab, event) {
      },
      handleEdit(index, row) {
        let orderListData = this.$store.state.orderListDataTable
        let totalCount = this.$store.state.totalCount
        let totalMoney = this.$store.state.totalMoney
        let tempGoods=orderListData.filter(e =>e.goodsId == row.goodsId)
        tempGoods[0].num++
        totalCount++
        totalMoney = row.price + totalMoney
        this.$store.commit('updateTotalCount', totalCount)
        this.$store.commit('update', orderListData)
        this.$store.commit('updateTotalMoney', totalMoney)
      },
      handleDelete(index, row) {
        let orderListData = this.$store.state.orderListDataTable
        let totalCount = this.$store.state.totalCount
        let totalMoney = this.$store.state.totalMoney
        orderListData=orderListData.filter(e =>e.goodsId != row.goodsId)
        totalCount=totalCount-row.num
        totalMoney=totalMoney-row.num*row.price
        this.$store.commit('update', orderListData)
        this.$store.commit('updateTotalCount', totalCount)
        this.$store.commit('updateTotalMoney', totalMoney)
        this.tableData=orderListData
      },
      delAllGoods(){
        this.$confirm('此操作将删除所有订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$store.state.orderListDataTable=[]       
          this.tableData=this.$store.state.orderListDataTable
          this.$store.commit('updateTotalCount', 0)
          this.$store.commit('updateTotalMoney', 0)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });        
      },
      settleAccounts(){
        let totalCount = this.$store.state.totalCount
        if(totalCount>0){
          this.$store.state.orderListDataTable=[]       
          this.tableData=this.$store.state.orderListDataTable
          this.$store.commit('updateTotalCount', 0)
          this.$store.commit('updateTotalMoney', 0)
          this.$notify.success({
          title: '成功',
          message: '操作成功',
          offset: 100
          })
        }else{
          this.$notify.error({
          title: '错误',
          message: '订单中没有商品',
          offset: 100
          })
        }
      }
    },
    updated:function(){
    },
    computed:{
      ...mapState(["totalCount"]),
      ...mapState(["totalMoney"])
    },
    store 
}
</script>
<style scoped>
.order-handling{
  margin-top: 20px;
}
.totalbox{
  margin: 10px 0;
   width:100%;
   height: 25px;
}
.total{
 width: 25%;
 float: left;
 text-align: center
}
.totalcount{
 width: 19%;
 float: left;
 text-align: center
}
.totalmoney{
 width: 19%;
float: left;
text-align: center
}
.clear{
  clear:both;
}
</style>


