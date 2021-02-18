import Vue from 'vue'
import VueRouter from 'vue-router'
import TheDashboard from '../views/TheDashboard.vue'
import DesignManage from '../views/DesignManage.vue'
import Templatemanage from '../views/TemplateManage.vue'
import Motionmanage from '../views/MotionManage.vue'
import DesignPost from '../views/DesignPost'
import TemplatePost from '../views/TemplatePost.vue'
import MotionPost from '../views/MotionPost.vue'
import CategoryManage from '../views/CategoryManage.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'TheDashboard',
        redirect: "/designmanage",
        component: TheDashboard
    },
    {
        path: '/designmanage',
        name: 'DesignManage',
        component: DesignManage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue')
    },
    {
        path: '/templatemanage',
        name: 'Templatemanage',
        component: Templatemanage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/Team.vue')
    },
    {
        path: '/motionmanage',
        name: 'Motionmanage',
        component: Motionmanage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/Team.vue')
    },
    {
        path: '/designmanage/posts/:id',
        name: 'DesignPosts',
        component: DesignPost,
    },
    {
        path: '/templatemanage/posts/:id',
        name: 'TemplatePosts',
        component: TemplatePost,
    },
    {
        path: '/motionmanage/posts/:id',
        name: 'MotionPosts',
        component: MotionPost,
    },
    {
        path: '/categorymanage',
        name: 'CategoryManage',
        component: CategoryManage,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router