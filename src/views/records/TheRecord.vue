<template>

  <main>
    <div class="container mt-5">
      <div class="text-center">
        <h1>{{ title }}</h1>
      </div>
    </div>

    <RecordDetails  />
  </main>
</template>

<script setup>
import { ref } from "vue"
import RecordDetails from '@/components/RegistrationCard.vue';
const title = ref(`المتابعة الصحية للركاب القادمين من موسم الحج 2024`);

</script>
