<template>
  <div class="container my-5">
    <!-- <pre> {{ rows[0] }}</pre> -->
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h2> {{ rows.length }} Records of the Trip #{{ $route.params.tripId }} </h2>
      </div>
      <div> 
        <router-link :to="{ path: `/schedule/${$route.params.tripId}/records/NewRecord`, params: { isNew: true } }"
          type="button" class="btn btn-success">Add New Record</router-link>
      </div>
    </div>

    <vue-good-table :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true" :styleClass="tableStyle"
      :search-options="{ enabled: true }">

      <template #table-row="props">
        <span v-if="props.column.field == 'link'" style="font-weight: bold; color: blue;">
          <router-link :to="{ name: 'Record', params: { tripId: $route.params.tripId, recordId: props.row.id } }">
            Edit</router-link>
        </span>

      </template>
    </vue-good-table>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import { storeToRefs } from 'pinia'
import { usePassengersStore } from '@/stores/passengers'

import { useRoute } from 'vue-router'
const route = useRoute();

const passengersStore = usePassengersStore()
const { passengersList } = storeToRefs(passengersStore)
const { getAllPassengers, subscribeToPassengersChannel } = passengersStore

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

onMounted(async () => {
  await getAllPassengers(route.params.tripId)
  // console.log(passengersList.value );
  rows.value = passengersList.value
});

subscribeToPassengersChannel(); 
</script>

<script>
// rows: [{  "id": 5, "fullName": "John Doe", "passportNumber": "Summer Excursion", "seatNo": 150, "link": '', "phoneNumber": "002 01022099686", "governorate": "John Doe", "region": "USA",  "address": "XA123",  }],
</script>
