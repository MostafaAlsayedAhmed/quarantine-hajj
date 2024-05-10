<template>
    <header class="">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom align-items-center">

                <RouterLink to="/"
                    class=" d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img class="logo" alt="Vue logo" src="@/assets/images/logo_transparent.png">

                    <span class="fs-4 fw-bold">{{ heading }}</span>
                </RouterLink>

                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Schedule' }">Schedule</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'TripRecords' }">Records</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Registration' }">Registration</RouterLink>
                    </li>
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