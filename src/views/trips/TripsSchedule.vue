<template>
  <div class="container my-5">

    <div class="d-flex justify-content-between mb-3">
      <div>
        <h2>Trips Schedule</h2>
      </div>
      <div>
        <router-link :to="{ name: 'TheTrip', params: { tripId: 'NewTrip', isNew: true } }" type="button"
          class="btn btn-success">Add New Trip</router-link>
      </div>
    </div>

    <vue-good-table :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true" :styleClass="tableStyle">

      <template #table-row="props">

        <span v-if="props.column.field == 'records'">
          <router-link :to="{ name: 'TripRecords', params: { tripId: props.row.id } }">
            <span style="text-decoration: none;  color: blue; " class="w-100" >   {{ props.row.records }}</span>
           
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
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> -->

  <!-- Modal -->
  <!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div> <RouterView /> -->


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