<template>
    <v-container>
        <v-layout row wrap >
            <v-flex xs-12 sm6 class=" text-xs-center text-sm-right">
                <v-btn large router to="/events" class="primary"> Zobacz wydarzenia</v-btn>
            </v-flex>
            <v-flex xs-12 sm6 class=" text-xs-center text-sm-left">
                <v-btn large router to="/event/new" class="primary"> utwórz wydarzenie
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs-2>
                <v-carousel>
                    <v-carousel-item
                            v-for="event in events"
                            :key="event.id"
                            :src="event.src"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                    >
                        <div class="title">
                            {{event.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs-12  class=" text-center">
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
            return {
                events: [
                    {
                        src: 'https://i0.wp.com/zyciewpodrozy.pl/wp-content/uploads/2018/10/Park-Pa%C5%82acowy-Bia%C5%82owie%C5%BCa.jpg?resize=1170%2C658&ssl=1',
                        id: '111',
                        title: 'Białowieża'
                    },
                    {
                        src: 'https://zaciszezieloneogrody.pl/wp-content/uploads/2020/02/Podlasie-atrakcje.jpeg',
                        id: '12',
                        title: 'Narew'
                    },
                    {
                        src: 'https://magazynvip.pl/wp-content/uploads/2016/12/Gmina-Narewka-5.jpg',
                        id: '12',
                        title: 'Spływ kajakowy'
                    },
                    {
                        src: 'https://mtb-xc.pl/wp-content/uploads/2015/08/maratony-kresowe-narewka-2015-informacja-prasowa.jpg',
                        id: '4',
                        title: 'Maraton kresowy'
                    },


                ],
            }
        },
    }
</script>

<style scoped>
.title{
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    font-size: 18px;
    padding: 5px;
    text-align: center;


}
</style>
