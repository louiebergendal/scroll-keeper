<template>
    <div class='card medium padding-tiny'>
		<h3 class="align-center margin-top-nano margin-bottom-tiny">Klicka på knappen för att bli bättre</h3>
		<button type="submit" class="margin-top-tiny margin-left-nano">Öka {{ traitToBeIncreased }}</button>
	</div>
</template>

<script>
	export default {
		props: ['characteristic'],
		setup(props) {
            const traitToBeIncreased = props.characteristic
			
			return {
                traitToBeIncreased
			}
		}
	}
</script>


<style></style>
