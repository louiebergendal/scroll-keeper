

<template>
    <div>
        {{complexTraitData}}
    </div>
</template>
<script>

// create a new vue component that will be used to display a list of the traits chosen at level 1
// this component should be implemented in the TraitLevelTraitsGroup component, and it should display the choices made at level 1.
// the component should be a child of the TraitLevelTraitsGroup component, and it should be passed complexTraitData that contains the choices made at level 1.

export default {
    name: 'BackgroundChoices',
    props: ['complexTraitDataProp'],
    setup(props) {
        const complexTraitData = props.complexTraitDataProp
        return {
            complexTraitData
        }
    }
}
</script>
<style>
</style>
