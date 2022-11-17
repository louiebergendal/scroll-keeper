<template>
	<div
        class="slideInLeft, flex, sidebar"
        :class="{ closed: isClosed}"
    >
        <div v-if="isSelected === 'level-ladder'">
            <LevelLadder :characterStore="characterStore" />
        </div>
        <div v-if="isSelected === 'biography'">
            <h2 class="align-center margin-top-huge">H J Ö N K</h2>
        </div>
        <div class="drawer-handle-wrapper">
            <div class="icon -level-ladder" @click="setSelected('level-ladder')" ></div>
            <div class="icon -biography" @click="setSelected('biography')" ></div>
            <div class="drawer-handle" @click="toggleFoldOut"></div>
        </div>
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
            const isSelected = ref('')

			return {
				characterStore,
				isClosed,
                isSelected
			}
		},
		methods: {
			toggleFoldOut(_event) {
                if (this.isClosed && !this.isSelected) return
				this.isClosed = !this.isClosed
			},
            setSelected(moduleKey) {
                this.isClosed = false
                if (this.isSelected === moduleKey) {
                    this.isClosed = true
                    this.isSelected = ''
                    return
                }
                this.isSelected = moduleKey
			},
		}
	}
</script>

<style>
</style>
