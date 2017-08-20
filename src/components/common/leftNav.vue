<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="iconfont icon-wodezichan"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="iconfont icon-jinrudianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="iconfont icon-31huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="iconfont icon-zuanshi"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="iconfont icon-shezhi"></i>
        <div>设置</div>
      </li>
    </ul>  
  </div>
</template>

<script>
export default {
  name: 'leftnav',
  data () {
    return {
    }
  }
}
</script>

<style>
.left-nav{
  width: 5%;
  color: #fff;
  background-color: #1d8ce0;
  height: 100%;
  float: left;
  font-size: 16px;
}
.iconfont{
  font-size: 30px;
}
.left-nav ul{
  padding: 0;
  margin: 0;
}
.left-nav li{
  list-style: none;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom:1px solid #20a0ff;
}
</style>
