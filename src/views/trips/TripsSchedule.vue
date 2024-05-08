<template>
  <div class="container my-5">

    <ul style=" white-space: nowrap; ">
      <li v-for="trip in tripsList">{{ trip }}</li>
    </ul>

    <div class="d-flex justify-content-between mb-3">
      <div>
        <h2>Trips Schedule</h2>
      </div>
      <div>
        <router-link :to="{ path: '/schedule/trip/AddNew', params: { isNew: true } }" type="button"
          class="btn btn-success">Add New Trip</router-link>
      </div>
    </div>

    <vue-good-table :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true" :styleClass="tableStyle">

      <template #table-row="props">

        <span v-if="props.column.field == 'records'" style="font-weight: bold; color: blue;">
          <router-link :to="{ name: 'TripRecords', params: { id: props.row.id } }">
            {{ props.row.records }}
          </router-link>
        </span>
        <span v-if="props.column.field == 'link'" style="font-weight: bold; color: blue;">
          <router-link :to="{ name: 'TheTrip', params: { id: props.row.id } }">
            Edit
          </router-link>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import { storeToRefs } from 'pinia'
import { useTripsStore } from '@/stores/trips'


const tripsStore = useTripsStore()
const { tripsList } = storeToRefs(tripsStore)

const tableStyle = ref('vgt-table striped bordered')
const columns = ref([
  { label: 'ID', field: 'id' },
  { label: 'Trip Name', field: 'tripName' },
  { label: 'Responsible', field: 'responsible' },
  { label: 'Port of Arrival', field: 'portArrival' },
  { label: 'Trip Number', field: 'tripNumber' },
  { label: 'Date of Arrival', field: 'dateOfArrival' },
  { label: 'Airline Name', field: 'airlineName' },
  { label: 'Records', field: 'records' },
  //Status: Done, progress, ..
  //progress? 60/120
  { label: '-', field: 'link', html: true },
]);

let rows = tripsList || ref([]);

onMounted(() => {
  console.log(" onMounted ");
  rows = tripsList
});

watch(() => rows,
  (rows, prevRows) => {
    rows = tripsList
  }
)
</script>