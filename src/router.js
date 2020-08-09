import Home from "@/components/Home";
import Signup from "@/components/user/Signup";
import Events from "@/components/events/Events";
import CreateEvent from "@/components/events/CreateEvent";
import Profile from "@/components/user/Profile";
import Event from "@/components/events/Event";
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
        path: '/events/new',
        name: 'createEvent',
        component: CreateEvent
    },

    {
        path: '/events/:id',
        name: 'event',
        component: Event
    }
    ,


    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
]



