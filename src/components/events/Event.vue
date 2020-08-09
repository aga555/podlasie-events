<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text"> Moje wydarzenie </h6>

                    </v-card-title>
                    <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                            height="400"
                    >

                    </v-img>
                </v-card>
                <v-card-text>
                    <div> 17.07.2020</div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolor, ea eius excepturi,
                        explicabo
                        incidunt itaque maiores minima minus mollitia necessitatibus nostrum voluptate voluptatibus.
                        Deserunt ex optio quibusdam saepe tenetur.
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn dark> weź udział </v-btn>

                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Event"
    }
</script>

<style scoped>

</style>
