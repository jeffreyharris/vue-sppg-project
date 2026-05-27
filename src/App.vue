<template>
  <div id="app">

                    <button type="button" class="contact-us-button" data-toggle="modal" data-target="#exampleModal">
                        Contact Us
                    </button>
           
    <div class="header">
      <div class="container">
        <div class="logo animated bounceIn">
            <a href="/">
                <img src="/img/logos/st-pete-pint-guide.svg" />
            </a>
            <h1>A comprehensive guide to the craft breweries of Sunshine City</h1>
        </div>
      </div>
    </div>
       
   


    <router-view/>

    
    <div class="footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <a href="/">
                    <img class="footer-sppg-logo" alt="St. Petersburg Pint Guide" src="/img/logos/sppg-white-logo.svg" />
                </a>

                <p>
                    &copy; 2026 St Pete Pint Guide
                </p>
                <p>
                    All product names, trademarks and registered trademarks are property of their respective owners.

                    All company, product and service names used in this website are for identification purposes only.

                    Use of these names,trademarks and brands does not imply endorsement.
                </p>
                <p>
                    Some beer statistics and information on breweries provided by <a href="https://untappd.com/" target="_blank">UNTAPPD</a>
                </p>
                <a href="https://untappd.com/" target="_blank">
                    <img class="un-logo" src="/img/logos/pbu_40_white.png" />
                </a>
            </div>
        </div>
    </div>
</div>
</div>

</template>

<style lang="less" src="@/assets/styles/components/header-footer.less">

</style>

