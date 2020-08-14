<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h2 class="red--text">Utwórz nowe wydarzenie</h2>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <form @submit.prevent="onCreateEvent">


                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field color="red"
                                          name="title"
                                          label="nazwa"
                                          id="title"
                                          required
                                          v-model="title">

                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field color="red"
                                          name="location"
                                          label="lokalizacja"
                                          id="location"
                                          required
                                          v-model="location">

                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field color="red"
                                          name="imagerUrl"
                                          label="url"
                                          id="imag-url"
                                          required
                                          v-model="imgUrl">

                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imgUrl" height="300px">
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field color="red"
                                          name="description"
                                          label="opis"
                                          id="description"
                                          multi-line
                                          required
                                          v-model="description">

                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                    class="primary"
                                    :disabled="!formIsValid"
                                    type="submit"
                            >
                                utwórz wydarzenie
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "CreateEvent",
        data() {
            return {
                title: '',
                description: '',
                imgUrl: '',
                location: '',

            }
        },
        methods: {
            onCreateEvent() {

                if (!this.formIsValid){
                    return }
                const eventsData = {
                    title: this.title,
                    description: this.description,
                    imgUrl: this.imgUrl,
                    location: this.location,
                    date: new Date(),
                }

                alert('utowrozno wydarenie');
                this.$store.dispatch('createEvent',eventsData);
                this.$router.push('/events');

            }
        },
        computed: {
            formIsValid() {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imgUrl !== '' &&
                    this.description !== ''
            }
        }

    }
</script>

<style scoped>

</style>
