<template>
    <section
      v-show="isActive"
      :id="computedId"
      ref="tab"
      :aria-hidden="!isActive"
      :class="panelClass"
      role="tabpanel"
    >
      <slot />
    </section>
  </template>
  
  <script>
    import {inject, watch, ref, onBeforeMount, onBeforeUnmount} from 'vue';
    export default {
        name: 'Tab',
        props: {
            panelClass: {
                type: String,
                default: 'tabs-component-panel'
            },
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                required: true
            },
            prefix: {
                type: String,
                default: ''
            },
            suffix: {
                type: String,
                default: ''
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            status: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const isActive = ref(false)
            const tabsProvider = inject('tabsProvider')
            const addTab = inject('addTab')
            const updateTab = inject('updateTab')
            const deleteTab = inject('deleteTab')
            const header = props.prefix + props.name + props.suffix
            const computedId = props.id ? props.id : props.name.toLowerCase().replace(/ /g, '-')
            const hash = '#' + (!props.isDisabled ? computedId : '')
            const name = ref(props.name)
            const prefix = ref(props.prefix)
            const suffix = ref(props.suffix)
            const isDisabled = ref(props.isDisabled)
            const status = ref(props.status)

            watch(
                () => tabsProvider.activeTabHash,
                () => {
                    isActive.value = hash === tabsProvider.activeTabHash
                },
                () => {
                    status.value = props.status
                }
            )
            watch(() => Object.assign({}, props), () => {
                updateTab(computedId, {
                    name: props.name,
                    header: props.prefix + props.name + props.suffix,
                    isDisabled: props.isDisabled,
                    isActive: hash === tabsProvider.activeTabHash,
                    hash: hash,
                    index: tabsProvider.tabs.length,
                    computedId: computedId,
                    status: props.status,
                    tabsProvider: tabsProvider
                })
            })
            onBeforeMount(() => {
                addTab({
                    name: props.name,
                    header: header,
                    isDisabled: props.isDisabled,
                    isActive: hash === tabsProvider.activeTabHash,
                    hash: hash,
                    index: tabsProvider.tabs.length,
                    computedId: computedId,
                    status: props.status,
                    tabsProvider: tabsProvider
                })
            })
            onBeforeUnmount(() => {
                deleteTab(computedId)
            })
            return {
                header,
                computedId,
                hash,
                isActive,
                status,
                name,
                prefix,
                suffix,
                isDisabled,
                tabsProvider,
                updateTab
            }
        },
        watch: {
            $props: {
                handler(newVal) {
                    this.updateTab(newVal.computedId, {
                        name: newVal.name,
                        header: newVal.prefix + newVal.name + newVal.suffix,
                        isDisabled: newVal.isDisabled,
                        isActive: newVal.hash === this.tabsProvider.activeTabHash,
                        hash: newVal.hash,
                        index: newVal.tabsProvider?.tabs?.length,
                        computedId: newVal.computedId,
                        status: newVal.status
                    })
                },
                deep: true,
                immediate: true,
            },
        },
    };
  </script>