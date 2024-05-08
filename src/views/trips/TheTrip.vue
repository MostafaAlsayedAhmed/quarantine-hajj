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
              <h1>{{ trip.id !== 'AddNew' ? ` Update Trip #${trip.id}` : 'Add New Trip' }} </h1>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div class="container my-5">
        <form @submit.prevent="submitForm">
          <fieldset class="inputs-group p-3 p-md-5 mb-4 border-danger border  -subtle rounded">
            <div class="row row-cols-md-2 row-cols-lg-4 ">
              <div class="mb-4">
                <label for="tripName">Trip Name</label>
                <input type="text" id="tripName" v-model="trip.tripName" class="form-control">
              </div>
              <div class="mb-4">
                <label for="portOfArrival">Port of Arrival</label>

                <select class="form-select" id="portOfArrival" v-model="trip.portOfArrival">
                  <option value="" selected>Choose...</option>
                  <option value="Hurghada"> Hurghada </option>
                  <option value="Safaga"> Safaga </option>

                </select>
              </div>
              <div class="mb-4">
                <label for="dateOfArrival">Date of Arrival</label>
                <input type="date" id="dateOfArrival" v-model="trip.dateOfArrival" class="form-control">
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
                <input type="text" id="tripNumber" v-model="trip.tripNumber" class="form-control">
              </div>

              <div class="mb-4">
                <label for="transportAgency">Transport Agency</label>
                <input type="text" id="transportAgency" v-model="trip.transportAgency" class="form-control">
              </div>
              <div class="mb-4">
                <label for="link">Link</label>
                <input type="url" id="link" v-model="trip.link" class="form-control">
              </div>


            </div>
          </fieldset>

          <div class="mb-4 text-center">
            <button type="reset" class="btn btn-outline-warning mx-2">reset</button>
            <button v-if="id && id == 'AddNew'" type="submit" class="btn btn-success btn-lg px-5 mx-2">Create</button>
            <template v-else>
              <button type="submit" class="btn btn-primary btn-lg px-5 mx-2">Update</button>
              <button type="button" class="btn btn-danger btn-lg px-5  mx-2" @click="deleteTrip">Delete</button>
            </template>
          </div>


        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTripsStore } from '@/stores/trips'

const router = useRouter()
const tripsStore = useTripsStore()
const { tripsList } = storeToRefs(tripsStore)
const { addTrip, updateTrip, deleteTrip } = tripsStore

const { id, isNew } = defineProps(['id', 'isNew']);

const trip = ref({
  id: '',
  tripName: '',
  records: 0,
  link: '',
  responsible: '',
  portOfArrival: '',
  tripNumber: '',
  dateOfArrival: '',
  transportAgency: ''
})

function submitForm() {
  if (trip.value.id) {
    // Perform update logic
    console.log('Updating', trip);
    updateTrip(trip);


  } else {
    // Perform create logic
    // console.log('Creating', trip);
    addTrip(trip)
  }
  // Redirect or give feedback
  router.push('/schedule/');
}

onMounted(() => {
  console.log(id && id !== "AddNew");
  if (id && id !== "AddNew") {
    // Load the trip data for editing
    console.log('Fetching data for id', id);
    // Simulate fetching data
    // trip.value = { };
  }
})
</script>