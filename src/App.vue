<template>
    <v-app>
        <v-container>
            <v-app-bar
              class="primary"
                    dark
                    prominent
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    <router-link to="/" tag="span" style="cursor: pointer">Podlasie extra</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-list-item v-for="item in menuItems"
                                   :key="item.title"
                                   :to="item.link"
                                   nav

                >

                    <v-list-item>
                        <v-list-item-title>
                            {{item.title}}


                        </v-list-item-title>
                    </v-list-item>


                </v-list-item>


                <v-list-item-group
                        v-if="this.userIsAutehenticated">
                    <v-list-item>
                        <v-btn @click="onLogOut"> wyloguj


                        </v-btn>
                    </v-list-item>

                </v-list-item-group>


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
                <v-list-item
                        v-for="item in menuItems"
                        :key="item.title"
                        :to="item.link"
                        nav
                >
                    <v-list-item>
                        {{item.title}}
                    </v-list-item>
                </v-list-item>

                <v-list-item-group
                        v-if="this.userIsAutehenticated">
                    <v-list-item>
                        <v-btn dark> wyloguj
                        </v-btn>
                    </v-list-item>
                </v-list-item-group>

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
        }, methods: {
            onLogOut() {
                this.$store.dispatch('logout')
            }
        },
        computed: {
            menuItems() {
                let menuItems = [
                    {icon: 'face', title: 'zaloguj', link: '/signin'},
                    {icon: 'lock', title: 'zarejestruj', link: '/signup'}
                ]
                if (this.userIsAutehenticated) {
                    menuItems = [
                        {icon: 'midi-bell', title: 'zobacz wydarzenia', link: '/events'},
                        {icon: 'room', title: 'utwórz wydarzenie', link: '/events/new'},
                        {icon: 'person', title: 'mój profil', link: '/profile'}
                    ]
                }
                return menuItems
            },
            userIsAutehenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        }
    }


</script>
