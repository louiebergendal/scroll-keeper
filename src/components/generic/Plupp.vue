<template>
    <div
        class="choice-marker position-absolute"
        :class="{
            '-selected': status === 'selected',
            '-invalid': status === 'invalid'
    }"></div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ['statusProp'],
    setup(props) {
        const status = ref(props.statusProp)
        return {
            status
        }
    },
    watch: {
        statusProp: {
            handler(newVal) {
                this.status = newVal
            },
            immediate: true
        }
    }
}
</script>

<style>
</style>