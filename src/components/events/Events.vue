<template>
<v-container>
    <v-layout row wrap>
        <v-flex>
           <v-card class="info">

               <v-container fluid>
                   <v-layout row>
                       <v-flex xs5 sm4 md3>
                           <v-img
                                   src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                   height="134"
                           >

                           </v-img>
                       </v-flex>
                       <v-flex>
                           <v-card-title primary-title >
                            <div>
                                <h5 class="white--text mb-0">     Moje wydarzeenia</h5>
                                   <div>01.07.2020     </div>
                               </div>
                           </v-card-title>
                           <v-card-actions >

                               <v-btn flat
                                      to="/events/1"
                                       color="orange"
                                       text
                               >
                                 Zobacz wydarzenie
                               </v-btn>

                           </v-card-actions>
                       </v-flex>
                   </v-layout>
               </v-container>
           </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
    export default {
        name: "Events"
    }
</script>

<style scoped>

</style>
