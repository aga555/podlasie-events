<template>
<v-container>
    <v-layout row wrap>
        <v-flex>


               <v-container fluid>
                   <v-layout row>

                   <v-flex xs12 sm10 md8 offset-md2 v-for="event in events" :key="event.id" class="mb-3">
                       <v-card class="primary" >
                           <v-flex xs5 sm4 md3>
                           <v-img
                                   :src="event.imgUrl"
                                   height="134"
                           >

                           </v-img>
                       </v-flex>
                       <v-flex>
                           <v-card-title primary-title >
                            <div>
                                <h5 class="white--text mb-0">  {{event.title}}</h5>
                                   <div>{{event.date}}    </div>
                               </div>
                           </v-card-title>
                           <v-card-actions >
                               <v-btn
                                      :to="'/events/' + event.id"
                                       color="orange"
                                       text
                               >Zobacz wydarzenie
                               </v-btn>
                           </v-card-actions>
                                </v-flex>
                        </v-card>
                       </v-flex>
                   </v-layout>
               </v-container>

        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
    export default {
        name: "Events",
        computed:{
            events(){
                return this.$store.getters.loadedEvents
            }
        }
    }
</script>

<style scoped>

</style>
