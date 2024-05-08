<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter(); 
const currentLoginForm = ref('User');
 

function handleLogin() {
  router.push({ name: 'Schedule', params: { username: 'Eduardo Ali', email: 'eduardo@gmail.com', } });
}
function handleUser() {
  router.push({ name: 'Registration', params: { username: 'Eduardo Ali' } });
}
</script>

<template>
  <!-- <pre class="w-50" style="background:  #aaaddd;">  {{ $route.name }}</pre> -->
  <div class="home-page" style="background: ghostwhite;">
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
      <div class="row align-items-center g-lg-5 py-5">
         
        <div class="col-md-10 mx-auto col-lg-5 order-1 or">
          <div v-if="$route.name === 'login'">
            <form @submit="handleLogin()" class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
              <h3 class=" mb-3">Please sign in</h3>
              <div class="form-floating mb-3">
                <input required type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address </label>
              </div>
              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <div class="checkbox mb-3">
                <label> <input type="checkbox" value="remember-me"> Remember me </label>
              </div>
              <button @click="" class="w-100 btn btn-lg btn-primary" type="submit">sign in</button>
              <hr class="my-4">
              <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
            </form>
          </div>

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

              <button @click="this.$router.push('/records/list/registration')" class="w-100 btn btn-lg btn-primary"
                type="submit">Continue</button>
              <hr class="my-4">
              <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
            </form>
          </div>
        </div>

        <div class="col-lg-7 order-0 text-center text-lg -end">
          <div class=" text-center m-auto d-flex">
            <img style=" margin-top: -50px !important;" class="lo go m-auto" alt="Vue logo"
              src="/src/assets/images/logo_transparent.png">
            <!-- <img class="lo go m-auto" width="180" alt="Vue logo" src="https://iconape.com/wp-content/png_logo_vector/%D9%88%D8%B2%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B5%D8%AD%D8%A9-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9.png"> -->
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