<template>
	<div>{{ trait.shortName }}: {{ traitValue }}</div>
</template>

<script>
	export default {
		props: ["trait", "traitValue"],
		setup(props) {
		}
	}
</script>

<style></style>