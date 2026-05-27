<template>
	<div>
  		<brewerydrop></brewerydrop>		
 	</div>
</template>

<script>
// @ is an alias to /src
import BreweryDrop from '@/components/BreweryDrop.vue'

export default {
  name: 'home',
  components: {	
  'brewerydrop': BreweryDrop
  }
}
</script>
<style src="@/assets/styles/components/animate.css"></style>
<style lang="less" src="@/assets/styles/components/beer-dash.less">

</style>