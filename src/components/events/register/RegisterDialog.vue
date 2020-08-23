<template>
    <v-row justify="center">
        <v-dialog v-model="registerDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="dark"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    {{userIsRegistred ? 'zrezygnuj':'zarejestruj'}}
                </v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-card-title v-if="userIsRegistred">Rezygnujesz z udziału w wydarzeniu ?</v-card-title>
                        <v-card-title v-if="!userIsRegistred">Bierzesz udział w wydarzeniu ?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="registerDialog = false">Zrezygnuj</v-btn>
                            <v-btn color="green darken-1" text @click="onAgree">Potwierdż</v-btn>
                        </v-card-actions>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "RegisterDialog",
        props: ['eventId'],
        data() {
            return {
                registerDialog: false
            }
        },
        computed: {
            userIsRegistred() {
                return this.$store.getters.user.registeredEvents.findIndex(eventId => {
                    return eventId === this.eventId
                }) >= 0
            }
        }, methods: {
            onAgree() {
                if (this.userIsRegistred) {
                    this.$store.dispatch("unregisterUserForEvent", this.eventId);
                } else {
                    this.$store.dispatch("registerUserForEvent", this.eventId);
                }
                this.registerDialog = false
            }
        }
    }
</script>

<style scoped>

</style>
