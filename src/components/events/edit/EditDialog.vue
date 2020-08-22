<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon>mdi-pen</v-icon>
                    edytuj
                </v-btn>


            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Edytuj wydarzenie</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-card-text>
                            <v-layout>
                                <v-flex xs12 sm12>
                                    <v-text-field color="red"
                                                  name="title"
                                                  label="nazwa"
                                                  id="title"
                                                  required
                                                  v-model="editTitle"
                                    >

                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-flex xs12 sm12>
                                <v-text-field color="red"
                                              name="description"
                                              label="opis"
                                              id="description"
                                              multi-line
                                              required
                                              v-model="editDescription"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12>

                                <v-date-picker
                        v-model="editDate"

                                ></v-date-picker>

                            </v-flex>
                        </v-card-text>


                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="dialog = false">Zamknij</v-btn>
                            <v-btn color="green darken-1" text @click="onSaveChanges">zapisz</v-btn>
                        </v-card-actions>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>

</template>

<script>
    export default {
        props: ['event'],
        name: "EditDialog",
        data() {
            return {
                dialog: false,
                editTitle: this.event.title,
                editDescription: this.event.description,
                editDate:this.event.date,
            }

        }, methods: {
            onSaveChanges() {
                if (this.editTitle === '' || this.editDescription === '') {
                    return
                }
                this.dialog = false
                this.$store.dispatch('updateEventData', {
                    id: this.event.id,
                    title: this.editTitle,
                    description: this.editDescription,
                    date: this.editDate
                })
            }
        }
    }
</script>

<style scoped>

</style>
