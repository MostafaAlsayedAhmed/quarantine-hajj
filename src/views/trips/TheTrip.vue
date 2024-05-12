<template>
  <div class="thetrip-page">
    <div class="container">
      <div class="container mt-5">
        <div class="text-center">

          <div class="d-flex align-content-between justify-content-between align-items-center">
            <div><router-link to="/schedule" type="button" class="btn btn-dark">
                < Back</router-link>
            </div>
            <div>
              <h1>{{ !isNewTrip ? ` Update Trip #` : 'Add New Trip' }}<small class="badge bg-secondary fs-6 "> {{tripId}}</small> </h1>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <!-- <ul class="overflow-auto bg-dark-subtle" style=" white-space: nowrap; ">
        <li v-for="atrip in tripsList">{{ atrip }}</li>
      </ul> -->


      <!-- <pre>trip: {{ trip }}</pre> -->
      <div class="container my-5">
        <form @submit.prevent="submitForm">
          <fieldset class="inputs-group p-3 p-md-5 mb-4 border-danger border  -subtle rounded">
            <div class="row row-cols-md-2 row-cols-lg-4 ">
              <div class="mb-4">
                <label for="tripName">Trip Name</label>
                <input type="text" id="tripName" v-model="trip.trip_name" class="form-control">
              </div>
              <div class="mb-4">
                <label for="portOfArrival">Port of Arrival</label>

                <select class="form-select" id="portOfArrival" v-model="trip.arrival_port">
                  <option value="" selected>Choose...</option>
                  <option value="Hurghada"> Hurghada </option>
                  <option value="Safaga"> Safaga </option>
                </select>
              </div>
              <div class="mb-4">
                <label for="dateOfArrival">Date of Arrival</label>
                <input type="datetime-local" id="dateOfArrival" v-model="trip.arrival_date" class="form-control">
              </div>

              <div class="mb-4">
                <label for="records">Records</label>
                <input type="number" id="records" v-model="trip.records" class="form-control">
              </div>

              <div class="mb-4">
                <label for="responsible">Responsible</label>
                <input type="text" id="responsible" v-model="trip.responsible" class="form-control">
              </div>

              <div class="mb-4">
                <label for="tripNumber">Trip Number</label>
                <input type="text" id="tripNumber" v-model="trip.trip_number" class="form-control">
              </div>

              <div class="mb-4">
                <label for="transportAgency">Transport Agency</label>
                <input type="text" id="transportAgency" v-model="trip.transport_agency" class="form-control">
              </div>
              <div class="mb-4">
                <label for="link">Link</label>
                <input type="url" id="link" v-model="trip.link" class="form-control">
              </div>


            </div>
          </fieldset>

          <div class="mb-4 text-center">
            <template v-if="isNewTrip">
              <button type="reset" class="btn btn-outline-warning mx-2">reset</button>
              <button type="submit" class="btn btn-success btn-lg px-5 mx-2">Create</button>
            </template>
            <template v-else>
              <button type="submit" class="btn btn-primary btn-lg px-5 m-2">Update</button>
              <button type="button" class="btn btn-danger btn-lg px-5  m-2"
                @click.prevent="deleteTheTrip()">Delete</button>
            </template>
          </div>


        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, reactive, onMounted, readonly, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTripsStore } from '@/stores/trips'


const route = useRoute();
const isNewTrip = route.params.tripId === "NewTrip"


const router = useRouter()
const tripsStore = useTripsStore()
const { tripsList } = storeToRefs(tripsStore)
const { addTrip, getTrip, updateTrip, deleteTrip } = tripsStore

const { tripId } = defineProps({ tripId: Number });


let trip = reactive({
  // id: isNewTrip ? Math.floor((Math.random() * 10000) + 1) : tripId,
  trip_name: '',
  responsible: '',

  arrival_port: '',
  trip_number: '',
  arrival_date: '',
  transport_agency: '',
  records: 0,
  done: false,
  link: '',
})

function submitForm() {
  if (!isNewTrip) { // Perform update logic 
    updateTrip(trip.id, JSON.parse(JSON.stringify(trip)));

  } else { // Perform create logic 
    // addTrip(trip);
    //tripsList.push(trip);

  }
  // Redirect 
  router.push({ name: 'Schedule' });
}

async function deleteTheTrip() {
  const confirma = confirm( `Are you sure that you want to delete "${trip.trip_name}" Trip ?` );

  if (confirma) {
    deleteTrip(tripId);
    await nextTick();
    // Redirect 
    router.push({ name: 'Schedule' });
  }
}

onMounted(async () => {
  if (tripId && tripId !== "NewTrip") {
    // Load the trip data for editing
    const theFetchedTrip = await getTrip(tripId) || {};
    Object.assign(trip, theFetchedTrip[0]);
    // console.log('Fetching data for id', tripId);
    // console.log("theFetchedTrip:", theFetchedTrip[0]);
    // console.log("trip:",JSON.parse(JSON.stringify(trip)) ); 
    // const theTrip = tripsList.value.find((trip) => trip.id == tripId);


  }
  else {
    console.log("NewTrip");
  }
})
</script>