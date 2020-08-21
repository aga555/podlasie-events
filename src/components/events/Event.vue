<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text">{{event.title}} </h6>

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
                </v-card-text>
                <v-card-actions>
                    <v-btn dark> weź udział</v-btn>

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
            }
        }
    }
</script>

<style scoped>

</style>
