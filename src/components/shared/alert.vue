<template>
    <v-alert
            :value="true"
            @input="onClose"
            border="left"
            close-text="Close Alert"
            color="deep-purple accent-4"
            dark
            dismissible
    >
        {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "alert",
        props: ['text'],
        methods: {
            onClose() {
                this.$emit('dismissed')
            }
        }
    }
</script>

<style scoped>

</style>
