<template> 

<div class="container">
<div class="row">

<div class="col-xs-12 col-sm-12">

    <div class="photoCaro">          
            
        <div><img class="caro-img" src="img/photos/greenbench/1.jpg"></div>
        <div><img class="caro-img" src="img/photos/greenbench/2.jpg"></div>
        <div><img class="caro-img" src="img/photos/greenbench/3.jpg"></div>
        <div><img class="caro-img" src="img/photos/greenbench/4.jpg"></div>
        <div><img class="caro-img" src="img/photos/greenbench/5.jpg"></div>
        <div><img class="caro-img" src="img/photos/greenbench/6.jpg"></div>
        <div><img class="caro-img" src="img/photos/greenbench/7.jpg"></div>
            
    </div>
  </div>

</div>
</div>

</template>


<script>
 import $ from 'jquery';
 import Slick from 'vue-slick';
 

var brand = '';
var count = '';


export default {
  name: 'PhotoDash',
        props: {
            nameProp: String,
            photoCountProp: Number          
        },
        data: function() {
          return {
            brand, count
          }
        }, 
        created() {
          this.brand = this.nameProp;
          this.count = this.photoCountProp;             
        },
        methods: {
            /*checkTab(){
                if (this.reviewedBeers.length == 0){
                    $('.reviewed-beers-tab').hide();
                }
                else{
                    $('.reviewed-beers-tab').show();
                }   
            }*/
        },
        watch: {
            nameProp(newValue) {
               //$('.photoCaro').slick('unslick');
                
                //debugger;
                //this.checkTab();
            }
        }

}
</script>






<style lang="less" src="@/assets/styles/components/beer-dash.less">
</style>
<style lang="less" src="@/assets/styles/components/slick.less">
</style>




