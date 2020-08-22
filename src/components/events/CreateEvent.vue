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
                            <input
                                    type="file"
                                    style="display: none"
                                    ref="fileInput"
                                    accept="image/*"
                                   @change="onFilePicked">
                            <v-btn @click="onPickFile"> zdjecie</v-btn>

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
                        <v-flex xs12 sm6 offset3>
                            <v-date-picker v-model="date">
                            </v-date-picker>


                        </v-flex>
                        <p style="color: deeppink">


                            {{date}}
                        </p>
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
                date: "",
                id: "",
                image:null


            }
        },
        methods: {
            onFilePicked (event) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                    return alert(' prosze wybrac prawidlowy format ')
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.imgUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0]);
                this.image = files[0]
            },
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onCreateEvent() {

                if (!this.formIsValid) {
                    return
                }
                if (!this.image){
                    return;
                }
                const eventsData = {
                    title: this.title,
                    description: this.description,
                    image: this.image,
                    location: this.location,
                    date: this.date,


                };

                alert('utowrozno wydarenie');
                this.$store.dispatch('createEvent', eventsData);
                this.$router.push('/events');

            }
        },
        computed: {
            formIsValid() {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imgUrl !== '' &&
                    this.description !== ''
            },
            /*      submittableDateTime (){
                      const date = new Date(this.date);
                  if (typeof this.time==="string"){
                      const hours= this.time.match(/^ (\d+)/);
                      const minutes= this.time.match(/:(\d+)/);
                      date.setHours(hours);
                      date.setMinutes(minutes)
                  }else {
                      date.setHours(this.time.getHours());
                      date.setMinutes(this.time.getMinutes());
                      console.log(date);
                  }

                  return date
                  }/!**!/*/

        }

    }
</script>

<style scoped>

</style>
