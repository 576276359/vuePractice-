new Vue({
    el:".address",
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function () {
        this.$nextTick(function () {
         this.getAddressList()
        })
    },
   computed:{
     filterAddress:function () {
         return this.addressList.slice(0,this.limitNum);
     }
   },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get('data/address.json').then(function (res) {
                var res=res.data;
                if(res.status==0){
                    _this.addressList=res.result;
                }
            })
        },
        loadMore:function () {
            this.limitNum=this.addressList.length;
        },
        setDefault:function (id) {
            this.addressList.forEach(function (e,i) {
                if(e.addressId==id){
                    e.isDefault=true;
                }else{
                    e.isDefault=false;
                }
            })
        }
    }
})