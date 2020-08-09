import Home from "@/components/Home";
import Signup from "@/components/user/Signup";
import Events from "@/components/events/Events";
import CreateEvent from "@/components/events/CreateEvent";
import Profile from "@/components/user/Profile";
import Signin from "@/components/user/Signin";



export const routers = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/signup',
        name: 'signUp',
        component: Signup
    },

    {
        path: '/signin',
        name: 'signIn',
        component: Signin
    },

    {
        path: '/events',
        name: 'events',
        component: Events
    },


    {
        path: '/event/new',
        name: 'createEvent',
        component: CreateEvent
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
]



