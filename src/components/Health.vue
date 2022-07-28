<template>
  <div class="card dark padding-right-tiny padding-top-tiny padding-left-tiny width-half">
    <h3 class="health margin-top-nano align-center">Health</h3>
        {{ maxHealth }}
  </div>
</template>

<script>
    import { useStore } from '../stores/character'

    // I will mostly deal with adding and removing strain-plupps and colouring stuff

    export default {
        setup() {
            const character = useStore()
            return {
                maxHealth: character.characterSheet.maxHealth
            }
        }
    }
</script>


<style></style>