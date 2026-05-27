<template>
  <div class="brewery-map-page">   
    <div class="map-container" ref="mapContainer"></div>
  </div>
</template>

<script>
import firebase from 'firebase'

const GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY

const firebaseConfig = {
  apiKey: GOOGLE_API_KEY,
  authDomain: 'pint-guide-vue-app.firebaseapp.com',
  databaseURL: 'https://pint-guide-vue-app.firebaseio.com',
  projectId: 'pint-guide-vue-app',
  storageBucket: 'pint-guide-vue-app.appspot.com',
  messagingSenderId: '732925644435',
  appId: '1:732925644435:web:2a22602c2083ce7f960766',
  measurementId: 'G-RB7H3VM2MR'
}

function getFirebaseApp() {
  if (firebase.apps && firebase.apps.length) {
    return firebase.app()
  }
  return firebase.initializeApp(firebaseConfig)
}

export default {
  name: 'BreweryMap',
  data() {
    return {
      breweries: [],
      loading: true,
      error: '',
      mapInitialized: false
    }
  },
  async mounted() {
    // Try to initialize map with a delay to allow tab to become visible
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Check if container has height
    const container = this.$refs.mapContainer
    if (container && container.offsetHeight > 0) {
      await this.initializeMap()
    } else {
      // If not visible, wait for it to become visible
      const observer = new MutationObserver(async () => {
        if (container && container.offsetHeight > 0) {
          observer.disconnect()
          await this.initializeMap()
        }
      })
      observer.observe(container.parentElement, {
        attributes: true,
        subtree: true
      })
      
      // Timeout after 5 seconds
      setTimeout(() => {
        observer.disconnect()
        if (!this.mapInitialized) {
          this.error = 'Map failed to initialize: container not visible'
        }
      }, 5000)
    }
  },
  methods: {
    async initializeMap() {
      if (this.mapInitialized) return
      
      console.log('BreweryMap initializing', this.$refs.mapContainer)
      try {
        const google = await this.loadGoogleMaps()
        if (!this.$refs.mapContainer) {
          throw new Error('Map container not found')
        }
        const app = getFirebaseApp()
        const db = app.database()
        const snapshot = await db.ref('breweries').once('value')
        const items = []
        snapshot.forEach(childSnapshot => {
          const item = childSnapshot.val()
          items.push({
            name: item.Name,
            address: item.Address,
            city: item.City,
            zip: item.Zip,
            googleMap: item.GoogleMap,
            untappedid: item.UntappedId
          })
        })
        this.breweries = items

        const map = new google.maps.Map(this.$refs.mapContainer, {
          center: { lat: 27.773, lng: -82.64 },
          zoom: 11,
          gestureHandling: 'greedy'
        })

        const bounds = new google.maps.LatLngBounds()
        const infoWindow = new google.maps.InfoWindow()

        for (const brewery of items) {
          const addressParts = [brewery.address, brewery.city, 'FL', brewery.zip].filter(Boolean)
          const address = addressParts.join(', ')
          if (!address) {
            continue
          }

          try {
            const results = await this.geocodeAddress(google, address)
            if (!results.length) {
              continue
            }
            const location = results[0].geometry.location
            const marker = new google.maps.Marker({
              map,
              position: location,
              title: brewery.name,
              icon: {
                url: `${process.env.BASE_URL || '/'}map-markers/marker-2.svg`,
                scaledSize: new google.maps.Size(35, 48),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 48)
              }
            })
            marker.addListener('mouseover', () => {
              infoWindow.setContent(`<strong>${brewery.name}</strong><br>${address}`)
              infoWindow.open(map, marker)
            })
            marker.addListener('mouseout', () => {
              infoWindow.close()
            })
            marker.addListener('click', () => {
              this.$emit('brewery-selected', brewery.untappedid)
            })
            bounds.extend(location)
          } catch (geocodeError) {
            console.warn('Geocode failed for', address, geocodeError)
          }
        }

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds)
        }
        this.mapInitialized = true
      } catch (initError) {
        this.error = 'Unable to load brewery map. Check the console for details.'
        console.error(initError)
      } finally {
        this.loading = false
      }
    },
    loadGoogleMaps() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          return resolve(window.google)
        }

        const existingScript = document.querySelector('script[data-google-maps]')
        if (existingScript) {
          existingScript.addEventListener('load', () => {
            if (window.google && window.google.maps) {
              resolve(window.google)
            } else {
              reject(new Error('Google Maps script loaded but `window.google.maps` is unavailable.'))
            }
          })
          existingScript.addEventListener('error', reject)
          return
        }

        const apiKey = process.env.VUE_APP_GOOGLE_API_KEY || window.VUE_APP_GOOGLE_API_KEY || GOOGLE_API_KEY
        if (!apiKey) {
          reject(new Error('Missing VUE_APP_GOOGLE_API_KEY'))
          return
        }

        const script = document.createElement('script')
        script.setAttribute('data-google-maps', 'true')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
        script.async = true
        script.defer = true
        script.onload = () => {
          if (window.google && window.google.maps) {
            resolve(window.google)
          } else {
            reject(new Error('Google Maps loaded but `window.google.maps` is unavailable.'))
          }
        }
        script.onerror = () => reject(new Error('Failed to load Google Maps script.'))
        document.head.appendChild(script)
      })
    },
    geocodeAddress(google, address) {
      return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            resolve(results)
          } else {
            reject(status)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.brewery-map-page {
  width: 100%;
}
.map-page-header {
  padding: 2rem 0;
  text-align: center;
}
.map-container {
  width: 100%;
  height: 70vh;
  min-height: 520px;
}
</style>
