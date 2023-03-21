<template>
		<div
            v-if="
				characterStore.metadata.invalidLevels[selectedLevel] &&
				characterStore.metadata.invalidLevels[selectedLevel][0] ===
					'invalidKey' &&
				characterStore.metadata.invalidLevels[selectedLevel][1]
			"
			class="card padding-left-small margin-bottom-small font-size-nano padding-tiny touched-by-error invalid-background"
		>
			<p class="font-size-nano margin-bottom-tiny">
				Det har skett en karaktärsbrytande uppdatering av regelverket. Ditt val
				på den här erfarenhetsnivån är inte längre giltigt. För att åtgärda
				felet, gör ett nytt val på den här erfarenhetsnivån.
			</p>
			<p class="font-size-nano">
				Den ogiltiga egenskapens nyckel: [
				<span class="italic">{{
					characterStore.metadata.invalidLevels[selectedLevel][1]
				}}</span>
				]
			</p>
		</div>
</template>

<script>
import { useCharacterStore } from "../../stores/character";

export default {
	name: "VersionValidationMessage",
	props: [
		"selectedLevelProp",
	],
	setup(props) {
		const selectedLevel = props.selectedLevelProp;
        const characterStore = useCharacterStore();

        /* den här lirar inte, och används ingenstans.  */

		return {
            characterStore,
            selectedLevel
		};
	},
	watch: {
		selectedLevelProp: {
			handler(newVal) {
				this.selectedLevel = newVal;
			},
			immediate: true,
		},
	},

};
</script>

<style></style>
