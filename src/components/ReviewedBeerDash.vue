<template> 

<div class="container">
<div class="row reviewed-beers-row">

<div class="col-xs-12 col-sm-12" v-for="(reviewedBeers, index) in reviewedBeers" >

    <div class="beer-card reviewed-beer-card">
      <div class="row">
          <div class="col-sm-7">
            <img :src="'/img/beers/' + reviewedBeers.AssetName + '-cardBg.jpg'" />
            
          </div>
          <div class="col-sm-5 stats"> 
          <span class="name">{{reviewedBeers.Name}}</span>
          <strong>SPPG Description:</strong> </br> 
            <p>{{reviewedBeers.SppgDescription}}</p>
            <br />
            <strong>How the Brewery <span style="white-space:nowrap;">Describes it:</span></strong><br />  
            <p>{{reviewedBeers.BreweryDescription}}</p>
            <p>
                <span class ="number">TYPE: {{reviewedBeers.Type}}</span>
                <span class ="number">ABV: {{reviewedBeers.Abv}}</span>
                <span class ="number">IBU: {{reviewedBeers.Ibu}}</span>
                <span class ="number bottom-number">CALORIES: {{reviewedBeers.Calories}}</span>
            </p>
          </div>
      </div>

          <div class="clearfix"></div>     
    </div>
  </div>

</div>
</div>

</template>


<script>
 import $ from 'jquery'

var reviewedBeers = 
[
  {
    "ID": "1",
    "Name": "Sunshine City IPA",
    "SppgDescription": "Baring the nickname of St. Petersburg, the Sunshine City IPA is one of the most well-known beers from Green Bench. An advantage of being a fan of this beer is that it is available in stores across Tampa Bay. It features a medium body with great tropical taste and the tang of hops. Awesome for drinking at the beach or by the pool.",
    "BreweryDescription": "In celebration of our beautifully sunny city, this IPA was designed\r\n            to be a bright as the warmest summer day. Packed with hop flavor and aroma,\r\n            we double dry hop this beer with equal parts of Mosaic, Citra and Azacca, for\r\n            an intensely tropical profile reminiscent of tangerine, nectar, papaya,\r\n            peach, kiwi, and pineapple.",
    "Abv": "7.0",
    "Ibu": "68",
    "Calories": "210",
    "Type": "IPA",
    "AssetName": "suncityipa",
    "BreweryId": "1",
    "BreweryName": "Green Bench Brewing Co",
    "BeerColor": "pale-gold"
  },
  {
    "ID": "2",
    "Name": "Happy Hermit IPA",
    "SppgDescription": "SPPG review coming soon...",
    "BreweryDescription": "Silas Dent lived a simple and happy life on Cabbage Key in a hut made of palm fronds, surrounded by mangroves and wildlife with no running water and no electricity. In 1948 Dent was featured in LIFE magazine, who named him “The Happy Hermit of Cabbage Key.” It was said that Dent could forecast the weather, calculate the temperature, and commune with Poseidon himself. Before his death at the age of 76 in 1952, Dent claimed that “civilization is too dangerous.” Our Happy Hermit Pale Ale is a sessionable, hop forward approach to the style that is a perfect match for a breezy St. Petersburg afternoon, and like Silas, is one of a kind.",
    "Abv": "5.0",
    "Ibu": "6",
    "Calories": "200",
    "Type": "IPA",
    "AssetName": "happyhermit",
    "BreweryId": "1",
    "BreweryName": "Green Bench Brewing Co",
    "BeerColor": "deep-gold"
  },
  {
    "ID": "3",
    "Name": "Turbid 7",
    "SppgDescription": "Another great Turbid from Green Bench. This one is easy to drink with a nice light hoppy and citrus taste. Like the other Turbids, it's also not as sweet as it looks. Overall this is a great summer afternoon beer given its ease to drink and its reasonable ABV. ",
    "BreweryDescription": "This is the 7th addition in our Turbid IPA series. Each beer in the series is brewed with a New England yeast strain, accompanied by a rotating hop profile. This baby was triple dry hopped with Simcoe, Mosaic and Citra!",
    "Abv": "6.5",
    "Ibu": "0",
    "Calories": "0",
    "Type": "NE IPA",
    "AssetName": "turbid7",
    "BreweryId": "1",
    "BreweryName": "Green Bench Brewing Co",
    "BeerColor": "deep-gold"
  },
  {
    "ID": "4",
    "Name": "Galaxy Cat",
    "SppgDescription": "If you are looking for a pale ale, this one is sure to please. It’s easy to drink with just a slight taste of hop and notes of citrus, but nothing very strong.",
    "BreweryDescription": "Passion fruity character along with aromas and flavors of clean citrus and peach. It also carries threads of pineapple and tropical fruit. Its characteristics are all fruit with no floral, pine or spice.",
    "Abv": "4.5",
    "Ibu": "35",
    "Calories": "0",
    "Type": "American Pale Ale",
    "AssetName": "galaxyCat",
    "BreweryId": "6",
    "BreweryName": "Cage Brewing",
    "BeerColor": "pale-amber"
  },
  {
    "ID": "5",
    "Name": "Peach Wheat",
    "SppgDescription": "This wheat beer packs a punch of peach that you will notice right away. It has a bit of a sweet taste at first and then ends on a sour note. This medium bodied wheat beer is great for anyone looking for some peach flavor, but you may only need one before moving onto something easier to drink.",
    "BreweryDescription": "No brewery description available.",
    "Abv": "5.5",
    "Ibu": "28",
    "Calories": "0",
    "Type": "Wheat",
    "AssetName": "peachWheat",
    "BreweryId": "12",
    "BreweryName": "Pinellas Ale Works",
    "BeerColor": "pale-gold"
  },
  {
    "ID": "6",
    "Name": "Skyway IPA",
    "SppgDescription": "Coming in at 8.2 ABV and 70 IBU, this Double IPA is intense in both strength and flavor. Heavy IPA enthusiasts will not be disappointed in its rich taste stemming from the use of 5 different hops. This is yet another good Florida beverage for a St. Pete brewery visitor. ",
    "BreweryDescription": "Equally as beautiful to behold is our New England-style double dry hopped Double IPA with five of our favorite tropical and resinous hop varieties. This Double IPA is al smooth as they come. Built to be uniquely drinkable, Skyway can be enjoyed year round in our beautifully tropical climate. ",
    "Abv": "8.2",
    "Ibu": "70",
    "Calories": "0",
    "Type": "Double IPA",
    "AssetName": "skywayipa",
    "BreweryId": "1",
    "BreweryName": "Green Bench Brewing Co",
    "BeerColor": "deep-gold"
  }
]


export default {
  name: 'ReviewedBeerDash',
        props: {
            nameProp: String          
        },
        data: function() {
          return {
            reviewedBeers 
          }
        }, 
        created() {
                this.reviewedBeers = reviewedBeers;
                var beerListCount = this.reviewedBeers.length;
                var x;
                var beerList = [];
                for (x = 0; x < beerListCount; x++) {
                    var breweryName = this.reviewedBeers[x].BreweryName;
                    if (breweryName === this.nameProp) {
                        beerList.push(this.reviewedBeers[x]);
                    }
                }
                beerList.sort();
                this.reviewedBeers = beerList;       
        },
        methods: {
            checkTab(){
                if (this.reviewedBeers.length == 0){
                    $('.reviewed-beers-tab').hide();
                }
                else{
                    $('.reviewed-beers-tab').show();
                }   
            }
        },
        watch: {
            nameProp(newValue) {
                this.reviewedBeers = reviewedBeers;
                var beerListCount = this.reviewedBeers.length;
                var x;
                var beerList = [];
                for (x = 0; x < beerListCount; x++) {
                    var breweryName = this.reviewedBeers[x].BreweryName;
                    if (breweryName === this.nameProp) {
                        beerList.push(this.reviewedBeers[x]);
                    }
                }
                beerList.sort();
                this.reviewedBeers = beerList;
                this.checkTab();
            }
        }

}
</script>






<style lang="less" src="@/assets/styles/components/beer-dash.less">
</style>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>


