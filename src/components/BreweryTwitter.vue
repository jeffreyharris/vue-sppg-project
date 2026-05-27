<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <a class="twitter-timeline" data-tweet-limit="3" :href="'https://twitter.com/' + twitterfeed" data-screen-name="'twitterfeed'"></a>
            </div>
        </div>
    </div>
</template>


<script>
    import $ from 'jquery'
    //var twitterfeed = 'GreenBenchBrew';
    var twitterfeed = 'GreenBenchBrew';
    export default {
        name: 'BreweryTwitter',
        props: {
            twitterProp: String
        },
        data() {
            return {
                twitterfeed
            }
        },
        watch: {
            twitterProp(newValue) { 
         
                this.twitterfeed = this.twitterProp
                twttr.widgets.load(); 
            }
        }
    }
</script>


<style lang="less" src="@/assets/styles/components/beer-dash.less">
</style>

