<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12 sm6 class=" text-xs-center text-sm-right">
                <v-btn large router to="/events" class="primary"> Zobacz wydarzenia</v-btn>
            </v-flex>
            <v-flex xs-12 sm6 class=" text-xs-center text-sm-left">
                <v-btn large router to="/events/new" class="primary"> utwórz wydarzenie
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
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
        <v-layout row wrap v-if="!loading">
            <v-flex xs-2>
                <v-carousel>
                    <v-carousel-item
                            v-for="event in events"
                            :key="event.id"
                            :src="event.imgUrl"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            @click="onLoadEvent(event.id)"
                    >
                        <div class="title">
                            {{event.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs-12 class=" text-center">
                <p>
                    Odwiedz wydarzenia na Podlasiu
                </p>
            </v-flex>

        </v-layout>

    </v-container>
</template>

<script>


    export default {
        name: "Home",

        data() {
            return {}
        }, methods: {
            onLoadEvent(id) {
                this.$router.push('/events/' + id)
            }
        },
        computed: {
            events() {
                return this.$store.getters.featuredEvents
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 18px;
        padding: 5px;
        text-align: center;


    }
</style>
