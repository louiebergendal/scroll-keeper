<template>
	<div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">{{bonusType}}</h3>
        <h3 class="align-center margin-top-nano margin-bottom-tiny">woop woop!</h3>
		<button class="margin-small">Submitta</button>
	</div>
</template>

<script>

	export default {
		props: ['bonusType'],
		setup(props) {
			const bonusType = props.bonusType

			return {
				bonusType
			}
		}
	}

</script>


<style></style>
