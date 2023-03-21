<template>
	<div class="radio-button-group">

		<tabs>
			<tab
				v-for="tab in skillsTabs"
				:name="tab.niceName"
				:key="tab"
				:status="tab.status"
			>
				<label
					v-for="option in tab.list"
					:key="option.key"
					:for="name + '-' + option.key"
					:class="{
						'selected':
							containsKey(option.key, selectedOptions)
							&& !containsKey(option.key, invalidOptions)
					}"
					class="card dark margin-bottom-nano padding-left-tiny flex width-whole display-block"
				>
					<input
						type="radio"
						class="trait-input"
						:name="name"
						:value="option.key"
						:id="name + '-' + option.key"
						:checked="
							containsKey(option.key, selectedOptions) &&
							!containsKey(option.key, invalidOptions)
						"
						:disabled="containsKey(option.key, invalidOptions)"
						@change="emitOption(option.key)"
					/>
					<div>
						<span class="trait-align">{{ option.niceName }}</span>
					</div>
				</label>
			</tab>
		</tabs>

	</div>
</template>

<script>
import { ref } from "vue";
import { containsKey } from "../../../rules/utils";
import {
	attributeSkills,
	generalSkills,
	knowledgeSkills,
	favouredTerrainSkills,
	masterSkills,
	getTraitNiceName,
	removeTraitsWithRequirements,
} from "../../../rules/characteristics/traits";
import { getNiceNameSortedList } from "../../../rules/characteristics/traitLists/traitsUtils";
import { getBackgroundSkillsListNiceNames } from "../../../rules/complexTraits/background/background";
import TraitLevelTraitCard from "./TraitLevelTraitCard.vue";

export default {
	name: "BaseRadioButtonGroup",
	components: {
		TraitLevelTraitCard
	},
	props: ["nameProp", "selectedProp", "invalidOptionsListProp", "isBackground"],
	emits: ["input"],
	setup(props) {
		const name = props.nameProp;
		const selectedOptions = ref("")
		selectedOptions.value = props.selectedProp ? props.selectedProp : [""];
		const invalidOptions = ref("")
		invalidOptions.value = props.invalidOptionsListProp
			? props.invalidOptionsListProp
			: [""];

		const attributeSkillsList = attributeSkills();
		const generalSkillsList = generalSkills();
		const knowledgeSkillsList = knowledgeSkills();
		const favouredTerrainSkillsList = favouredTerrainSkills();
		const masterSkillsList = masterSkills()

		const sortedBackgroundAttributesSkillsList = getNiceNameSortedList(
			removeTraitsWithRequirements(attributeSkillsList)
		);
		const sortedBackgroundGeneralSkillsList = getNiceNameSortedList(
			removeTraitsWithRequirements(generalSkillsList)
		);
		const sortedBackgroundKnowledgeSkillsList = getNiceNameSortedList(
			removeTraitsWithRequirements(knowledgeSkillsList)
		);
		const sortedBackgroundTerrainSkillsList = getNiceNameSortedList(
			removeTraitsWithRequirements(favouredTerrainSkillsList)
		);

		const sortedAttributeSkillsList =
			getNiceNameSortedList(attributeSkillsList);
		const sortedGeneralSkillsList = 
			getNiceNameSortedList(generalSkillsList);
		const sortedKnowledgeSkillsList =
			getNiceNameSortedList(knowledgeSkillsList);
		const sortedTerrainSkillsList = 
			getNiceNameSortedList(favouredTerrainSkillsList);
		const sortedMasterSkillsList = 
			getNiceNameSortedList(masterSkillsList);

		const sortedBackgroundAttributeSkills = {
			niceName: "Grundfärdigheter",
			list: sortedBackgroundAttributesSkillsList,
			status: "normal",
		};
		const sortedBackgroundGeneralSkills = {
			niceName: "Allmänna",
			list: sortedBackgroundGeneralSkillsList,
			status: "normal",
		};
		const sortedBackgroundKnowledgeSkills = {
			niceName: "Kunskap",
			list: sortedBackgroundKnowledgeSkillsList,
			status: "normal",
		};
		const sortedBackgroundTerrainSkills = {
			niceName: "Vana",
			list: sortedBackgroundTerrainSkillsList,
			status: "normal",
		};

		const sortedAttributeSkills = {
			niceName: "Grundfärdigheter",
			list: sortedAttributeSkillsList,
			status: "normal",
		};
		const sortedGeneralSkills = {
			niceName: "Allmänna",
			list: sortedGeneralSkillsList,
			status: "normal",
		};
		const sortedKnowledgeSkills = {
			niceName: "Kunskap",
			list: sortedKnowledgeSkillsList,
			status: "normal",
		};
		const sortedTerrainSkills = {
			niceName: "Vana",
			list: sortedTerrainSkillsList,
			status: "normal",
		};
		const sortedMasterSkills = {
			niceName: "Mästarfärdigheter",
			list: sortedMasterSkillsList,
			status: "normal",
		};

		const skillsTabs = ref({});

		const backgroundSkillTabsRef = {
			sortedBackgroundAttributeSkills,
			sortedBackgroundGeneralSkills,
			sortedBackgroundKnowledgeSkills,
			sortedBackgroundTerrainSkills,
		};

		const skillTabsRef = {
			sortedAttributeSkills,
			sortedGeneralSkills,
			sortedKnowledgeSkills,
			sortedTerrainSkills,
			sortedMasterSkills,
		};

		if (props.isBackground === true) {
			skillsTabs.value = backgroundSkillTabsRef;
		} else {
			skillsTabs.value = skillTabsRef;
		}

		return {
			name,
			selectedOptions,
			invalidOptions,
			getTraitNiceName,
			getBackgroundSkillsListNiceNames,
			containsKey,

			skillsTabs,
		};
	},
	watch: {
		selectedProp: {
			handler(newVal) {
				this.selectedOptions = newVal || [""];
				Object.keys(this.skillsTabs).forEach((skillListKey) => {
					this.skillsTabs[skillListKey].status = this.tabIsSelected(
						newVal,
						this.skillsTabs[skillListKey].list
					);
				});
			},
			immediate: true,
		},
		invalidOptionsListProp: {
			handler(newVal) {
				this.invalidOptions = newVal;
			},
			immediate: true,
		},
		optionsProp: {
			handler(newVal) {
				this.options = newVal;
			},
			immediate: true,
		},
	},
	methods: {
		tabIsSelected(selectedOptions, skillList) {
			const skillKeysList = skillList.map((skill) => skill.key);
			for (const index in selectedOptions) {
				const selectedOption = selectedOptions[index];
				return containsKey(selectedOption, skillKeysList)
					? "selected"
					: "normal";
			}
		},
		emitOption(option) {
			console.log('option: ', option);
			this.$emit("input", {
				id: this.name,
				option,
			});
		},
	},
};
</script>

<style></style>
