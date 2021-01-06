import Vue from 'vue'
import VueRouter from 'vue-router'
import TheDashboard from '../views/TheDashboard.vue'
import PlanManage from '../views/PlanManage.vue'
// import ExclusiveFrame from '../views/ExclusiveFrame.vue'
import FramePost from '../views/FramePost'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'TheDashboard',
        redirect: "/planmanage",
        component: TheDashboard
    },
    {
        path: '/planmanage',
        name: 'Planmanage',
        component: PlanManage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue')
    },
    // {
    // path: '/exclusiveframe',
    // name: 'Exclusiveframe',
    // component: ExclusiveFrame,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Team.vue')
    // },
    {
        path: '/planmanage/posts/:id',
        name: 'Posts',
        component: FramePost,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router