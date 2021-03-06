import * as firebase from "firebase";


export default {
    state: {

        user: null,

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


        setUser(state, payload) {
            state.user = payload
        },


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


        signUserUp({commit}, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false);
                    const newUser = {
                        id: user.uid,
                        registeredEvents: [],
                        fbKeys: {}
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
                fbKeys: {}
            })
        },
        fetchUserData({commit, getters}) {
            commit('setLoading', true);
            firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
                .then(data => {
                    const eventsPairs = data.val()
                    let registeredEvents = []
                    let swappedPairs = {}
                    for (let key in eventsPairs) {
                        registeredEvents.push(eventsPairs[key])
                        swappedPairs[eventsPairs[key]] = key
                    }
                    const updatedUser = {
                        id: getters.user.id,
                        registeredEvents: registeredEvents,
                        fbKeys: swappedPairs
                    }
                    commit('setLoading', false);
                    commit('setUser', updatedUser);

                }).catch(error => {
                console.log(error)
                commit('setLoading', false)
            })

        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },

    },
    getters: {

        user(state) {

            return state.user
        },


    }

}

