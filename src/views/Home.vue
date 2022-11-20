<template>
	<div class="main-bg padding-top-medium padding-left-medium padding-right-medium">
		<div class='inner-bg padding-top-small padding-left-small padding-right-small'>
      <h2>Omen Alpha WIP</h2>
      <b>todo:</b>
      <div class="">
          <span>hunt remaining bugs in level ladder</span><br>
          <span>portrait upload</span><br>
          <span>description field</span><br>
          <span>icons for talents</span><br>
          <span>icons for backgrounds</span><br>
          <span>menu should fold away when clicking outside while it is open</span><br>
          <span>Characters list should be a little table. Columns: Name, Level, Talents</span><br>
          <span>A traits API function that takes in a list of character 'traits', and returns only the 'talents'</span><br>
      </div>
    </div>
    <Sidebar />
  </div>
</template>
<script>
	import Sidebar from '../components/sidebar/Sidebar.vue'

	export default {
		components: {
			Sidebar
		},
		setup() {
			return {
			}
		}
	}
</script>

<style></style>
