<template>
  <div class="container my-5">

    <div class="d-flex justify-content-between mb-3">
      <div>
        <h2> Records of the Trip #333 </h2>
      </div>
      <div> <router-link :to="{ path: '/schedule/AddNewTrip/', params: { isNew: true } }" type="button"
          class="btn btn-success">Add New Record</router-link>
      </div>
    </div>

    <vue-good-table :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true" :styleClass="tableStyle"
      :search-options="{
        enabled: true
      }">

      <template #table-row="props">
        <span v-if="props.column.field == 'link'" style="font-weight: bold; color: blue;"> 
          <router-link :to="{ name: 'registration', params: { id: props.row.id }  }"> Edit  </router-link>
        </span>

      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';

export default {
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        { label: 'Full Name', field: 'fullName' },
        { label: 'Passport Number', field: 'passportNumber' },

        { label: 'Seat No', field: 'seatNo' },
        { label: 'Phone Number', field: 'phoneNumber' },

        { label: 'Governorate', field: 'governorate' },
        { label: 'Region', field: 'region' },
        { label: 'Address', field: 'address' },
        { label: '-', field: 'link', html: true },
      ],
      rows: [
        {
          "id": 5,
          "fullName": "John Doe",
          "passportNumber": "Summer Excursion",
          "seatNo": 150,
          "phoneNumber": "002 01022099686",
          "governorate": "John Doe",
          "region": "USA",
          "address": "XA123",
          "link": '',
        },
        {
          "id": 1,
          "fullName": "Alice Johnson",
          "passportNumber": "Winter Retreat",
          "seatNo": 145,
          "phoneNumber": "002 01022199699",
          "governorate": "Alice Johnson",
          "region": "Canada",
          "address": "WR543",
          "link": '',
        },
        {
          "id": 55,
          "fullName": "Bob Smith",
          "passportNumber": "Spring Break",
          "seatNo": 120,
          "phoneNumber": "002 01022299677",
          "governorate": "Bob Smith",
          "region": "UK",
          "address": "SB234",
          "link": '',
        },
        {
          "id": 85,
          "fullName": "Clara Blue",
          "passportNumber": "Autumn Festival",
          "seatNo": 165,
          "phoneNumber": "002 01022399666",
          "governorate": "Clara Blue",
          "region": "Germany",
          "address": "AF321",
          "link": '',
        },
        {
          "id": 75,
          "fullName": "David Wright",
          "passportNumber": "Island Hopping",
          "seatNo": 134,
          "phoneNumber": "002 01022499655",
          "governorate": "David Wright",
          "region": "Greece",
          "address": "IH567",
          "link": '',
        },
        {
          "id": 57,
          "fullName": "Ella Fitzgerald",
          "passportNumber": "Cultural Tour",
          "seatNo": 155,
          "phoneNumber": "002 01022599644",
          "governorate": "Ella Fitzgerald",
          "region": "France",
          "address": "CT456",
          "link": '',
        },
        {
          "id": 50,
          "fullName": "Frank Moore",
          "passportNumber": "Beach Vacation",
          "seatNo": 142,
          "phoneNumber": "002 01022699633",
          "governorate": "Frank Moore",
          "region": "Italy",
          "address": "BV789",
          "link": '',
        }
      ],
      tableStyle: 'vgt-table striped bordered'
    };
  }
};
</script>
