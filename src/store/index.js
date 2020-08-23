import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
        state: {
            loadedEvents: [
                {
                    imgUrl: 'https://i0.wp.com/zyciewpodrozy.pl/wp-content/uploads/2018/10/Park-Pa%C5%82acowy-Bia%C5%82owie%C5%BCa.jpg?resize=1170%2C658&ssl=1',
                    id: '1',
                    title: 'Białowieża',
                    date: '2020-08-08'
                },
                {
                    imgUrl: 'https://zaciszezieloneogrody.pl/wp-content/uploads/2020/02/Podlasie-atrakcje.jpeg',
                    id: '2',
                    title: 'Narew',
                    date: '2020-08-09'
                },
                {
                    imgUrl: 'https://magazynvip.pl/wp-content/uploads/2016/12/Gmina-Narewka-5.jpg',
                    id: '3',
                    title: 'Spływ kajakowy',
                    date: '2020-08-11'
                },
                {
                    imgUrl: 'https://mtb-xc.pl/wp-content/uploads/2015/08/maratony-kresowe-narewka-2015-informacja-prasowa.jpg',
                    id: '4',
                    title: 'Maraton kresowy',
                    date: '2020-08-20'
                }
            ],
            user: null,
            loading: false,
            error: null
        },
        mutations: {
            registerUserForEvent(state, payload) {
                const id = payload.id;
                if (state.user.registeredEvents.findIndex(event => event.id === id) >= 0) {
                    return
                }
                state.user.registeredEvents.push(id);
                state.user.fbKeys[id] = payload.fbKey
            },
            unregisterUserForEvent(state, payload) {
                const registeredEvents = state.user.registeredEvents
                registeredEvents.splice(registeredEvents.findIndex(event => event.id === payload), 1)
                Reflect.deleteProperty(state.user.fbKeys, payload)
            },

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
            setLoadedEvents(state, payload) {

                state.loadedEvents = payload
            },
            updateEvent(state, payload) {
                const event = state.loadedEvents.find(event => {
                    return event.id === payload.id
                })
                if (payload.title) {
                    event.title = payload.title
                }
                if (payload.description) {
                    event.description = payload.description
                }
                if (payload.date) {
                    event.date = payload.date
                }
            }
        },
        actions: {
            registerUserForEvent({commit, getters}, payload) {
                commit('setLoading', true);
                const user = getters.user
                firebase.database().ref('/users/' + user.id).child('/registration/')
                    .push(payload)
                    .then((data) => {
                        commit('setLoading', false)
                        commit('registerUserForEvent', {id: payload, fbKey: data.key})
                    })
                    .catch(error => {
                        console.log(error)
                        commit('setLoading', false)
                    })

            },

            unregisterUserForEvent({commit, getters}, payload) {
                commit('setLoading', true);
                const user = getters.user
                if (!user.fbKeys) {
                    return
                }
                const fbKey = user.fbKeys[payload]
                firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey).remove()

                    .then(() => {
                        commit('setLoading', false);
                        commit('unregisterUserForEvent', payload)
                    })
                    .catch(error => {
                        console.log(error);
                        commit('setLoading', false);
                    })
            },

            loadEvents({commit}) {
                commit('setLoading', true);
                firebase.database().ref('events').once('value')
                    .then((data) => {
                        const events = []
                        const obj = data.val()
                        for (let key in obj) {
                            events.push({
                                id: key,
                                title: obj[key].title,
                                description: obj[key].description,
                                location: obj[key].location,
                                imgUrl: obj[key].imageUrl,
                                date: obj[key].date,
                                creatorId: obj[key].creatorId
                            })
                        }
                        console.log(events)
                        commit('setLoadedEvents', events)
                        commit('setLoading', false);

                    })
                    .catch((error) => {
                        console.log(error)
                        commit('setLoading', false);
                    })
            },
            createEvent({commit, getters}, payload) {
                const event = {
                    title: payload.title,
                    description: payload.description,
                    location: payload.location,
                    date: payload.date,
                    creatorId: getters.user.id

                };

                let storageRef;
                let uploadTask;
                let key;
                firebase.database().ref('events').push(event)
                    .then((data) => {
                        key = data.key
                        return key
                    })
                    .then(key => {
                        const filename = payload.image.name
                        const ext = filename.slice(filename.lastIndexOf('.'))
                        storageRef = firebase.storage().ref();
                        uploadTask = storageRef.child('events/' + key + ext).put(payload.image)
                        return uploadTask
                    })
                    .then((uploadTask) => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.ref.getDownloadURL().then((downloadURL) => {
                            firebase.database().ref('events').child(key).update({imageUrl: downloadURL})
                                .then(() => {
                                    commit('createEvent', {
                                        ...event,
                                        imageUrl: downloadURL,
                                        id: key
                                    })
                                })
                                .catch((error) => {
                                    console.log(error)
                                })

                        })
                    })

            },


            updateEventData({commit}, payload) {
                commit('setLoading', true);
                const updateObj = {};
                if (payload.title) {
                    updateObj.title = payload.title
                }
                if (payload.description) {
                    updateObj.description = payload.description
                }
                if (payload.date) {
                    updateObj.date = payload.date
                }
                firebase.database().ref('events').child(payload.id).update(updateObj)
                    .then(() => {
                        commit('setLoading', false)
                        commit('updateEvent', payload)
                    })
                    .catch(error => {
                        console.log(error)
                        commit('setLoading', false)
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
                            registeredEvents: [],
                            fbKeys:{}
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
                            registeredEvents: [],
                            fbKeys: {}
                        };
                        commit('setUser', newUserLogin)
                    })
                    .catch(error => {
                        commit('setLoading', false);
                        commit('setError', error);
                        console.log(error)
                    });
            },
            autoSignIn({commit}, payload) {
                commit('setUser', {
                    id: payload.uid,
                    registeredEvents: [],
                    fbKeys: {}})
            },
            logout({commit}) {
                firebase.auth().signOut()
                commit('setUser', null)
            },
            clearError({commit}) {
                commit('clearError')
            }

        },
        getters: {
            loadedEvents(state) {
                return state.loadedEvents.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                })
            },

            featuredEvents(state, getters) {
                return getters.loadedEvents.slice(0, 3)
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
