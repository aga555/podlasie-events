<template>
    <div>
        <v-container>
            <v-layout row v-if="error">
                <v-flex xs12 sm6 offset-sm3>
            <app-alert
                    @dismissed="onDismissed"
                         :text="error.message">

            </app-alert>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs-12 sm-6 offset-sm-3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <form @submit.prevent="onSignup">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="email"
                                                    label="mail"
                                                    id="email"
                                                    v-model="email"
                                                    type="email"
                                                    aria-required="true">

                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="password"
                                                    label="hasło"
                                                    id="password"
                                                    v-model="password"
                                                    type="password"
                                                    aria-required="true">

                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="conrfirmPassword"
                                                    label="potwierdź hasło"
                                                    id="confirmPassword"
                                                    v-model="confirmPassword"
                                                    type="password"
                                                    :rules="[comparePassword]"

                                            >

                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs-12>

                                            <v-btn type="submit" :disabled="loading" :loading="loading" >
                                                Zarejestruj

                                            </v-btn>
                                        </v-flex>

                                    </v-layout>
                                </form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Signup",
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',

            }
        },
        computed: {
            comparePassword() {
                return this.password !== this.confirmPassword ? 'Podane hasła nie sa identyczne' : ''
            },
            user() {
                return this.$store.getters.user
            },
            error(){
                return this.$store.getters.error
            },
            loading(){
                return this.$store.getters.loading
            }

        },
        watch: {
            user(value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/');
                    console.log(value);
                }
            }
        },
        methods: {
            onSignup() {

                this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            }
            ,
            onDismissed() {

                this.$store.dispatch('clearError')
            }
        }
    }
</script>

<style scoped>

</style>
