<template>
  <div class='card dark padding-right-small padding-top-tiny padding-left-small padding-bottom-small width-half align-center'>
    <h3 class='health margin-top-nano align-center'>Health</h3>
    <div class='health-wrapper flex'>
        <div v-for='healthLevel in health' :key='healthLevel' class='health-level-wrapper flex'>
            <div class='health-level-title padding-right-tiny'>{{ healthLevel._frontend_title }}</div>
            <div
                v-for='index in healthLevel.currentStrain.damage'
                :key='"damage-" + index'
                class='health-point damage'
            >
            </div>
            <div
                v-for='index in healthLevel.currentStrain.fatigue'
                :key='"fatigue-" + index'
                class='health-point fatigue'
            >
            </div>
            <div
                v-for='index in healthLevel._frontend_remainder'
                :key='"health-" + index'
                class='health-point'
            >
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import { useStore } from '../stores/character'

    export default {
        setup() {
            const character = useStore()
            const health = character.getHealth
            for (let healthLevel in health) {
                const currentHealthLevel = health[healthLevel]
                currentHealthLevel._frontend_title = healthLevel
                currentHealthLevel._frontend_remainder = 0
                currentHealthLevel._frontend_remainder =
                    currentHealthLevel.max - (currentHealthLevel.currentStrain.damage + currentHealthLevel.currentStrain.fatigue)
            }

            return {
                health
            }
        }
    }
</script>


<style>
    .health-wrapper {
        flex-direction: column
        
    }
    .health-point {
        width: 100%;
        height: 1.5rem;
        background-color: #34ebd2;
        border: 1px solid #1e9c8a;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 1px;
    }
    .damage {
        background-color: #eb3434;
        border: 1px solid #9c1e1e;
    }
    .fatigue {
        background-color: #ebba34;
        border: 1px solid #8b6415;
    }
    .health-level-title {
        min-width: 10rem;
        text-align: right;
        margin-top: -0.30rem;
    }


</style>