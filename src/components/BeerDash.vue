<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <select @change="filterByType(sortKey)" v-model="sortKey" class="form-control beer-select">
                    <option disabled value="">Select a Beer Type</option>
                    <option v-for="(beerCategory, index) in beerCategories" :value="beerCategory">{{ beerCategory }}</option>
                </select>
            </div>
        </div>

        <div class="row">

            <div class="col-sm-12 col-md-6 tapped" v-for="(filteredBeer, index) in filteredBeers" v-bind:key="filteredBeer.beer.beer_name">
                <div class="beer-card">
                    
                    <div class="row">
                        <div class="col-sm-12 col-md-3 label">
                            <img :src="filteredBeer.beer.beer_label" />
                        </div>
                          <div class="col-sm-12 col-md-9 label">
                            <span class="name">{{filteredBeer.beer.beer_name}}</span>
                            <div class="stats">
                            <p>
                                <span class="type"><strong>{{filteredBeer.beer.beer_style}}</strong></span>
                                <span class="number">ABV: {{filteredBeer.beer.beer_abv}}</span>
                                <span class="number">IBU: {{filteredBeer.beer.beer_ibu}}</span>
                                <span class="number">UNTAPPED SCORE: {{filteredBeer.beer.rating_score}} / 5</span>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="head-line"></div>
                <img class="untap-logo" src="/img/logos/pbu_40_white.png" />
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    import $ from 'jquery';
    import _ from 'lodash';

    var sortKey = "";

    export default {
        name: 'BeerDash',
        props: {
            stringProp: Number
        },
        data() {
            return {
                beerlistdatas: [], sortKey, beerCategories: [], filteredBeers: []
            }
        },
        mounted() {
            this.getBeerlistdatas();
        },
        methods: {
            getBeerlistdatas() {
            if(this.stringProp == undefined){
                return
            }
                var beerLocalStorageItem = this.stringProp + '-beerlist';
                var currentStoredList = localStorage.getItem(beerLocalStorageItem);
                var todaysDay = new Date().getDay();
                var currentStoredDay;
                //CHECK AGE OF BEERLIST AN FETCH NEW ONE IF NEEDED
                if (currentStoredList != null) {
                    var currentStoredDay = JSON.parse(currentStoredList).date;
                }
                if (currentStoredDay != todaysDay) {
                    axios.get('https://api.untappd.com/v4/brewery/info/' + this.stringProp + '?client_id=CC854055B47EB37CC46B3852E7C15FD62FD0C0E7&client_secret=905A4F76B1D5E81CA8CCB63858DF028CB88E95D2')
                        .then(response => {

                            this.beerlistdatas = response.data.response.brewery.beer_list.items;
                            this.filteredbeers = response.data.response.brewery.beer_list.items;
                            this.updateSelectDrop();
                            this.filterByType("");
                            var localStorageItemName = this.stringProp + '-beerlist';
                            var localStorageItemdate = new Date().getDay();
                            var localStorageResult = "";
                            var localStorageResult = JSON.stringify(response);
                            var localStorageObject = { name: localStorageItemName, date: localStorageItemdate, data: localStorageResult };
                            localStorage.setItem(localStorageItemName, JSON.stringify(localStorageObject));

                        });
                }
                else {
                    var parseLocalStorage = JSON.parse(currentStoredList);
                    var beerIntoObject = JSON.parse(parseLocalStorage.data);
                    const beerList = beerIntoObject.data.response.brewery.beer_list.items;
                    this.beerlistdatas = beerList;
                    this.filteredBeers = beerList;
                    this.updateSelectDrop();
                    this.filterByType("");
                }
            },
            filterByType(sortKey) {
                var beerType = sortKey;

                this.filteredBeers = _.filter(this.beerlistdatas, function (o) {
                    var anIpaBeer = o.beer.beer_style.includes(beerType);
                    return anIpaBeer;

                });

                //this.animateCards('.beer-card')

            },

            animateCards(element) {
                var node = $(element);
                node.addClass("animated flipInX")
                    .one(
                        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                        function () {
                            node.removeClass("animated flipInX");
                        }
                    );
            },

            updateSelectDrop() {
                var beerListCount = this.beerlistdatas.length;
                var x;
                var beerTypeList = [];
                for (x = 0; x < beerListCount; x++) {
                    var beerType = this.beerlistdatas[x].beer.beer_style;
                    if (beerTypeList.includes(beerType) === false) {
                        beerTypeList.push(beerType);
                    }
                }
                beerTypeList.sort();
                this.beerCategories = beerTypeList;
            }
        },
        watch: {
            stringProp(newValue) {
                this.getBeerlistdatas();
            }
        }
    }
</script>

<style lang="less" src="@/assets/styles/components/beer-dash.less">
</style>

