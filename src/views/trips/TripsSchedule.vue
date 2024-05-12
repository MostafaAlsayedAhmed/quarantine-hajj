<template>
  <div class="container my-5">

    <div class="d-flex justify-content-between mb-3">
      <div>
        <h2> {{ tripsList.length }} Trips Schedule</h2>
      </div>

      <div>
        <router-link :to="{ name: 'TheTrip', params: { tripId: 'NewTrip', isNew: true } }" type="button"
          class="btn btn-success">Add New Trip</router-link>
      </div>
    </div>
    <h1>{{ tripsList.length }}</h1>
    <vue-good-table compactMode :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true"
      :styleClass="tableStyle">

      <template #table-row="props">
        <span v-if="props.column.field == 'records'">
          <router-link :to="{ name: 'TripRecords', params: { tripId: props.row.id } }">
            <span style="text-decoration: none;  color: blue; " class="w-100"> {{ props.row.records }}</span>

            <!-- <progress value="50" max="60"></progress> -->
          </router-link>
        </span>
        <span v-if="props.column.field == 'arrival_date'">{{ props.row.arrival_date.split("T")[0] }} <strong>{{
          props.row.arrival_date.split("T")[1].slice(0, -3) }}</strong></span>
        <span v-if="props.column.field == 'link'" style="font-weight: bold; color: blue;">
          <router-link :to="{ name: 'TheTrip', params: { tripId: props.row.id } }">
            Edit
          </router-link>
        </span>
      </template>
    </vue-good-table>
  </div>

</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterView } from "vue-router";

import { supabase } from '@/supabase.js'
import { VueGoodTable } from 'vue-good-table-next';
import { storeToRefs } from 'pinia'
import { useTripsStore } from '@/stores/trips'


const tripsStore = useTripsStore()
const { tripsList } = storeToRefs(tripsStore)
const { getAllTrips } = tripsStore

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

let rows = tripsList || ref([]);

onMounted(() => {
  console.log(" onMounted ");
  getAllTrips()
});

watch(() => rows,
  (rows, prevRows) => {
    // rows = tripsList
  }
)


const tripChannel = supabase
  .channel('my_new_channel_for_trip')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'trips' },
    (payload) => {
      console.log(payload);
      const { new: newTrip, old } = payload;



      if (!Object.hasOwn(old, 'id') && Object.hasOwn(newTrip, 'id')) {
        console.log("Add New Trip");
        tripsList.value.push(newTrip);
      }
      if (Object.hasOwn(old, 'id') && !Object.hasOwn(newTrip, 'id')) {
        console.log("Delete Trip");

        tripsList.value = tripsList.value.filter(trip => trip.id !== old.id)
      }


      tripsList.value = tripsList.value.map(trip => {
        if (trip.id === newTrip.id) {
          return { ...trip, ...newTrip }
        }
        return trip
      })
    }
  )
  .subscribe()



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