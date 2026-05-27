<template>
  <div class="BreweryMap"/>
</template>

<script>
//import MarkerClusterer from '@google/markerclusterer';
import gmapsInit from '@/utils/gmaps';
const locations = [
  {
    position: {
     lat: 27.822545,
      lng: -82.670333,
      name: "Dissent Brewing Co",
      address1:"1133 Baum Ave N",
      address2: "St. Petersburg",
      postalCode: "FL 33705" // don't insert comma in the last item of each marker
    },
  },
  {
    position: {
      lat: 28.014274,
      lng: -82.787507,
      name: "Dissent Brewing Co",
      address1:"1133 Baum Ave N",
      address2: "St. Petersburg",
      postalCode: "FL 33705" // don't insert comma in the last item of each marker
    },
  },
  {
    position: {
      lat: 27.783004,
      lng: -82.657674,
      name: "Dissent Brewing Co",
      address1:"1133 Baum Ave N",
      address2: "St. Petersburg",
      postalCode: "FL 33705" // don't insert comma in the last item of each marker
    },
  },
  
];
export default {
  name: `BreweryMap`,
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);
      geocoder.geocode({ address: `St. Petersburg, Florida` }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });


      const markerClickHandler = (marker) => {
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      };

      const markers = locations.map((location) => {
          const marker = new google.maps.Marker({ ...location, map });
          marker.addListener(`click`, () => markerClickHandler(marker));
          return marker;
        });
  
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.BreweryMap {
  width: 500px;
  height: 500px;
}
</style>