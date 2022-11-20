<template>
	<div
        class="slideInLeft, flex, sidebar"
        :class="{ closed: isClosed}"
    >
        <div v-if="isSelected === 'level-ladder'">
            <LevelLadder :characterStore="characterStore" />
        </div>
        <div v-if="isSelected === 'biography'">
            <Flavour :characterStore="characterStore" />
        </div>
        <div class="drawer-handle-wrapper">
            <div
                :class="{'selected': isSelected === 'level-ladder'}"
                class="icon -level-ladder"
                @click="toggleOrShow('level-ladder')" >
            </div>
            <div
                :class="{'selected': isSelected === 'biography'}"
                class="icon -biography"
                @click="toggleOrShow('biography')" >
            </div>
            <div
                class="drawer-handle"
                @click="toggleFoldOut">
            </div>
        </div>
	</div>
</template>

<script>
	import { ref } from 'vue'
    import LevelLadder from './LevelLadder.vue'
    import Flavour from './Flavour.vue'

	export default {
		components: {
			LevelLadder,
            Flavour
            
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
            openFoldOutAndSelect(moduleKey) {
                this.isClosed = false
                this.isSelected = moduleKey
            },
            toggleOrShow(moduleKey) {
                if (this.isSelected === moduleKey) {
                    this.isClosed = true
                    this.isSelected = ''
                    return
                }
                this.openFoldOutAndSelect(moduleKey)
			},
		}
	}
</script>

<style>
</style>
