<template>
	<div
		class="radio-button-group"
		:class="{ 'primary-radio-buttons flex': isPrimary }"
	>
		<label
			v-for="option in options"
			:key="option"
			:for="name + '-' + option"
			:class="{
				selected:
					containsKey(option, selectedOptions)
					&& !containsKey(option, invalidOptions),
				'padding-left-tiny': !isPrimary,
			}"
			class="card dark margin-bottom-nano flex width-whole display-block"
		>
			<input
				type="radio"
				class="trait-input"
				:name="name"
				:value="option"
				:id="name + '-' + option"
				:checked="
					containsKey(option, selectedOptions)
					&& !containsKey(option, invalidOptions)
				"
				:disabled="containsKey(option, invalidOptions)"
				@change="emitOption(option)"
			/>
			<div class="button-text">
				<span :class="{ 'trait-align': !isPrimary }">
					<span v-if="getCharacteristicNiceName(option)">{{
						getCharacteristicNiceName(option)
					}}</span>
					<span v-if="getBackgroundSkillsListNiceNames(option)">{{
						getBackgroundSkillsListNiceNames(option)
					}}</span>
				</span>
			</div>
		</label>
	</div>
</template>

<script>
import { containsKey } from "../../../../rules/utils";
import { getTraitNiceName } from "../../../../rules/characteristics/traits";
import { getBackgroundSkillsListNiceNames } from "../../../../rules/complexTraits/background/background";
import { getAttributeLongName } from "../../../../rules/characteristics/attributes"

export default {
	name: "BaseRadioButtonGroup",
	props: [
		"nameProp",
		"optionsProp",
		"selectedProp",
		"invalidOptionsListProp",
		"isPrimaryProp",
	],
	setup(props) {
		const name = props.nameProp;
		const options = props.optionsProp;
		const selectedOptions = props.selectedProp ? props.selectedProp : [""];
		const invalidOptions = props.invalidOptionsListProp
			? props.invalidOptionsListProps
			: [""];
		const isPrimary = props.isPrimaryProp ? props.isPrimaryProp : false;

		return {
			name,
			options,
			selectedOptions,
			invalidOptions,
			isPrimary,
			getTraitNiceName,
			getBackgroundSkillsListNiceNames,
			getAttributeLongName,
			containsKey,
		};
	},
	watch: {
		selectedProp: {
			handler(newVal) {
				this.selectedOptions = newVal;
				this.emitOption(newVal);
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
		emitOption(option) {
			this.$emit("input", {
				option,
				id: this.name,
			});
		},
		getCharacteristicNiceName(option) {
			const isTrait = getTraitNiceName(option)
			if(isTrait) return isTrait
			return getAttributeLongName(option)
		},

	},
};
</script>

<style></style>
