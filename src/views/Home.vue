<template>
  <div>
    <ul class="master-tabs nav nav-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class="{ active: activeTab === 'map' }" @click="activeTab = 'map'" type="button" role="tab">
          Map View
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class="{ active: activeTab === 'list' }" @click="activeTab = 'list'" type="button" role="tab">
          Brewery List
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'map' }" role="tabpanel">
        <BreweryMap @brewery-selected="onBrewerySelected" />
      </div>
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'list' }" role="tabpanel">
        <BreweryDrop ref="breweryDrop" />
      </div>
    </div>
  </div>
</template>

<script>
import BreweryMap from '@/components/BreweryMap.vue'
import BreweryDrop from '@/components/BreweryDrop.vue'

export default {
  name: 'home',
  components: {
    BreweryMap,
    BreweryDrop
  },
  data() {
    return {
      activeTab: 'map'
    }
  },
  methods: {
    onBrewerySelected(untappedid) {
      this.activeTab = 'list'
      this.$nextTick(() => {
        if (this.$refs.breweryDrop) {
          this.$refs.breweryDrop.filterByType(untappedid)
        }
      })
    }
  }
}
</script>
<style src="@/assets/styles/components/animate.css"></style>
<style lang="less" src="@/assets/styles/components/beer-dash.less">

</style>