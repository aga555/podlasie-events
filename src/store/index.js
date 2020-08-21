import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
        state: {
            loadedEvents: [

            ],
            user: null,
            loading: false,
            error: null
        },
        mutations: {
            createEvent(state, payload) {
                state.loadedEvents.push(payload)
            },
            setUser(state, payload) {
                state.user = payload
            },
            setLoading(state, payload) {
                state.loading = payload

            },
            setError(state, payload) {
                state.error = payload
            },
            clearError(state) {
                state.error = null
            },
            setLoadedEvents(state, payload ){
                state.loadedEvents = payload
                console.log(payload)

            }
        },
        actions: {
            loadEvents({commit}){
             commit('setLoading', true);
                firebase.database().ref('events').once('value')
                            .then((data)=>{
                                    const events = []
                                    const obj = data.val()
                                     for (let key in obj){
                                      events.push({
                                          id:key,
                                          title:obj[key].title,
                                          description:obj[key].description,
                                          location:obj[key].location,
                                          imgUrl:obj[key].imgUrl,
                                          date:obj[key].date,
                                      })
                                        }
                                        commit('setLoadedEvents',events)
                                        commit('setLoading', false);
/*console.log(events)*/
                            })
                        .catch((error)=>{
                             console.log(error)
                            commit('setLoading', false);
                            })
            },
            createEvent({commit}, payload) {
                const event = {
                    title: payload.title,
                    description: payload.description,
                    imgUrl: payload.imgUrl,
                    location: payload.location,
                    date: payload.date,

                }
                firebase.database().ref('events').push(event)
                    .then((data) => {
                        const key = data.key
                        commit('createEvent',
                            {
                                ...event,
                                id: key
                            })
                    })
                    .catch((error) => {
                    console.log(error)
                })


            },

            signUserUp({commit}, payload) {
                commit('setLoading', true);
                commit('clearError');
                firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registredEvents: []
                        }
                        commit('setUser', newUser)
                    })
                    .catch(error => {
                        commit('setLoading', false);
                        commit('setError', error);
                        console.log(error)
                    });
            },
            signUserIn({commit}, payload) {
                commit('setLoading', true);
                commit('clearError');
                firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                    .then(user => {
                        commit('setLoading', false);
                        const newUserLogin = {
                            id: user.uid,
                            registredEvents: []
                        };
                        commit('setUser', newUserLogin)
                    })
                    .catch(error => {
                        commit('setLoading', false);
                        commit('setError', error);
                        console.log(error)
                    });
            },
            clearError({commit}) {
                commit('clearError')
            }

        },
        getters: {
            loadedEvents(state) {
                return state.loadedEvents.sort(function(a,b) {
                return new Date(b.date) - new Date(a.date);
                          })
                },

            featuredEvents(state, getters) {
                return getters.loadedEvents.slice(0,3)
            },
            loadedEvent(state) {
                return (eventId) => {
                    return state.loadedEvents.find((event) => {
                        return event.id === eventId
                    })
                }
            },

            user(state) {

                return state.user
            },
            loading(state) {
                return state.loading
            },
            error(state) {
                return state.error
            }

        }

    }
)
