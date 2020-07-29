<template>
    <v-app>
        <v-container>


            <v-app-bar
                    color="green"
                    dark
                    prominent
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>Podlasie extra</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-bell</v-icon>
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
                <v-list v-for="item in menuItems" :key="item.title"
                        nav
                        dense
                >
                    <v-list-item-group
                            v-model="group"
                            active-class="deep-purple--text text--accent-4"
                    >
                        <v-list-item>
                            <v-list-item-title>
                                {{item.title}}


                            </v-list-item-title>
                        </v-list-item>


                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>

            <v-card-text>
                The navigation drawer will appear from the bottom on smaller size screens.
            </v-card-text>
        </v-container>
      <msin>
        <router-view></router-view>
      </msin>
    </v-app>
</template>

<script>


    export default {
        name: 'App',
        data() {
            return {
                drawer: false,
                menuItems: [
                    {icon: 'midi-bell', title: 'View events'},
                    {icon: 'room', title: 'organize event'},
                    {icon: 'person', title: 'profile'},
                    {icon: 'face', title: 'sign in'},
                    {icon: 'lock', title: 'sign out'}
                ],
            }
        }
    }


</script>
