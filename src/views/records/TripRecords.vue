<template>
  <div class="container my-5">

    <!-- <pre> {{ $route.query }}</pre> -->

    <div class="d-flex justify-content-between mb-3">
      <div>
        <h2> {{ rows.length }} Records of the Trip #{{ $route.params.tripId }} </h2>
      </div>
      <div>
      
        <router-link :to="{
          path: `/schedule/${$route.params.tripId}/records/NewRecord`, params: { isNew: true },
          query: {
            trip_number: $route.query.trip_number,
            arrival_port: $route.query.arrival_port,
            arrival_date: $route.query.arrival_date,
            transport_agency: $route.query.transport_agency,
          }
        }" type="button" class="btn btn-success">Add New Record</router-link>
      </div>
    </div>
    <ul v-if="isLoggedIn" class="row list list-inline p-3 p-md-4 mb-4 bg-primary-subtle rounded">
      <li class="col"> <strong>Trip Number:</strong> {{ $route.query.trip_number }}</li>
      <li class="col"> <strong> Arrival Port:</strong> {{ $route.query.arrival_port }}</li>
      <li class="col"> <strong> Arrival Date:</strong> {{ $route.query.arrival_date }}</li>
      <li class="col"> <strong> Agency:</strong> {{ $route.query.transport_agency }}</li>
    </ul>

    <vue-good-table :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true" :styleClass="tableStyle"
      :search-options="{ enabled: true }">

      <template #table-row="props">
        <span v-if="props.column.field == 'link'" style="font-weight: bold; color: blue;">
          <router-link :to="{
          name: 'Record', params: { tripId: $route.params.tripId, recordId: props.row.id },
          query: {
            trip_number: $route.query.trip_number,
            arrival_port: $route.query.arrival_port,
            arrival_date: $route.query.arrival_date,
            transport_agency: $route.query.transport_agency,
          }
        }">
            Edit</router-link>
        </span>

      </template>
    </vue-good-table>
  </div>
</template>


<script setup>
import { ref, onMounted, inject } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import { storeToRefs } from 'pinia'
import { usePassengersStore } from '@/stores/passengers'

import { useRoute } from 'vue-router'
const route = useRoute();

const passengersStore = usePassengersStore()
const { passengersList } = storeToRefs(passengersStore)
const { getAllPassengers } = passengersStore

const tableStyle = ref('vgt-table striped bordered')
const columns = ref([
  { label: 'Full Name', field: 'full_name' },
  { label: 'Passport Number', field: 'passport_number' },

  { label: 'Seat No', field: 'seat_number' },
  { label: 'Phone Number', field: 'phone_number' },

  { label: 'Governorate', field: 'governorate' },
  { label: 'Region', field: 'region' },
  { label: 'Address', field: 'address' },
  { label: '-', field: 'link', html: true },
]);
const rows = ref([]);

const isLoggedIn = inject('isLoggedIn')
console.log("isLoggedIn", isLoggedIn.value);


const trip = route.query;
const tripInfoLink = ref('')


onMounted(async () => {
  await getAllPassengers(route.params.tripId)
  rows.value = passengersList.value;
  tripInfoLink.value =
    `trip_number=${trip.trip_number}&arrival_port=${trip.arrival_port}&arrival_date=${trip.arrival_date.split('T')[0]}&transport_agency=${trip.transport_agency}`
});

</script>
