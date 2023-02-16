<template>
	<div class="card square medium padding-large -fill">
		<div class="padding-bottom-small">
			<h3
				v-if="traitType === 'talent' && selectedLevel === 1"
				class="align-center margin-top-nano margin-bottom-tiny"
			>
				Bakgrund
			</h3>
			<h3
				v-if="traitType === 'talent' && selectedLevel !== 1"
				class="align-center margin-top-nano margin-bottom-tiny"
			>
				Välj en talang
			</h3>
			<h3
				v-if="traitType === 'skill'"
				class="align-center margin-top-nano margin-bottom-tiny"
			>
				Välj en färdighet
			</h3>
		</div>
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

		<div v-if="selectedLevel !== 1">
			<div v-if="traitType === 'skill'">
				<tabs>
					<tab
						name="Grundfärdigheter"
						:status="setPluppStatus(selectedChoiceKey, attributeSkillsList)"
					>
						<TraitLevelTraitsGroup
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="'attributeSkills'"
							:selectedChoiceKeyProp="selectedChoiceKey"
							:tempCharacterSheetProp="tempCharacterSheet"
							:tempValidationSheetProp="tempValidationSheet"
							@selected-choice-key="updateSelectedChoiceKey"
							@update-tabs="$emit('update-tabs')"
						/>
					</tab>
					<tab
						name="Allmänna"
						:status="setPluppStatus(selectedChoiceKey, generalSkillsList)"
					>
						<TraitLevelTraitsGroup
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="'generalSkills'"
							:selectedChoiceKeyProp="selectedChoiceKey"
							:tempCharacterSheetProp="tempCharacterSheet"
							:tempValidationSheetProp="tempValidationSheet"
							@selected-choice-key="updateSelectedChoiceKey"
							@update-tabs="$emit('update-tabs')"
						/>
					</tab>
					<tab
						name="Kunskap"
						:status="setPluppStatus(selectedChoiceKey, knowledgeSkillsList)"
					>
						<TraitLevelTraitsGroup
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="'knowledgeSkills'"
							:selectedChoiceKeyProp="selectedChoiceKey"
							:tempCharacterSheetProp="tempCharacterSheet"
							:tempValidationSheetProp="tempValidationSheet"
							@selected-choice-key="updateSelectedChoiceKey"
							@update-tabs="$emit('update-tabs')"
						/>
					</tab>
					<tab
						name="Vana"
						:status="
							setPluppStatus(selectedChoiceKey, favouredTerrainSkillsList)
						"
					>
						<TraitLevelTraitsGroup
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="'favouredTerrainSkills'"
							:selectedChoiceKeyProp="selectedChoiceKey"
							:tempCharacterSheetProp="tempCharacterSheet"
							:tempValidationSheetProp="tempValidationSheet"
							@selected-choice-key="updateSelectedChoiceKey"
							@update-tabs="$emit('update-tabs')"
						/>
					</tab>
					<tab
						name="Mästarfärdigheter"
						:status="
							setPluppStatus(selectedChoiceKey, masterSkillsList)
						"
					>
						<TraitLevelTraitsGroup
							:selectedLevelProp="selectedLevel"
							:traitTypeProp="'masterSkills'"
							:selectedChoiceKeyProp="selectedChoiceKey"
							:tempCharacterSheetProp="tempCharacterSheet"
							:tempValidationSheetProp="tempValidationSheet"
							@selected-choice-key="updateSelectedChoiceKey"
							@update-tabs="$emit('update-tabs')"
						/>
					</tab>
				</tabs>
			</div>

			<div v-if="traitType === 'talent'">
				<TraitLevelTraitsGroup
					:selectedLevelProp="selectedLevel"
					:traitTypeProp="'talents'"
					:selectedChoiceKeyProp="selectedChoiceKey"
					:tempCharacterSheetProp="tempCharacterSheet"
					:tempValidationSheetProp="tempValidationSheet"
					@selected-choice-key="updateSelectedChoiceKey"
					@complex-payload="complexPayload"
					@update-tabs="$emit('update-tabs')"
				/>
			</div>
		</div>

		<div v-if="selectedLevel === 1">
			<RuleRelevantMetadata class="margin-bottom-medium" />
			<Background @complex-payload="complexPayload" />
		</div>

		<div class="align-center">
			<button
				:disabled="
					!selectedChoiceKey ||
					(traits[selectedChoiceKey]?.complexTrait && !hasFullComplexPayload) ||
					(traits[selectedChoiceKey] && cannotChooseTrait(traits[selectedChoiceKey]?.key))
				"
				type="submit"
				class="margin-top-large margin-left-nano"
				@click="submitNewTraitLevel()"
			>
				Uppdatera
			</button>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useCharacterStore } from "../../../stores/character";
import {
	allSkills,
	allTalents,
	canChooseTrait,
	getFailedRequirements,
	attributeSkills,
	generalSkills,
	knowledgeSkills,
	favouredTerrainSkills,
	masterSkills
} from "../../../rules/characteristics/traits";
import { isInvalidAtThisLevel } from "../../../validators/validators";
import { containsKey } from "../../../rules/utils";
import { flattenCharacter } from "../../../rules/characterFlattener";
import Background from "../complexTalents/background/Background.vue";
import RuleRelevantMetadata from "../complexTalents/background/RuleRelevantMetadata.vue";

export default {
	components: {
		Background,
		RuleRelevantMetadata,
	},
	props: ["selectedLevelProp", "traitTypeProp"],
	emits: ["complexPayload", "update-tabs", "selected-level-type"],
	setup(props) {
		const characterStore = useCharacterStore();
		const selectedLevel = props.selectedLevelProp;
		const traitType = props.traitTypeProp;

		const tempCharacterSheet = flattenCharacter(
			characterStore,
			selectedLevel - 1
		); // -1 to account for current lvling
		const tempValidationSheet = ref(
			flattenCharacter(characterStore, selectedLevel)
		);

		const complexTraitData = ref({});
		const hasFullComplexPayload = ref();

		let originalLevelChoiceKey = "";
		if (selectedLevel <= characterStore.metadata.level) {
			originalLevelChoiceKey = characterStore.history[selectedLevel].choice;
		}

		const attributeSkillsList = attributeSkills();
		const generalSkillsList = generalSkills();
		const knowledgeSkillsList = knowledgeSkills();
		const favouredTerrainSkillsList = favouredTerrainSkills();
		const masterSkillsList = masterSkills();

		const selectedChoiceKey = ref(originalLevelChoiceKey);
		let traits;
		if (traitType === "skill") {
			traits = allSkills();
		}
		if (traitType === "talent") {
			traits = allTalents();
		}

		return {
			characterStore,
			traitType,
			traits,
			tempCharacterSheet,
			tempValidationSheet,
			originalLevelChoiceKey,
			selectedChoiceKey,
			selectedLevel,
			complexTraitData,
			hasFullComplexPayload,
			containsKey,
			canChooseTrait,
			getFailedRequirements,

			attributeSkillsList,
			generalSkillsList,
			knowledgeSkillsList,
			favouredTerrainSkillsList,
			masterSkillsList
		};
	},
	beforeMount() {
		this.characterStore.$subscribe((_mutation, state) => {});
	},
	mounted() {
		this.$emit("selected-level-type", {
			type: "trait",
			isInvalid: this.selectedChoiceKey
				? this.traitIsInvalidAtThisLevel(this.selectedChoiceKey)
				: false,
			selectedChoiceKey: this.selectedChoiceKey,
		});
	},
	methods: {
		resetSelection() {
			this.selectedChoiceKey = "";
		},
		updateSelectedChoiceKey(data) {
			this.$emit("selected-level-type", {
				type: "trait",
				isInvalid: data.selectedChoiceKey
					? this.traitIsInvalidAtThisLevel(data.selectedChoiceKey)
					: false,
				selectedChoiceKey: data.selectedChoiceKey,
			});

			this.selectedChoiceKey = data.selectedChoiceKey;
		},
		setPluppStatus(skillKey, skillsList) {
			let status = "normal";
			let isSelected = containsKey(skillKey, Object.keys(skillsList));
			if (isSelected) status = "selected";
			if (isSelected && this.traitIsInvalidAtThisLevel(skillKey))
				status = "invalid";
			return status;
		},
		submitNewTraitLevel() {
			this.characterStore.submitNewLevelChoice(
				this.selectedChoiceKey,
				this.selectedLevel,
				this.traitType,
				this.complexTraitData
			);
			this.$emit("update-tabs");
			this.tempValidationSheet = flattenCharacter(
				this.characterStore,
				this.selectedLevel
			);
		},
		complexPayload(data) {
			let isValid = true;
			for (const option in data) {
				for (const choiceGroup in data[option].choices) {
					for (const skillChoice in data[option].choices[choiceGroup]) {
						const skillChoiceKey = data[option].choices[choiceGroup][skillChoice];
						if (!skillChoiceKey) isValid = false;
						if (this.traitIsInvalidAtThisLevel(skillChoiceKey)) isValid = false;
					}
				}
			}
			this.hasFullComplexPayload = isValid;
			this.complexTraitData = data;
		},
		traitIsInvalidAtThisLevel(traitKey) {
			return isInvalidAtThisLevel(
				traitKey,
				this.characterStore.metadata.invalidLevels,
				this.selectedLevel
			);
		},
		cannotChooseTrait(traitKey) {
			return !canChooseTrait(
				traitKey,
				this.tempCharacterSheet.traits,
				this.tempCharacterSheet.attributes,
				this.tempCharacterSheet.metadata.isChosenByFate,
				this.selectedLevel
			);
		},
		getFailedTraitRequirements(traitKey) {
			const failedRequirements = getFailedRequirements(
				traitKey,
				this.tempCharacterSheet.traits,
				this.tempCharacterSheet.attributes,
				this.tempCharacterSheet.metadata.isChosenByFate,
				this.selectedLevel
			);
			return failedRequirements;
		},
	},
};
</script>

<style></style>
