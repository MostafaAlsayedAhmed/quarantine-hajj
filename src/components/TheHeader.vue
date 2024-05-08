<template>

    <header v-if="0">
        <div class="container">

            <nav class="text-center m-auto">
                <!-- <RouterLink to="/">Home</RouterLink> _ _   _ _ -->
                <RouterLink :to="{ name: 'Schedule' }">Schedule</RouterLink> ||
                <RouterLink :to="{ name: 'TheTrip' }">trip</RouterLink> _ _ _ _
                <RouterLink :to="{ name: 'TripRecords' }">Records</RouterLink> ||
                <RouterLink :to="{ name: 'Registration' }">Registration</RouterLink> ||
            </nav>

            <div class="inner d-flex justify-content-around align-items-center ">
                <RouterLink to="/" class="logo"> <img alt="Vue logo" src="@/assets/images/logo_transparent.png">
                </RouterLink>
                <div class="titel fs-1">
                    <span> {{ heading }} </span>
                </div>
            </div>

        </div>
    </header>

    <header class="">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom align-items-center">

                <RouterLink to="/"
                    class="  d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img class="logo" alt="Vue logo" src="@/assets/images/logo_transparent.png">

                    <span class="fs-4 fw-bold">{{ heading }}</span>
                </RouterLink>

                <ul class="nav nav-pills">
                    <!-- <li class="nav-item">
                    <RouterLink class="nav-link" to="/">Home</RouterLink>
                </li> -->

                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Schedule' }">Schedule</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                    <RouterLink class="nav-link" :to="{ name: 'TheTrip' }">Trip</RouterLink>
                </li> -->
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'TripRecords' }">Records</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Registration' }">Registration</RouterLink>
                    </li>
                    <!-- <li class="nav-item dropdown ms-5">
                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </div>
    </header>

</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const heading = ref("الحجر الصحي المصري");
</script>

<style scoped>
.logo {
    height: 120px;
    width: 180px;
    object-fit: cover;
    object-position: 0px -10px;
    transform: scale(1.25);
}
</style>

<style>
div#app:has(main> .home-page) header { 
    display: none;
}
</style>