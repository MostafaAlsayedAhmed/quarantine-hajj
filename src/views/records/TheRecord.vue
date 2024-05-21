<template>

  <main>
    <div class="container mt-5">
      <div class="text-center">
        <h1>{{ title }}</h1>
      </div>
    </div>

    <RegistrationCardForm :formData="passenger" :tripDetails="trip">

      <div>
        <div class="mb-4 text-center">
          <template v-if="isNewRecord">
            <button type="reset" class="btn btn-outline-warning mx-2">reset</button>
            <button type="submit" @click.prevent="submitForm"
              class="btn btn-success btn-lg my-2 px-5 mx-2">Create</button>
          </template>

          <template v-else>
            <button type="submit" @click.prevent="submitForm" class="btn btn-primary btn-lg px-5 mx-2">Update</button>
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
  
const isNewRecord = recordId === "NewRecord";

async function submitForm() {
  if (!isNewRecord) { // Perform update logic   

    const passengerObj = JSON.parse(JSON.stringify(passenger.value));
    // console.log(passenger.value); console.log(passengerObj); return
    updatePassenger(tripId, recordId, passengerObj);

  } else { // Perform create logic 
    await addPassenger(tripId, passenger.value);
    console.log("The Trip Added");
  }

  // Redirect 
  router.push({ name: 'TripRecords', params: { tripId } });
}

async function deleteThePassenger() {
  const confirmAlert = confirm(`Are you sure that you want to delete "${passenger.value.full_name}"?`);

  if (confirmAlert) {
    deletePassenger(recordId);
    await nextTick();
    // Redirect 
    router.push({ name: 'TripRecords' });
  }
}

onMounted(async () => {
  if (recordId && recordId !== "NewRecord") {
    // Load the trip data for editing
    const theFetchedRecord = await getPassenger(tripId, recordId) || {};

    // console.log(theFetchedRecord);
    // console.log(JSON.stringify(theFetchedRecord));
    // console.log(JSON.parse(JSON.stringify(theFetchedRecord))); 
    Object.assign(passenger.value, theFetchedRecord); 
  }

  else {
    console.log("NewTrip");
  }
})

</script>
