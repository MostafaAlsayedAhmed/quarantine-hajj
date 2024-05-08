<template>
    
  <main>
    <div class="container mt-5">
      <div class="text-center">
        <h1>{{ title }}</h1>
      </div>
    </div>

    <RegistrationCard />
  </main>
</template>
<script> 
import RegistrationCard from '@/components/RegistrationCard.vue';
 
export default {
  name: 'App',
  data() {
    return {
      title: ` المتابعة الصحية للركاب القادمين من موسم الحج 2024`, 
    }
  },
  components: {
    RegistrationCard
  }
}
</script>

<style></style>
