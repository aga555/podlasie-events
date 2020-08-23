<template>
    <v-container>
        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                        indeterminate
                        color="primary--text"
                        :width="7"
                        :size="70"
                        v-if="loading"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap>

            <v-flex xs-12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text">{{event.title}} </h6>

                        <app-edit :event="event" v-if="userIsCreator=== true"></app-edit>

                    </v-card-title>

                    <v-img
                            :src="event.imgUrl"
                            height="400"
                    >

                    </v-img>
                </v-card>
                <v-card-text>
                    <div> {{event.date}}</div>
                    <div>
                        {{event.description}}
                    </div>
                    <div>{{event.location}}</div>
                </v-card-text>

                <v-card-actions>
                 <app-register
                 :eventId="event.id" v-if="userIsAutehenticated "></app-register>

                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        name: "Event",
        computed: {
            event() {
                return this.$store.getters.loadedEvent(this.id)
            },
            userIsAutehenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator() {
                if (!this.userIsAutehenticated) {
                    return false
                }
                return this.$store.getters.user.id === this.event.creatorId
            },
            loading(){
                return this.$store.getters.loading
            }

        }
    }
</script>

<style scoped>

</style>
