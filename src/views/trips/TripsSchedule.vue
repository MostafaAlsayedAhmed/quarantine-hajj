<template>
  <div class="container my-5">

    <div class="d-flex justify-content-between mb-3">
      <!-- <pre>  {{ tripsList }}</pre> -->
      <div>
        <h2> {{ tripsList.length }} Trips Schedule</h2>
      </div>

      <div>
        <router-link :to="{ name: 'TheTrip', params: { tripId: 'NewTrip', isNew: true } }" type="button"
          class="btn btn-success">Add New Trip</router-link>
      </div>
    </div>

    <vue-good-table compactMode :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true"
      :styleClass="tableStyle">

      <template #table-row="props">
        <span v-if="props.column.field == 'records'">
          <router-link style="text-decoration: none" :to="{ name: 'TripRecords', params: { tripId: props.row.id } }">
            <span style="text-decoration: underline;  color: blue;" class="w-100"> {{ props.row.passengers?.length || 0
              }}/{{ props.row.records || 0 }}</span>
            <strong v-if="props.row.passengers?.length" class="ms-1">
              ({{ props.row.passengers?.length / props.row.records * 100 || '' }}%)
            </strong>
          </router-link>
        </span>

        <span v-if="props.column.field == 'arrival_date'">{{ props.row.arrival_date?.split("T")[0] }} <strong>{{
          props.row.arrival_date?.split("T")[1].slice(0, -3) }}</strong></span>
        <span v-if="props.column.field == 'link'" style="font-weight: bold; color: blue;">
          <router-link :to="{ name: 'TheTrip', params: { tripId: props.row.id }}">
            Edit
          </router-link>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>
 
<script setup>
import { ref, onMounted } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import { storeToRefs } from 'pinia'
import { useTripsStore } from '@/stores/trips'

const tripsStore = useTripsStore()
const { tripsList } = storeToRefs(tripsStore)
const { getAllTrips, subscribeToTripsChannel } = tripsStore

const tableStyle = ref('vgt-table striped bordered')
const columns = ref([
  // { label: 'ID', field: 'id' },
  { label: 'Trip Name', field: 'trip_name' },
  { label: 'Responsible', field: 'responsible' },
  { label: 'Port of Arrival', field: 'arrival_port' },
  { label: 'Trip Number', field: 'trip_number' },
  { label: 'Date of Arrival', field: 'arrival_date' },
  { label: 'Agency', field: 'transport_agency' },
  { label: 'Records', field: 'records' },
  //Status: Done, progress, ..
  //progress? 60/120
  { label: '-', field: 'link', html: true },
]);
const rows = tripsList || ref([]);

onMounted(() => {
  getAllTrips()
});

subscribeToTripsChannel(); 
</script>
 
<style>
progress {
  vertical-align: baseline;
  position: relative;
  right: 0px;
  margin-inline: -15px;
  margin-bottom: -20px;
}
</style>
