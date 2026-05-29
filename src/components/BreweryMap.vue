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

const pintGuideMapStyles = [
  // Base land/background - soft neutral
  {
    elementType: 'geometry',
    stylers: [{ color: '#f6efe6' }]
  },

  // Global labels
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5f5145' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f6efe6' }]
  },

  // Water - darker blue
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#1d5f7a' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d5f7a' }]
  },

  // Regular roads - lighter and more muted so markers pop
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ead8c5' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#f9f4ee' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8b7867' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f6efe6' }]
  },

  // Highways - still visible, but toned down a bit
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#e9b072' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#cf8a45' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6c4a2d' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f6efe6' }]
  },

  // Parks - very muted, almost blending in
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5ebe4' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#768275' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f6efe6' }]
  },

  // General POI background - very neutral
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#f3ede5' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#978675' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f6efe6' }]
  },

  // Hide clutter so custom markers stand out
  {
    featureType: 'poi.business',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.attraction',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.government',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.medical',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.place_of_worship',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit.station.airport',
    stylers: [{ visibility: 'off' }]
  },

  // Administrative boundaries
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#cbb7a0' }]
  },

  // City names - warm brown
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7a4b2a' }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f6efe6' }]
  },

  // Neighborhood / smaller admin labels
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8b6a52' }]
  },

  // Landscape
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f6efe6' }]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#efe6db' }]
  }
]

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
    await new Promise(resolve => setTimeout(resolve, 100))

    const container = this.$refs.mapContainer

    if (container && container.offsetHeight > 0) {
      await this.initializeMap()
    } else {
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
            untappedid: item.UntappedId,
            logo: item.logo || item.Logo || ''
          })
        })

        this.breweries = items

        const map = new google.maps.Map(this.$refs.mapContainer, {
          center: { lat: 27.773, lng: -82.64 },
          zoom: 11,
          gestureHandling: 'cooperative',
          styles: pintGuideMapStyles,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })

        const bounds = new google.maps.LatLngBounds()
        const infoWindow = new google.maps.InfoWindow()

        // Optional: close the popup when clicking elsewhere on the map
        map.addListener('click', () => {
          infoWindow.close()
        })

        for (const brewery of items) {
          const addressParts = [
            brewery.address,
            brewery.city,
            'FL',
            brewery.zip
          ].filter(Boolean)

          const address = addressParts.join(', ')

          if (!address) continue

          try {
            const results = await this.geocodeAddress(google, address)

            if (!results.length) continue

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

            marker.addListener('click', () => {
              infoWindow.setContent(this.getInfoWindowContent(brewery, address))
              infoWindow.open(map, marker)

              google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                const detailButton = document.querySelector('.brewery-info-button')

                if (detailButton) {
                  detailButton.addEventListener('click', () => {
                    this.$emit('brewery-selected', brewery.untappedid)
                    infoWindow.close()
                  })
                }
              })
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

    getInfoWindowContent(brewery, address) {
      const logoSrc = brewery.logo
        ? `/img/breweryLogos/${brewery.logo}-logo.png`
        : ''

      const logoMarkup = logoSrc
        ? `
          <div class="brewery-info-logo-wrap">
            <img
              src="${logoSrc}"
              alt="${brewery.name} logo"
              class="brewery-info-logo"
            />
          </div>
        `
        : ''

      return `
        <div class="brewery-info-window">
          ${logoMarkup}

          <div class="brewery-info-content">
            <h3 class="brewery-info-title">${brewery.name}</h3>
            <p class="brewery-info-address">${address}</p>

            <button
              type="button"
              class="brewery-info-button"
            >
              View Brewery Details
            </button>

            ${
              brewery.googleMap
                ? `
                  <a
                    href="${brewery.googleMap}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="brewery-info-link"
                  >
                    View on Google Maps
                  </a>
                `
                : ''
            }
          </div>
        </div>
      `
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

::v-deep .gm-style .gm-style-iw-c {
  padding: 0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(47, 47, 47, 0.25);
  background: #f7efe4;
}

::v-deep .gm-style .gm-style-iw-d {
  overflow: hidden !important;
}

::v-deep .gm-style .gm-ui-hover-effect {
  top: 4px !important;
  right: 4px !important;
}

::v-deep .brewery-info-window {
  width: 240px;
  max-width: 240px;
  background: #f7efe4;
  color: #2f2f2f;
  font-family: inherit;
}

::v-deep .brewery-info-logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  margin: 0 auto;
  border-radius:50%;
  padding: 16px;
  background: #ffffff;
  border-bottom: 4px solid #f79a3b;
}

::v-deep .brewery-info-logo {
  display: block;
  width: auto;
  height: auto;
  max-width: 150px;
  max-height: 62px;
  object-fit: contain;
}

::v-deep .brewery-info-content {
  padding: 14px 16px 16px;
}

::v-deep .brewery-info-title {
  margin: 0 0 6px;
  font-size: 17px;
  line-height: 1.2;
  font-weight: 700;
  color: #7a4b2a;
}

::v-deep .brewery-info-address {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: #5f5145;
}

::v-deep .brewery-info-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 14px;
  padding: 10px 14px;
  border: 0;
  border-radius: 999px;
  background: #f79a3b;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

::v-deep .brewery-info-button:hover {
  background: #f05a00;
  transform: translateY(-1px);
}

::v-deep .brewery-info-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: #ffffff;
  color: #7a4b2a;
  border: 1px solid rgba(122, 75, 42, 0.25);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

::v-deep .brewery-info-link:hover {
  background: #fff7ed;
  border-color: rgba(122, 75, 42, 0.45);
}
</style>