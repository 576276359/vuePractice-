var vm = new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAll:false,
        totalPrice:0,
        delFlag:false,
        currentPro:''
    },
    //过滤器
    filters: {
        formatMoney: function(value) {
            return "¥ "+value.toFixed(2);
        },
    },
    mounted: function() {
        this.$nextTick(function() {
            vm.cartView();
        })
    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get('data/cartData.json', {'id': 123}).then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney:function (product,type) {
            if(type>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if( product.productQuantity<1){
                    product.productQuantity=1
                }
            }
            this.calcTotalPrice()
        },
        selectedPro:function (item) {
            if(typeof item.checked=='undefined'){
                this.$set(item,'checked',true);
            }else{
                item.checked=!item.checked;
            }
         this.calcTotalPrice()
        },
        allCheck:function (flag) {
            this.checkAll=flag;
            var _this=this;
                this.productList.forEach(function (v,i) {
                    if(typeof v.checked=='undefined'){
                        _this.$set(v,'checked',flag);
                    }else{
                        v.checked=flag;
                    }
                })
            this.calcTotalPrice()
        },
        calcTotalPrice:function () {
            var _this=this;
            this.totalPrice=0;
            this.productList.forEach(function (e,i) {
                if(e.checked){
                    _this.totalPrice+=e.productPrice*e.productQuantity;
                }
            })
        },
        delCoform:function (item) {
            this.delFlag=true;
            this.currentPro=item;
        },
        delPro:function () {
            var i=this.productList.indexOf(this.currentPro);
            this.productList.splice(i,1);
            this.delFlag=false;
            this.calcTotalPrice()
        }
    }
})
