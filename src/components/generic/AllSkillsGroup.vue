<template>
	<div class="radio-button-group">
        <tabs>
            <tab name="Grundfärdigheter">
                <label
                    :class="{
                        'selected': containsKey(option.key, selectedOptions) && !containsKey(option.key, invalidOptions)
                    }"
                    class="card dark margin-bottom-nano padding-bottom-tiny padding-left-tiny flex width-whole display-block"
                    :key="option.key"
                    :for="name + '-' + option.key"
                    v-for="option in sortedAttributeSkills"
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
                        <span class="trait-align">
                            <span v-if="option.niceName">{{ option.niceName }}</span>
                        </span>
                    </div>
		        </label>
            </tab>
            <tab name="Allmänna">
                <label
                    :class="{
                        'selected': containsKey(option.key, selectedOptions) && !containsKey(option.key, invalidOptions)
                    }"
                    class="card dark margin-bottom-nano padding-bottom-tiny padding-left-tiny flex width-whole display-block"
                    :key="option.key"
                    :for="name + '-' + option.key"
                    v-for="option in sortedGeneralSkills"
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
                        <span class="trait-align">
                            <span v-if="option.niceName">{{ option.niceName }}</span>
                        </span>
                    </div>
		        </label>
            </tab>
            <tab name="Kunskap">
                <label
                    :class="{
                        'selected': containsKey(option.key, selectedOptions) && !containsKey(option.key, invalidOptions)
                    }"
                    class="card dark margin-bottom-nano padding-bottom-tiny padding-left-tiny flex width-whole display-block"
                    :key="option.key"
                    :for="name + '-' + option.key"
                    v-for="option in sortedKnowledgeSkills"
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
                        <span class="trait-align">
                            <span v-if="option.niceName">{{ option.niceName }}</span>
                        </span>
                    </div>
		        </label>
            </tab>
            <tab name="Terrängvana">
                <label
                    :class="{
                        'selected': containsKey(option.key, selectedOptions) && !containsKey(option.key, invalidOptions)
                    }"
                    class="card dark margin-bottom-nano padding-bottom-tiny padding-left-tiny flex width-whole display-block"
                    :key="option.key"
                    :for="name + '-' + option.key"
                    v-for="option in sortedTerrainSkills"
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
                        <span class="trait-align">
                            <span v-if="option.niceName">{{ option.niceName }}</span>
                        </span>
                    </div>
		        </label>
            </tab>
        </tabs>
	</div>
</template>
  
<script>
	import { containsKey } from '../../rules/utils'
    import {
		allTalents,
		attributeSkills,
		generalSkills,
		knowledgeSkills,
		favouredTerrainSkills,
		getTraitNiceName
	} from '../../rules/characteristics/traits'
    import { getNiceNameSortedList } from '../../rules/characteristics/traitLists/traitsUtils'
	import { getBackgroundSkillsListNiceNames } from '../../rules/complexTraits/background/background'

	export default {
		name: 'BaseRadioButtonGroup',
		props: ['nameProp', 'selectedProp', 'invalidOptionsListProp'],
		setup(props) {
			const name = props.nameProp
			const selectedOptions = props.selectedProp ? props.selectedProp : ['']
			const invalidOptions = props.invalidOptionsListProp ? props.invalidOptionsListProp : ['']

            const sortedAttributeSkills = getNiceNameSortedList(attributeSkills())
            const sortedGeneralSkills = getNiceNameSortedList(generalSkills())
            const sortedKnowledgeSkills = getNiceNameSortedList(knowledgeSkills())
            const sortedTerrainSkills = getNiceNameSortedList(favouredTerrainSkills())
            console.log(sortedTerrainSkills)

			return {
				name,
				selectedOptions,
				invalidOptions,
				getTraitNiceName,
				getBackgroundSkillsListNiceNames,
				containsKey,

                sortedAttributeSkills,
                sortedGeneralSkills,
                sortedKnowledgeSkills,
                sortedTerrainSkills
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