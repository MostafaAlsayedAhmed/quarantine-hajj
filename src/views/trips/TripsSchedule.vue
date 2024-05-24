<template>
  <div class="container my-5">

    <div class="d-flex justify-content-between mb-3">
      <!-- <button @click="$refs.show != $refs.show">Rows</button> -->
      <!-- <pre ref="show" class="bg-success">  {{ rows }}</pre> -->
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
        <span v-if="props.column.field == 'trip_name'">
          <!-- <a :href="`/schedule/${props.row.id}/records/NewRecord?${tripInfoLink(props.row)}`" target="_blank"> -->
          <a :href="`/trip/${props.row.id}/registration?${tripInfoLink(props.row)}`" target="_blank">
            {{ props.row.trip_name }}
 
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill=" #0a58ca" viewBox="0 0 24 24"
              width="12" height="12">
              <path
                d="M20,8.5v11c0,2.481-2.019,4.5-4.5,4.5H4.5c-2.481,0-4.5-2.019-4.5-4.5V8.5c0-2.481,2.019-4.5,4.5-4.5H15.5c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5H4.5c-1.93,0-3.5,1.57-3.5,3.5v11c0,1.93,1.57,3.5,3.5,3.5H15.5c1.93,0,3.5-1.57,3.5-3.5V8.5c0-.276,.224-.5,.5-.5s.5,.224,.5,.5ZM21.5,0h-7c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h7c.231,0,.451,.053,.646,.147L8.146,15.146c-.195,.195-.195,.512,0,.707,.098,.098,.226,.146,.354,.146s.256-.049,.354-.146L22.853,1.854c.094,.196,.147,.415,.147,.646v7c0,.276,.224,.5,.5,.5s.5-.224,.5-.5V2.5c0-1.378-1.122-2.5-2.5-2.5Z" />
            </svg>


          </a>
        </span>



        <span v-if="props.column.field == 'records'">

          <router-link style="text-decoration: none" target="_blank" :to="{
          name: 'TripRecords', params: { tripId: props.row.id },
          query: {
            trip_number: props.row.trip_number,
            arrival_port: props.row.arrival_port,
            arrival_date: props.row.arrival_date,
            transport_agency: props.row.transport_agency,
          }
        }">
            <span style="text-decoration: underline;  color: blue;" class="w-100">
              {{ props.row.records }}/{{ props.row.passengers }}</span>
            <strong v-if="props.row.passengers" class="ms-1">
              ({{ Math.trunc(props.row.records / props.row.passengers * 100) || '' }}%)
            </strong> <!---->
          </router-link>
        </span>

        <span v-if="props.column.field == 'arrival_date'">{{ props.row.arrival_date?.split("T")[0] }} <strong>{{
          props.row.arrival_date?.split("T")[1] }}</strong></span>

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
import { ref, onMounted } from 'vue';
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
const rows = tripsList || ref([]);

function tripInfoLink(trip) {
  if (trip) {
    return `trip_number=${trip.trip_number}&arrival_port=${trip.arrival_port}&arrival_date=${trip.arrival_date.split('T')[0]}&transport_agency=${trip.transport_agency}`
  }
}



onMounted(() => {
  getAllTrips()
});
 
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
