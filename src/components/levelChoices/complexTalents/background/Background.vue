<template>
	<div class="width-whole">
		<!-- PEOPLES -->
		<tabs class="margin-bottom-small">
			<tab name="Folk" :status="peopleSkillsStatus">
				<div>
					<div class="background-header-choice">
						<RadioButtonGroup
							:nameProp="'peoples'"
							:optionsProp="Object.keys(peoplesOptions)"
							:selectedProp="peoplesChoiceKey"
							@input="inputEventHandler"
							:isPrimaryProp="true"
						/>
					</div>
					<div v-if="peoplesChoiceKey" class="bordered-block padding-small">
						<div>
							<h3 class="align-center">Obligatoriska färdigheter</h3>
							<RadioButtonGroup
								:nameProp="'peoples' + '-' + 'skillList' + '-' + 0 + '-' + 0"
								:optionsProp="
									[peoplesOptions[peoplesChoiceKey].skillsLists[0].list[0]]
								"
								:selectedProp="
									peoplesOptions[peoplesChoiceKey].skillsLists[0].list[0]
								"
								:invalidOptionsListProp="['']"
								@input="inputEventHandler"
							/><br>
							<RadioButtonGroup
								:nameProp="'peoples' + '-' + 'skillList' + '-' + 0 + '-' + 1"
								:optionsProp="
									[peoplesOptions[peoplesChoiceKey].skillsLists[0].list[1]]
								"
								:selectedProp="
									peoplesOptions[peoplesChoiceKey].skillsLists[0].list[1]
								"
								:invalidOptionsListProp="['']"
								@input="inputEventHandler"
							/><br>
						</div>

						<div>
							<h3 class="align-center">Val</h3>
							<RadioButtonGroup
								:nameProp="'peoples' + '-' + 'skillList' + '-' + 1"
								:optionsProp="
									peoplesOptions[peoplesChoiceKey].skillsLists[1].list
								"
								:selectedProp="
									setSelectedIfValid(
										invalidKnowledgeSkillsForPeoplesChoicesList,
										peoplesSkillsChoiceList?.[1]?.toString()
									)
								"
								:invalidOptionsListProp="invalidPeoplesChoicesList"
								@input="inputEventHandler"
							/><br>
						</div>
					</div>
				</div>
			</tab>

			<tab name="Uppväxt" :status="upbringingSkillsStatus">
				<div>
					<div class="background-header-choice">
						<RadioButtonGroup
							:nameProp="'upbringings'"
							:optionsProp="Object.keys(upbringingsOptions)"
							:selectedProp="upbringingsChoiceKey"
							@input="inputEventHandler"
							:isPrimaryProp="true"
						/>
					</div>
					<div
						v-if="upbringingsChoiceKey && upbringingsChoiceKey.length"
						class="bordered-block padding-small"
					>
						<div v-if="upbringingsOptions[upbringingsChoiceKey]">
							<h3 class="align-center">Val 1</h3>
							<div class="margin-bottom-small">
								<RadioButtonGroup
									:nameProp="'upbringings' + '-' + 'skillList' + '-' + 0"
									:optionsProp="
										upbringingsOptions[upbringingsChoiceKey].skillsLists[0].list
									"
									:selectedProp="
										setSelectedIfValid(
											invalidKnowledgeSkillsForUpbringingsChoicesList,
											upbringingsSkillsChoiceList?.[0]?.toString()
										)
									"
									:invalidOptionsListProp="invalidUpbringingsChoicesList"
									@input="inputEventHandler"
								/>
							</div>
							<h3 class="align-center">Val 2</h3>
							<RadioButtonGroup
								:nameProp="'upbringings' + '-' + 'skillList' + '-' + 1"
								:optionsProp="
									upbringingsOptions[upbringingsChoiceKey].skillsLists[1].list
								"
								:selectedProp="
									setSelectedIfValid(
										invalidKnowledgeSkillsForUpbringingsChoicesList,
										upbringingsSkillsChoiceList?.[1]?.toString()
									)
								"
								:invalidOptionsListProp="invalidUpbringingsChoicesList"
								@input="inputEventHandler"
							/>
						</div>
					</div>
				</div>
			</tab>
			<tab name="Livnäring" :status="professionSkillsStatus">
				<div>
					<div class="background-header-choice">
						<RadioButtonGroup
							:nameProp="'professions'"
							:optionsProp="Object.keys(professionsOptions)"
							:selectedProp="professionsChoiceKey"
							@input="inputEventHandler"
							:isPrimaryProp="true"
						/>
					</div>
					<div
						v-if="professionsChoiceKey && professionsChoiceKey.length > 0"
						class="bordered-block padding-small"
					>
						<div v-if="professionsOptions[professionsChoiceKey]">
							<h3 class="align-center">Val</h3>
							<div class="margin-bottom-small">
								<RadioButtonGroup
									:nameProp="'professions' + '-' + 'skillList' + '-' + 0"
									:optionsProp="
										professionsOptions[professionsChoiceKey].skillsLists[0].list
									"
									:selectedProp="
										setSelectedIfValid(
											invalidKnowledgeSkillsForProfessionsChoicesList,
											professionsSkillsChoiceList?.[0]?.toString()
										)
									"
									:invalidOptionsListProp="invalidProfessionsChoicesList"
									@input="inputEventHandler"
								/>
							</div>
						</div>
					</div>
				</div>
			</tab>
		</tabs>
		<div v-if="isChosenByFate">
			<h3 class="align-center margin-bottom-medium margin-top-large">
				Fri färdighet (från Ödesvald)
			</h3>
			<TabbedTraitsGroup
				:nameProp="'fate-skillList-0'"
				:selectedProp="[
					setSelectedIfValid(
						invalidKnowledgeSkillsForChosenByFateChoicesList,
						chosenByFateSkillsChoiceList?.[0]?.toString()
					),
				]"
				:invalidOptionsListProp="invalidChosenByFateChoicesList"
				:isBackground="true"
				@input="inputEventHandler"
			/>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useCharacterStore } from "../../../../stores/character";
import {
	canChooseTrait,
	getTraitNiceName,
} from "../../../../rules/characteristics/traits";
import { background } from "../../../../rules/characteristics/traitLists/talents";
import { knowledgeSkillKeysList } from "../../../../rules/characteristics/traitLists/knowledgeSkills";
import { containsKey } from "../../../../rules/utils";
import RadioButtonGroup from "./RadioButtonGroup.vue";
import TabbedTraitsGroup from "../../traitLevel/TabbedTraitsGroup.vue";

export default {
	components: {
		RadioButtonGroup,
		TabbedTraitsGroup,
	},
	setup(props) {
		const characterStore = useCharacterStore();
		const characterStoreLocal = {};
		const complexPayload = ref({});

		const peopleSkillsStatus = ref("normal");
		const upbringingSkillsStatus = ref("normal");
		const professionSkillsStatus = ref("normal");

		// --- PEOPLES ---
		const peoplesOptions = background.complexTrait.peoples.peoples;
		const peoplesChoiceKey = ref(characterStore.history[1].complexPayload.people.key) || ref("");
		const peoplesSkillsChoiceList = characterStore.history[1].complexPayload
			.people.choices
			? Object.values(
					characterStore.history[1].complexPayload.people.choices
				) // "choices[1]" will be unnecessary when people is homogenized. Only "choises" then.
			: [];
		const invalidPeoplesChoicesList = ref([]);
		const invalidKnowledgeSkillsForPeoplesChoicesList = ref([]);

		// --- UPPBRINGINGS ---
		const upbringingsOptions = background.complexTrait.upbringings.upbringings;
		const upbringingsChoiceKey = ref(characterStore.history[1].complexPayload.upbringing.key);
		const upbringingsSkillsChoiceList = characterStore.history[1].complexPayload
			.upbringing.choices
			? Object.values(
					characterStore.history[1].complexPayload.upbringing.choices
				)
			: [];
		const invalidUpbringingsChoicesList = ref([]);
		const invalidKnowledgeSkillsForUpbringingsChoicesList = ref([]);

		// --- PROFESSIONS ---
		const professionsOptions = background.complexTrait.professions.professions;
		const professionsChoiceKey = ref(
			characterStore.history[1].complexPayload.profession.key
		);
		const professionsSkillsChoiceList = characterStore.history[1].complexPayload
			.profession.choices
			? Object.values(
					characterStore.history[1].complexPayload.profession.choices
				)
			: [];
		const invalidProfessionsChoicesList = ref([]);
		const invalidKnowledgeSkillsForProfessionsChoicesList = ref([]);

		// --- CHOSEN BY FATE ---
		const isChosenByFate = ref(characterStore.metadata.isChosenByFate);
		const chosenByFateChoiceKey = ref(
			isChosenByFate.value ? "chosenByFate" : ""
		);
		const chosenByFateSkillsChoiceList =
			characterStore.history[1].complexPayload.chosenByFate &&
			characterStore.history[1].complexPayload.chosenByFate.choices
				? Object.values(
						characterStore.history[1].complexPayload.chosenByFate.choices
					)
				: [];
		const invalidChosenByFateChoicesList = ref([]);
		const invalidKnowledgeSkillsForChosenByFateChoicesList = ref([]);

		return {
			characterStore,
			complexPayload,
			characterStoreLocal,
			isChosenByFate,

			peopleSkillsStatus,
			peoplesOptions,
			peoplesChoiceKey,
			peoplesSkillsChoiceList,
			invalidPeoplesChoicesList,
			invalidKnowledgeSkillsForPeoplesChoicesList,

			upbringingSkillsStatus,
			upbringingsOptions,
			upbringingsChoiceKey,
			upbringingsSkillsChoiceList,
			invalidUpbringingsChoicesList,
			invalidKnowledgeSkillsForUpbringingsChoicesList,

			professionSkillsStatus,
			professionsOptions,
			professionsChoiceKey,
			professionsSkillsChoiceList,
			invalidProfessionsChoicesList,
			invalidKnowledgeSkillsForProfessionsChoicesList,

			chosenByFateChoiceKey,
			chosenByFateSkillsChoiceList,
			invalidChosenByFateChoicesList,
			invalidKnowledgeSkillsForChosenByFateChoicesList,

			knowledgeSkillKeysList,
			canChooseTrait,
			getTraitNiceName,
		};
	},
	beforeMount() {
		this.updateInvalidChoicesList();
		this.characterStore.$subscribe((_mutation, state) => {
			this.characterStoreLocal = state;
			this.isChosenByFate = state.metadata.isChosenByFate;
		});
	},
	methods: {
		setPluppStatus(tabKey) {
			if (Object.keys(this.complexPayload).length > 0 && tabKey) {
				for (const choiceIndex in this.complexPayload[tabKey]?.choices) {
					for (const skillsListIndex in this.complexPayload[tabKey].choices[
						choiceIndex
					]) {
						if (
							!this.complexPayload[tabKey].choices[choiceIndex][skillsListIndex]
						) {
							return "normal";
						}
					}
				}
				return "selected";
			}
		},
		setSelectedIfValid(invalidList, key) {
			if (containsKey(key, invalidList)) key = "";
			return key;
		},
		validateKnowledgeSkills(choiceList) {
			const knowledgeSkillKeyList = this.knowledgeSkillKeysList();
			let invalidKnowledgeSkills = [];
			for (const knowledgeSkillIndex in knowledgeSkillKeyList) {
				const knowledgeSkillKey = knowledgeSkillKeyList[knowledgeSkillIndex];
				if (
					!this.canChooseTrait(
						knowledgeSkillKey,
						choiceList,
						this.characterStore.attributes,
						this.characterStore.metadata.isChosenByFate,
						1
					)
				) {
					invalidKnowledgeSkills.push(knowledgeSkillKey);
				}
			}
			return invalidKnowledgeSkills;
		},
		updateInvalidChoicesList() {
			this.invalidPeoplesChoicesList.length = 0;
			this.invalidUpbringingsChoicesList.length = 0;
			this.invalidProfessionsChoicesList.length = 0;
			this.invalidChosenByFateChoicesList.length = 0;

			// peoples
			this.invalidPeoplesChoicesList = this.invalidPeoplesChoicesList.concat(
				this.upbringingsSkillsChoiceList[0],
				this.upbringingsSkillsChoiceList[1],
				this.professionsSkillsChoiceList[0],
				this.professionsSkillsChoiceList[1],
				this.chosenByFateSkillsChoiceList[0]
			);
			this.invalidKnowledgeSkillsForPeoplesChoicesList =
				this.validateKnowledgeSkills(this.invalidPeoplesChoicesList);
			this.invalidPeoplesChoicesList = this.invalidPeoplesChoicesList.concat(
				this.invalidKnowledgeSkillsForPeoplesChoicesList
			);

			// upbringings
			this.invalidUpbringingsChoicesList =
				this.invalidUpbringingsChoicesList.concat(
					this.peoplesSkillsChoiceList[0],
					this.peoplesSkillsChoiceList[1],
					this.professionsSkillsChoiceList[0],
					this.professionsSkillsChoiceList[1],
					this.chosenByFateSkillsChoiceList[0]
				);
			this.invalidKnowledgeSkillsForUpbringingsChoicesList =
				this.validateKnowledgeSkills(this.invalidUpbringingsChoicesList);
			this.invalidUpbringingsChoicesList =
				this.invalidUpbringingsChoicesList.concat(
					this.invalidKnowledgeSkillsForUpbringingsChoicesList
				);

			// professions
			this.invalidProfessionsChoicesList =
				this.invalidProfessionsChoicesList.concat(
					this.peoplesSkillsChoiceList[0],
					this.peoplesSkillsChoiceList[1],
					this.upbringingsSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[1],
					this.chosenByFateSkillsChoiceList[0]
				);
			this.invalidKnowledgeSkillsForProfessionsChoicesList =
				this.validateKnowledgeSkills(this.invalidProfessionsChoicesList);
			this.invalidProfessionsChoicesList =
				this.invalidProfessionsChoicesList.concat(
					this.invalidKnowledgeSkillsForProfessionsChoicesList
				);

			// chosenByFate
			this.invalidChosenByFateChoicesList =
				this.invalidChosenByFateChoicesList.concat(
					this.peoplesSkillsChoiceList[0],
					this.peoplesSkillsChoiceList[1],
					this.upbringingsSkillsChoiceList[0],
					this.upbringingsSkillsChoiceList[1],
					this.professionsSkillsChoiceList[0],
				);
			this.invalidKnowledgeSkillsForChosenByFateChoicesList =
				this.validateKnowledgeSkills(this.invalidChosenByFateChoicesList);
			this.invalidChosenByFateChoicesList =
				this.invalidChosenByFateChoicesList.concat(
					this.invalidKnowledgeSkillsForChosenByFateChoicesList
				);
		},
		inputEventHandler(data) {

			// peoples
			if (data.id === "peoples") {
				this.peoplesChoiceKey = data.option;
				this.peoplesSkillsChoiceList.length = 0;
				this.peoplesSkillsChoiceList = { 0: {} }
			}
			if (data.id === "peoples-skillList-0-0") this.peoplesSkillsChoiceList[0][0] = data.option;
			if (data.id === "peoples-skillList-0-1") this.peoplesSkillsChoiceList[0][1] = data.option;
			if (data.id === "peoples-skillList-1") this.peoplesSkillsChoiceList[1] = data.option;

			// upbringings
			if (data.id === "upbringings") {
				this.upbringingsChoiceKey = data.option;
				this.upbringingsSkillsChoiceList.length = 0;
			}
			if (data.id === "upbringings-skillList-0") this.upbringingsSkillsChoiceList[0] = data.option;
			if (data.id === "upbringings-skillList-1") this.upbringingsSkillsChoiceList[1] = data.option;

			// professions
			if (data.id === "professions") {
				this.professionsChoiceKey = data.option;
				this.professionsSkillsChoiceList.length = 0;
			}
			if (data.id === "professions-skillList-0") this.professionsSkillsChoiceList[0] = data.option;

			// chosenByFate
			if (data.id === "chosenByFate") {
				this.chosenByFateChoiceKey = data.option;
				this.chosenByFateSkillsChoiceList.length = 0;
			}
			if (data.id === "fate-skillList-0") this.chosenByFateSkillsChoiceList[0] = data.option;

			this.updateInvalidChoicesList();

			const complexPayload = {
				people: {
					choices: {
						0: {
							0: this.peoplesSkillsChoiceList[0] ? this.peoplesSkillsChoiceList[0][0] : "", 
							1: this.peoplesSkillsChoiceList[0] ? this.peoplesSkillsChoiceList[0][1] : ""
						},
						1: {
							0: this.peoplesSkillsChoiceList[1],
						},
					},
					key: this.peoplesChoiceKey,
				},
				upbringing: {
					choices: {
						0: {
							0: this.upbringingsSkillsChoiceList[0],
						},
						1: {
							0: this.upbringingsSkillsChoiceList[1],
						},
					},
					key: this.upbringingsChoiceKey,
				},
				profession: {
					choices: {
						0: {
							0: this.professionsSkillsChoiceList[0],
						},
					},
					key: this.professionsChoiceKey,
				},
			};

			if (this.isChosenByFate) {
				complexPayload.chosenByFate = {};
				complexPayload.chosenByFate.choices = {};
				complexPayload.chosenByFate.choices = {
					0: {
						0: this.chosenByFateSkillsChoiceList[0],
					}
				}
				complexPayload.chosenByFate.key = this.chosenByFateChoiceKey;
			}
			
			this.complexPayload = complexPayload;

			this.peopleSkillsStatus = this.setPluppStatus("people");
			this.upbringingSkillsStatus = this.setPluppStatus("upbringing");
			this.professionSkillsStatus = this.setPluppStatus("profession");
			this.$emit("complexPayload", complexPayload);
		},
	},
};
</script>
