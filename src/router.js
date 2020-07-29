import Home from "@/components/Home";
import Signup from "@/components/user/Signup";
import Events from "@/components/events/Events";
import CreateEvent from "@/components/events/CreateEvent";
import Profile from "@/components/user/Profile";

export const routers = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },

    {
        path: '/events',
        name: 'events',
        component: Events
    },


    {
        path: '/createEvent',
        name: 'createEvent',
        component: CreateEvent
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
]


