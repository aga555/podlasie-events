<template>
    <v-app>
        <v-container>


            <v-app-bar
                    color="green"
                    dark
                    prominent
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    <router-link to="/" tag="span" style="cursor: pointer">Podlasie extra  </router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>
           <v-btn v-for="item in menuItems"
                        :key="item.title"
                        router
                        :to="item.link"
                        nav

                >
                    <v-list-item-group


                    >
                        <v-list-item>
                            <v-list-item-title>
                                {{item.title}}


                            </v-list-item-title>
                        </v-list-item>


                    </v-list-item-group>
                </v-btn>




                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-filter</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    bottom
                    temporary
            >
                <v-btn
                        v-for="item in menuItems"
                        :key="item.title"
                        router
                        :to="item.link"
                        nav
                >
                    <v-list-item-group


                    >
                        <v-list-item>
                            <v-list-item-title>
                                {{item.title}}


                            </v-list-item-title>

                        </v-list-item>


                    </v-list-item-group>
                </v-btn>
            </v-navigation-drawer>

            <router-view></router-view>

        </v-container>



    </v-app>
</template>

<script>


    export default {
        name: 'App',
        data() {
            return {
                drawer: false,

            }
        },
        computed:{
        menuItems (){
                let menuItems = [
                    {icon: 'face', title: 'zaloguj',link:'/signin'},
                    {icon: 'lock', title: 'zarejestruj',link:'/signup'}
                ]
            if (this.userIsAutehenticated) {
                menuItems = [
                    {icon: 'midi-bell', title: 'zobacz wydarzenia',link:'/events'},
                    {icon: 'room', title: 'utwórz wydarzenie', link:'/events/new'},
                    {icon: 'person', title: 'mój profil', link:'/profile'}
                    ]
            }
            return menuItems
            },
            userIsAutehenticated (){
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        }
    }


</script>
