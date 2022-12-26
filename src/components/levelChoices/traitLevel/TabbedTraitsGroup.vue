<template>
	<div class="radio-button-group">

		<tabs>
			<tab v-for="tab in skillsTabs" :name="tab.niceName" :key="tab">
				<label
					v-for="option in tab.list"
					:key="option.key"
					:for="name + '-' + option.key"
					:class="{
						'selected': containsKey(option.key, selectedOptions) && !containsKey(option.key, invalidOptions)
					}"
					class="card dark margin-bottom-nano padding-bottom-tiny padding-left-tiny flex width-whole display-block"
				>
					<input
						type="radio"
						class="trait-input"
						:name="name"
						:value="option.key"
						:id="name + '-' + option.key"
						:checked="containsKey(option.key, selectedOptions) && !containsKey(option.key, invalidOptions)"
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
	import { containsKey } from '../../../rules/utils'
	import {
		attributeSkills,
		generalSkills,
		knowledgeSkills,
		favouredTerrainSkills,
		getTraitNiceName,
		removeTraitsWithRequirements
	} from '../../../rules/characteristics/traits'
	import { getNiceNameSortedList } from '../../../rules/characteristics/traitLists/traitsUtils'
	import { getBackgroundSkillsListNiceNames } from '../../../rules/complexTraits/background/background'

	export default {
		name: 'BaseRadioButtonGroup',
		props: ['nameProp', 'selectedProp', 'invalidOptionsListProp', 'isBackground'],
		setup(props) {
			const name = props.nameProp
			const selectedOptions = props.selectedProp ? props.selectedProp : ['']
			const invalidOptions = props.invalidOptionsListProp ? props.invalidOptionsListProp : ['']

			let skillsTabs = {}

			if (props.isBackground === true) {
				skillsTabs = {
					sortedAttributeSkills: {
						niceName: 'Grundfärdigheter',
						list: getNiceNameSortedList(removeTraitsWithRequirements(attributeSkills()))
					},
					sortedGeneralSkills: {
						niceName: 'Allmänna',
						list: getNiceNameSortedList(removeTraitsWithRequirements(generalSkills()))
					},
					sortedKnowledgeSkills: {
						niceName: 'Kunskap',
						list: getNiceNameSortedList(removeTraitsWithRequirements(knowledgeSkills()))
					},
					sortedTerrainSkills: {
						niceName: 'Terrängvana',
						list: getNiceNameSortedList(removeTraitsWithRequirements(favouredTerrainSkills()))
					}
				}
			} else {
				skillsTabs = {
					sortedAttributeSkills: {
						niceName: 'Grundfärdigheter',
						list: getNiceNameSortedList(attributeSkills())
					},
					sortedGeneralSkills: {
						niceName: 'Allmänna',
						list: getNiceNameSortedList(generalSkills())
					},
					sortedKnowledgeSkills: {
						niceName: 'Kunskap',
						list: getNiceNameSortedList(knowledgeSkills())
					},
					sortedTerrainSkills: {
						niceName: 'Terrängvana',
						list: getNiceNameSortedList(favouredTerrainSkills())
					}
				}
			}

			return {
				name,
				selectedOptions,
				invalidOptions,
				getTraitNiceName,
				getBackgroundSkillsListNiceNames,
				containsKey,

				skillsTabs
			}
		},
		watch: {
			selectedProp: {
				handler(newVal) {
					this.selectedOptions = newVal
					this.emitOption(newVal)
				},
				immediate: true
			},
			invalidOptionsListProp: {
				handler(newVal) {
					this.invalidOptions = newVal
				},
				immediate: true
			},
			optionsProp: {
				handler(newVal) {
					this.options = newVal
				},
				immediate: true
			}
		},
		methods: {
			emitOption(option) {
				this.$emit('input', {
					id: this.name,
					option
				})
			}
		}
	}
</script>
  
<style>

</style>