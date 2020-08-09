import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
        state: {
            loadedEvents: [
                {
                    src: 'https://i0.wp.com/zyciewpodrozy.pl/wp-content/uploads/2018/10/Park-Pa%C5%82acowy-Bia%C5%82owie%C5%BCa.jpg?resize=1170%2C658&ssl=1',
                    id: '1',
                    title: 'Białowieża',
                    date: '2020-08-08'
                },
                {
                    src: 'https://zaciszezieloneogrody.pl/wp-content/uploads/2020/02/Podlasie-atrakcje.jpeg',
                    id: '2',
                    title: 'Narew',
                    date: '2020-08-09'
                },
                {
                    src: 'https://magazynvip.pl/wp-content/uploads/2016/12/Gmina-Narewka-5.jpg',
                    id: '3',
                    title: 'Spływ kajakowy',
                    date: '2020-08-11'
                },
                {
                    src: 'https://mtb-xc.pl/wp-content/uploads/2015/08/maratony-kresowe-narewka-2015-informacja-prasowa.jpg',
                    id: '4',
                    title: 'Maraton kresowy',
                    date: '2020-08-20'
                },
            ],
            user: {
                id: '111',
                registredEvents: ['aa']
            }
        },
        mutations: {},
        actions: {},
        getters: {
            loadedEvents(state) {
                return state.loadedEvents.sort((eventA, eventB) => {
                    return eventA.date > eventB.date
                })
            },

            featuredEvents(state, getters) {
                return getters.loadedEvents.slice(0, 5)
            },
            loadedEvent(state) {
                return (eventId) => {
                    return state.loadedEvents.find((event) => {
                        return event.id === eventId
                    })
                }
            }
        }
    }
)
