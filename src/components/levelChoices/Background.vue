<template>
	<form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
		<tab-content title="About You" :selected="true" ref="dataItem1">
			<div class="form-group">
				<label for="fullName">Full Name</label>
				<input type="text" class="form-control" placeholder="test data" v-model="formData.dataItem1">
			</div>
		</tab-content>
		<tab-content title="About me" ref="dataItem1">
			<div class="form-group">
				<label for="fullName">Empty name</label>
				<input type="text" class="form-control" placeholder="test data" v-model="formData.dataItem2">
			</div>
		</tab-content>
	</form-wizard>
</template>

<script>
import FormWizard from '../wizard/FormWizard.vue'
import TabContent from '../wizard/TabContent.vue'

export default {
	name: 'BackgroundWizard',
	components: {
		FormWizard, TabContent
	},
	props: ['nextStepCallback', 'previousStepCallback'],
	data(){
		return {
			formData: {
				dataItem1: '',
				dataItem2: ''
			}
		}
	},
	methods:{
		onComplete() {
			alert("Submitting Form ! Rock On");
			this.$refs.formwizard.changeStatus();
		},

		reset() {
			for(let field in this.formData){
				this.formData[field] = null;
			}
		},

		nextStep() {
			// CALLBACK FOR NEXT STEP
		},

		previousStep() {
			// CALLBACK FOR PREV STEP
		}
	}
}
</script>