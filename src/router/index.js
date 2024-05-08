import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TripsSchedule from '../views/trips/TripsSchedule.vue'
import TheTrip from '../views/trips/TheTrip.vue';
import TheRecord from '../views/records/TheRecord.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    // { path: '/', redirect: '/' },

    {
      path: '/',
      name: 'Home',
      component: HomeView, //Make it the enter point to the user or the admin

      children: [
        // { // defult: registration
        //   path: 'admin',
        //   name: 'Admin',
        //   component: Schedule,
        //   props: true
        // },
        // {
        //   path: 'trip/:id/registration/',
        //   name: 'registration',
        //   component: TheRecord,
        //   props: true
        // },
      ]
    },
    {
      path: '/registration/:id?',
      name: 'registration',
      component: TheRecord,
      props: true
    },


    // {
    //   path: '/schedule/',
    //   name: 'Schedule',
    //   component: TripsSchedule,

    //   children: [
    //     {
    //       path: 'trip/:id?',
    //       name: 'TheTrip',
    //       component: TheTrip,
    //       props: true
    //     },
    //   ]
    // },

    {
      path: '/login/:id?',
      name: 'login',
      component: HomeView,
      props: true
    },
    {
      path: '/schedule/',
      name: 'Schedule',
      component: TripsSchedule
    },
    {
      path: '/schedule/trip/:id?',
      name: 'TheTrip',
      component: TheTrip,
      props: true
    },

    {
      path: '/records/list/:id?',
      name: 'TripRecords',
      component: () => import('../views/records/TripRecords.vue'),
      props: true
    },
    {
      path: '/records/list/registration/:id?',
      name: 'Registration',
      component: () => import('../views/records/TheRecord.vue'),
      props: true
    },
    // {
    //   path: '/about', name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("beforeEach:", to, from);
  // if (to.name === 'team-members') {
  //     next()
  // } else {
  //     next({ name: 'team-members', params: { teamId: 't2' } })
  // }
  next();
});

router.afterEach((to, from) => {
  console.log("afterEach:", to, from);
})

export default router

// "/"
// "/registration/:temporaryActiveUniqueId"

// "/login"
// "/schedule/"
// "/schedule/trip/:tripId"
// "/schedule/trip/:tripId/records"
// "/schedule/trip/:tripId/records/:recordId"