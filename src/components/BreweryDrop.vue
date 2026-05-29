    <template>

        <div>
            <div class="navigation">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-3">
                            &nbsp;
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <select @change="filterByType(chosenBrewery)" v-model="chosenBrewery" class="form-control brewery-select">
                                <option disabled value="">Select a Brewery</option>
                                <option v-for="(breweries, index) in breweries" :value="breweries.untappedid">{{breweries.name}}</option>
                            </select>
                            <button class="all-brewery-button" v-bind:disabled="!aBarIsChosen" v-on:click.stop="allBreweriesButton()">See All <span class="d-none d-md-inline">Breweries</span></button>
                        </div>              
                        <div class="col-xs-12 col-sm-3">
                            &nbsp;
                        </div>                   
                    </div>
                </div>
            </div>
            <transition appear name="brewery-box">
                <div v-show="!aBarIsChosen" class="container brewery">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6" v-for="(breweries, index) in breweries" v-bind:key="index">

                            <a v-on:click.stop="filterByType(breweries.untappedid)">
                                <div class="card">
                                    <span class="icon">
                                        <img style="max-width:100px;" :src="'/img/breweryLogos/' + breweries.logo + '-logo.png'" />
                                    </span>
                                    <div class="card-banner" v-bind:style='{ backgroundImage: "url(/img/breweryCardBg/" + breweries.logo + "-cardBg.jpg)"}'>
                                        <div class="shade"></div>
                                        <div class="title">
                                            {{breweries.name}}
                                            <span class="sub-title addy">{{breweries.address}}</span>
                                            <span class="sub-title">{{breweries.city}}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </transition>
            <transition appear name="brewery-box">
                <div v-show="aBarIsChosen && !mainSource">
                    <div class="brewery-banner">
                        <img class="d-none d-lg-block d-xl-block" v-bind:src="'/img/breweryBanners/' + chosenBar.logo + '-banner.jpg'" alt="photo from chosenBar.Logo">
                        <img class="d-none d-md-block d-lg-none" v-bind:src="'/img/breweryBanners/' + chosenBar.logo + '-banner-md.jpg'" alt="photo from chosenBar.Logo">
                        <img class="d-block d-sm-none" v-bind:src="'/img/breweryBanners/' + chosenBar.logo + '-banner-sm.jpg'" alt="photo from chosenBar.Logo">
                    </div>
                    <div class="container brewery-details">
                        <div class="row">
                            <div class="col-md-12 col-lg-6">
                                <h1>
                                    {{ chosenBar.name }}
                                </h1>
                                <h3 class="subhead">
                                    Brewery Profile
                                </h3>
                                <p>
                                    {{chosenBar.sppgdescription}}
                                </p>
                                <div class="brewery-quote">
                                    <p>
                                        <strong>How the brewery describes itself:</strong> "<em>{{chosenBar.description}}</em>"
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-12  col-lg-6">
                                <div class="brewery-summary">

                                    <h2>Explore the Brewery</h2>
                                    <div class="summary">
                                        <span class="brewery-label">
                                            <a :href="chosenBar.website">
                                                <img v-bind:src="'/img/breweryLogos/' + chosenBar.logo + '-logo.png'" />
                                            </a>
                                        </span>

                                        <span class="brewery">{{chosenBar.name}}</span>
                                        <span class="addy">{{chosenBar.address}}</span>
                                        <div class="social-links">
                                            <a :href="'http://www.facebook.com/' + chosenBar.facebook" target="_blank">
                                                <img style="width:50px;" src="/img/facebook.svg" />
                                            </a>
                                            <a :href="'http://www.twitter.com/' + chosenBar.twitter" target="_blank">
                                                <img style="width:50px;" src="/img/twitter.svg" />
                                            </a>
                                            <a :href="'http://www.' + chosenBar.website" target="_blank">
                                                <img style="width:50px;" src="/img/web.svg" />
                                            </a>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="iframe-container">
                                            <iframe :src="chosenBar.googlemap" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <section v-if="photos" class="gallery-section ss-style-doublediagonal">
                        <h3 class="centered gallery-head">Take A Look Around</h3>
                        <div class="gallery">

                            <slick ref="slick" :options="slickOptions">
                                <div v-for="(n, index) in photos">
                                    <img v-bind:src="'/img/photos/' + chosenBar.logo + '/' + n + '.jpg'" />
                                </div>
                            </slick>
                            
                        </div>
                    </section>

                    <section class="beer-list">
  <ul class="nav nav-tabs">
    <li 
      class="nav-item"
      :class="{ 'w-100': !reviewedBeers || !reviewedBeers.length }"
    >
      <a class="nav-link active" data-toggle="tab" href="#all">
        <h3 class="text-center tab-h3">All Beers on Tap</h3>
      </a>
    </li>           

    <li 
      v-if="reviewedBeers && reviewedBeers.length"
      class="nav-item reviewed-beers-tab"
    >
      <a class="nav-link" data-toggle="tab" href="#had">
        <h3 class="text-center tab-h3">
          Beers We've <br class="d-block d-sm-none" />Had
        </h3>
      </a>
    </li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane container active" id="all">
      <beers :stringProp="chosenBar.untappedid"></beers>
    </div>

    <div 
      v-if="reviewedBeers && reviewedBeers.length"
      class="tab-pane container"
      id="had"
    >
      <reviewedbeers :nameProp="chosenBar.name"></reviewedbeers>
    </div>
  </div>
</section>
                    <section class="comment-section">
                        <div class="row">
                        <div class="container">

                                <div class="comments">
                                    <vue-disqus shortname="stpetepintguide" :identifier="chosenBar.name" url="http://stpetepintguide.com/"></vue-disqus>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </transition>
        </div>
    </template>

    <script>
        import _ from 'lodash';
        import $ from 'jquery';
        import Vue from 'vue';
        import VueDisqus from 'vue-disqus';
        Vue.use(VueDisqus);
        import Slick from 'vue-slick';
        import BeerDash from '@/components/BeerDash.vue';
        import ReviewedBeerDash from '@/components/ReviewedBeerDash.vue';
        import PhotoDash from '@/components/PhotoDash.vue';
        //import BreweryTwitter from '@/components/BreweryTwitter.vue';

        import firebase from 'firebase';
        import 'firebase/firestore';

        const GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY

        // firebase init goes here
        const config = {
            apiKey: GOOGLE_API_KEY,
            authDomain: "pint-guide-vue-app.firebaseapp.com",
            databaseURL: "https://pint-guide-vue-app.firebaseio.com",
            projectId: "pint-guide-vue-app",
            storageBucket: "pint-guide-vue-app.appspot.com",
            messagingSenderId: "732925644435",
            appId: "1:732925644435:web:2a22602c2083ce7f960766",
            measurementId: "G-RB7H3VM2MR"
        }
        let app = firebase.initializeApp(config);
        let db = app.database();
        let breweriesRef = db.ref("breweries");

        var cachedBreweries = [];
        var breweries = [];
        var chosenBar = [];
        var photos = [];
        var aBarIsChosen = false;
        var chosenBrewery = '';

        export default {
            name: 'BreweryDrop',

            data() {
                return {
                    breweries: [], slickOptions: {
                        arrows: false,
                        dots: false,
                        infinite: true,
                        slidesToShow: 2,
                        autoplay: true,
                        autoplaySpeed: 8000,
                        responsive: [
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,

                            }
                        },]
                //slidesToScroll: 3
                // Any other options that can be got from plugin documentation
            },cachedBreweries: [], photos: [], chosenBrewery, chosenBar, aBarIsChosen
        }
    },
    components: {
        Slick ,
        'beers': BeerDash,
        'reviewedbeers': ReviewedBeerDash,
        //'twitterfeed': BreweryTwitter,
        'photos': PhotoDash
    },
    computed: {
        chosenYet() {
            return aBarIsChosen;
        }
    },
    created() {
        db.ref("breweries")
        .once("value")
        .then(dataSnapshot => {
            const itemsArray = [];
            dataSnapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                itemsArray.push({
                    address: childData.Address,
                    city: childData.City,
                    description: childData.Description,
                    facebook: childData.Facebook,
                    googlemap: childData.GoogleMap,
                    instagram: childData.Instagram,
                    logo: childData.Logo,
                    name: childData.Name,
                    photos: childData.Photos,
                    sppgdescription: childData.SppgDescription,
                    twitter: childData.Twitter,
                    untappedid: childData.UntappedId,
                    website: childData.Website,
                    zip: childData.Zip                
                });
            });
            this.cachedBreweries = itemsArray;
            this.breweries = this.cachedBreweries;
            this.chosenBar = this.breweries[0];     
        });
        

    },
    methods: {
        resetWindow() {
            this.breweries = this.cachedBreweries;
            this.aBarIsChosen = false;
            this.chosenBar = "";
        },
        beforeUpdate() {
            if (this.$refs.slick) {
                this.$refs.slick.destroy();
            }
        },
        updated() {
            this.$nextTick(function () {
                if (this.$refs.slick) {
                    this.$refs.slick.create(this.slickOptions);
                }
            });
        },
        reInit() {

            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
        disqusSet(sortKey) {
            DISQUS.reset({
                reload: true,
                config: function () {  
                    this.page.identifier = sortKey;  
                    this.page.url = "http://stpetepintguide.com/#!" + sortKey;
                }
            });
        },
        allBreweriesButton() {
            this.resetWindow();
            this.chosenBrewery = '';
        },       
        filterByType(sortKey) {
            this.resetWindow();
            this.beforeUpdate();
            for (var i = 0, iLen = this.breweries.length; i < iLen; i++) {
                if (this.breweries[i].untappedid == sortKey) {
                    this.chosenBar = this.breweries[i];
                    this.aBarIsChosen = true;
                    this.disqusSet(sortKey);
                    this.photos = this.breweries[i].photos;
                    this.updated();
                    var target = $('#app');
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 0);
                        return false;
                    }
                }
            }
        }
    }
}
</script>

<style lang="less" src="@/assets/styles/components/brewery-dash.less">
</style>
<style lang="less" src="@/assets/styles/components/slick.less">
</style>
