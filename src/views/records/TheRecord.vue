<template>

  <main>
    <div class="container mt-5">
      <div class="text-center">
        <h1>{{ title }}</h1>
      </div>
    </div>
    isNewRecord: {{ isNewRecord }}
    <br>
    {{ passenger }}
    <RegistrationCardForm :formData="passenger" >

      <div>
        <div class="mb-4 text-center">
          <template v-if="isNewRecord">
            <button type="reset" class="btn btn-outline-warning mx-2">reset</button>
            <button type="submit" @submit.prevent="submitForm"
              class="btn btn-success btn-lg my-2 px-5 mx-2">Create</button>
          </template>

          <template v-else>
            <button type="submit" @submit.prevent="submitForm" class="btn btn-primary btn-lg px-5 mx-2">Update</button>
            <button type="button" @click.prevent="deleteThePassenger"
              class="btn btn-danger btn-lg px-5 my-2 mx-2">Delete</button>
          </template>
        </div>
      </div>
    </RegistrationCardForm>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, reactive, onMounted, readonly, nextTick } from 'vue'

import { useRouter, useRoute } from 'vue-router';
// import { useFormDataStore } from '@/stores/formData'
import RegistrationCardForm from '@/components/RegistrationCard.vue';
const title = ref(`المتابعة الصحية للركاب القادمين من موسم الحج 2024`);

// const formDataStore = useFormDataStore();
// const { form } = storeToRefs(formDataStore);

import { usePassengersStore } from '@/stores/passengers'
const passengersStore = usePassengersStore()
const { passenger, trip } = storeToRefs(passengersStore)
const { addPassenger, getPassenger, updatePassenger, deletePassenger } = passengersStore;

const route = useRoute();
const router = useRouter();
const { tripId, recordId } = defineProps(['tripId', 'recordId']);

console.log("params:", route.params);
  
const isNewRecord = recordId === "NewRecord";

async function submitForm() {
  if (!isNewRecord) { // Perform update logic 
    updatePassenger(recordId, JSON.parse(JSON.stringify(passenger)));

  } else { // Perform create logic 
    await addPassenger(passenger);
    console.log("The Trip Added");
    // createTripPartition(theTrip)
  }

  // Redirect 
  router.push({ name: 'Schedule' });
}

async function deleteThePassenger() {
  const confirmAlert = confirm(`Are you sure that you want to delete "${passenger.full_name}"?`);

  if (confirmAlert) {
    deleteTrip(recordId);
    await nextTick();
    // Redirect 
    router.push({ name: 'TripRecords' });
  }
}

onMounted(async () => {
  if (recordId && recordId !== "NewRecord") {
    // Load the trip data for editing
    const theFetchedRecord = await getPassenger(tripId, recordId) || {};

    console.log(theFetchedRecord);
    // console.log(JSON.stringify(theFetchedRecord));
    // console.log(JSON.parse(JSON.stringify(theFetchedRecord)));
    console.log("passenger::", passenger);
    Object.assign(passenger, theFetchedRecord);
  }

  else {
    console.log("NewTrip");
  }
})

</script>
