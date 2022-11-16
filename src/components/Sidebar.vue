<template>
	<div :class="{ closed: isClosed, flex: true, slideInLeft: true }">
        <LevelLadder :characterStore="characterStore" />
		<div class="drawer-handle" @click='toggleFoldOut'></div>
	</div>
</template>

<script>
	import { ref } from 'vue'
    import LevelLadder from '../components/LevelLadder.vue'

	export default {
		components: {
			LevelLadder
		},
		props: ['characterStore'],
		setup(props) {
			const characterStore = props.characterStore // hela storen behöver passas ned eftersom traits och attributes kollar requirements
			const isClosed = ref(true)

			return {
				characterStore,
				isClosed,
			}
		},
		methods: {
			toggleFoldOut(_event) {
				this.isClosed = !this.isClosed
				this.updateLevelTabData()
			},
		}
	}
</script>

<style lang='scss'>
	@import '../assets/wizard/form-wizard-vue3.scss';
</style>
