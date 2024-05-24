<script setup>
import { ref, reactive } from "vue"
import { supabase } from "@/supabase";
import { useAuth } from "@/composables/useAuth"
const { isLoggedIn, signOut, setUser, user, Loading, router, route, RouterView } = useAuth()


// function handleLogin() {
//   router.push({ name: 'Schedule', params: { username: 'Eduardo Ali', email: 'eduardo@gmail.com', } });
// }
// function handleUser() {
//   router.push({ name: 'Registration', params: { username: 'Eduardo Ali' } });
// }
// 

const state = reactive({
  loading: false,
  disabled: false,
  error: undefined,
  data: undefined,

  email: "",
  password: "",
})

const login = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password
  })

  state.data = data;
  state.error = error;

  if (data.user.id) {
    router.push({ name: 'Schedule', params: { username: 'Eduardo Ali', email: 'eduardo@gmail.com', } });
  }
}

</script>

<template>
  <!-- <pre class="w-50" style="background:  #aaaddd;">  {{ $route.name }}</pre> -->
  <div class="home-page" style="background: ghostwhite;">
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
      isLoggedIn: {{ isLoggedIn }} <div class="row align-items-center g-lg-5 py-5">

        <!-- <pre style=" left: 0; top: 0; width: 350px;" class="position-fixed bg-warning-subtle"> {{ state.data }} <br/> <hr/> {{ state.error }} </pre> -->

 
        <div v-if="!isLoggedIn" class="col-md-10 mx-auto col-lg-5 order-1 or">
          <!-- Admin Login -->
          <div v-if="$route.name === 'login'">
            <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
              <h3 class=" mb-3">Please sign in</h3>
              <div class="form-floating mb-3">
                <input required v-model="state.email" type="email" class="form-control" id="floatingInput"
                  placeholder="name@example.com">
                <label for="floatingInput">Email address </label>
              </div>
              <div class="form-floating mb-3">
                <input required v-model="state.password" type="text" class="form-control" id="floatingPassword"
                  placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <div class="checkbox mb-3">
                <label> <input type="checkbox" value="remember-me"> Remember me </label>
              </div>
              <button @click.prevent="login()" class="w-100 btn btn-lg btn-primary" type="submit">sign in</button>
              <hr class="my-4">
              <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
            </form>
          </div>
          <!-- Passenger Registration -->
          <div v-else>
            <form @submit="handleUser()" class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
              <h3 class=" mb-3"> Trip #A255</h3>

              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Passport Number</label>
              </div>
              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Seat Number</label>
              </div>

              <button @click="this.$router.push({ name: 'Registration', params: { tripId: 'AAA' } })"
                class="w-100 btn btn-lg btn-primary" type="submit">Continue</button>
              <hr class="my-4">
              <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
            </form>
          </div>
        </div>

        <div v-else class="col-md-10 mx-auto col-lg-5 order-1  d-flex  gap-2">

          <button @click="this.$router.push({ name: 'Schedule' })" class="w-100 btn btn-lg btn-primary"
            type="submit">Back to Schedule</button>

          <button @click="signOut" class="w-50 btn btn-dark" type="button">Log Out</button>
        </div>

        <div class="col-lg-7 order-0 text-center text-lg -end">
          <div class=" text-center m-auto d-flex">
            <img style=" margin-top: -50px !important;" class="lo go m-auto" alt="Vue logo"
              src="/src/assets/images/logo_transparent.png">
          </div>

          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3"> المتابعة الصحية للركاب القادمين من موسم الحج 2024
          </h1>
          <!-- <p  class="col-lg-010 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each
            required
            form group has a validation state that can be triggered by attempting to submit the form without completing
            it.</p> -->
        </div>
      </div>
    </div>
  </div>
</template>