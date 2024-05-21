<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from './supabase.js'
import { useAuth } from "@/composables/useAuth"

import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
const { isLoggedIn, setUser, user, Loading, router, route, RouterView } = useAuth()
 

const state = reactive({
  loading: false
})

onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    state.loading = true
     
    // if (router)
    //   console.log(router?.currentRoute?.value.name);
    if (!session) {
      router.push('/')
    } else {
      setUser(session ? session.user : null)
      router.forward()
    }
    state.loading = false
  })
})
</script>


<template>
  <TheHeader />
  <Loading v-if="state.loading" />

  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>