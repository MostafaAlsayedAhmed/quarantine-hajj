import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TripsSchedule from '../views/trips/TripsSchedule.vue'
import TheTrip from '../views/trips/TheTrip.vue';
import TheRecord from '../views/records/TheRecord.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  strict: true, //match routes with or without a trailing slash.
  routes: [
    // { path: '/', redirect: '/' },

    {
      path: '/',
      name: 'Home',
      component: HomeView, //Make it the enter point to the user or the admin 

    },

    {
      path: '/trip/:tripUniqueId?/registration',
      name: 'Registration',
      component: TheRecord,
      // props: true
    },



    {
      path: '/login',
      name: 'login',
      component: HomeView,
      props: true
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: TripsSchedule,
    },

    {
      path: '/schedule/:tripId',
      name: 'TheTrip',
      component: TheTrip,
      props: true,
    },

    {
      path: '/schedule/:tripId?/records',
      name: 'TripRecords',
      component: () => import('../views/records/TripRecords.vue'),
      props: true
    },

    {
      path: '/schedule/:tripId?/records/:recordId?',
      name: 'Record',
      component: () => import('../views/records/TheRecord.vue'),
      props: true
    },

    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log("beforeEach:", to, from);


  // if (to.name === 'team-members') {
  //     next()
  // } else {
  //     next({ name: 'team-members', params: { teamId: 't2' } })
  // }
  next();
});

router.afterEach((to, from) => {
  // console.log("afterEach:", to, from);
})

export default router

// "/"
// "/trip/:tripUniqueId/registration/"

// "/login"
