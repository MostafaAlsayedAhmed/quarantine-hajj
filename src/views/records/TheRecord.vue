<template>

  <div>

    <router-view v-if="theNewPassengerId" :info="passenger" :trip="trip" :registrationId="theNewPassengerId">
    </router-view>

    <div class="container mt-5 record-header">
      <div class="text-center">
        <h1>{{ title }}</h1>
      </div>
      <ul class="row list list-inline p-3 p-md-4 mb-4 bg-primary-subtle rounded"
        style=" margin: 30px 0 -30px 0 !important;">
        <li class="col"> <strong>Trip Number:</strong> {{ trip.trip_number }}</li>
        <li class="col"> <strong> Arrival Port:</strong> {{ trip.arrival_port }}</li>
        <li class="col"> <strong> Arrival Date:</strong> {{ trip.arrival_date }}</li>
        <li class="col"> <strong> Agency:</strong> {{ trip.transport_agency }}</li>
      </ul>
    </div>

    <RegistrationCardForm :formData="passenger">
      <div>
        <div class="mb-4 text-center">
          <template v-if="isNewAdminRecord || isNewPassengerRegistration">
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
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, reactive, onMounted, readonly, nextTick } from 'vue'

import { useRouter, useRoute } from 'vue-router';
// import { useFormDataStore } from '@/stores/formData'
import RegistrationCardForm from '@/components/RegistrationCard.vue';
// import ThanksCard from '@/components/ThanksPage.vue';
const title = ref(`المتابعة الصحية للركاب القادمين من موسم الحج 2024`);

import { usePassengersStore } from '@/stores/passengers'
const passengersStore = usePassengersStore()
const { passenger } = storeToRefs(passengersStore)
const { addPassenger, getPassenger, updatePassenger, deletePassenger, subscribeToUpdateRecordsCount } = passengersStore;

const route = useRoute();
const router = useRouter();
const { tripId, recordId } = defineProps(['tripId', 'recordId']);

const isNewAdminRecord = recordId === "NewRecord"; // From the Admin
const isNewPassengerRegistration = route.name === 'Registration' // From the Passenger
const theNewPassengerId = ref("");
console.log(recordId);
const trip = ref({});

async function submitForm() {
  if (!isNewAdminRecord && !isNewPassengerRegistration) { // Perform update logic   

    const passengerObj = JSON.parse(JSON.stringify(passenger.value));
    // console.log(passenger.value); console.log(passengerObj); return
    updatePassenger(tripId, recordId, passengerObj);

  } else { // Perform create logic 
    theNewPassengerId.value = await addPassenger(tripId, passenger.value);
    console.log("The Trip Added", theNewPassengerId.value);
  }

  // Redirect 
  if (isNewAdminRecord) {
    alert("Redirect")

    router.push({
      name: 'TripRecords', params: { tripId: tripId }, query: {
        trip_number: trip.value.trip_number,
        arrival_port: trip.value.arrival_port,
        arrival_date: trip.value.arrival_date,
        transport_agency: trip.value.transport_agency,
      }
    });
  }

  if (isNewPassengerRegistration) {
    alert("is NewPassenger Registration");
    router.push({
      name: 'ThanksView', params: { tripId: tripId }, query: {
        trip_number: trip.value.trip_number,
        arrival_port: trip.value.arrival_port,
        arrival_date: trip.value.arrival_date,
        transport_agency: trip.value.transport_agency,
      }
    });
  }
}

async function deleteThePassenger() {
  const confirmAlert = confirm(`Are you sure that you want to delete "${passenger.value.full_name}"?`);

  if (confirmAlert) {
    deletePassenger(tripId, recordId);
    // return
    // subscribeToUpdateRecordsCount(tripId, recordId);
    await nextTick();

    // Redirect 
    router.push({
      name: 'TripRecords', params: { tripId: tripId },
      query: {
        trip_number: trip.value.trip_number,
        arrival_port: trip.value.arrival_port,
        arrival_date: trip.value.arrival_date,
        transport_agency: trip.value.transport_agency,
      }
    });
  }
}

onMounted(async () => {
  trip.value = route.query;
  console.log("trip");
  console.log(trip.value);
  theNewPassengerId.value = "123456789"
  if (recordId && recordId !== "NewRecord") {
    // Load the trip data for editing
    const theFetchedRecord = await getPassenger(tripId, recordId) || {};
    Object.assign(passenger.value, theFetchedRecord);
  }

  else {
    console.log("NewTrip");
  }
})

</script>
