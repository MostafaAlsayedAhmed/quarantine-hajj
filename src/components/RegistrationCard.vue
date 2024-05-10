<template>
    <div class="theform-page">
        <div class="container mt-5">
            {{ $route.params }}
            isNewRecord: {{ isNewRecord }}
            <form @submit.prevent="submitForm">

                <fieldset v-if="0" class="inputs-group p-3 p-md-4 mb-4 bg-primary-subtle rounded">
                    <div class="row row-cols-md-2 row-cols-lg-4 ">
                        <div class="mb-4">
                            <label for="tripNumber" class="form-label">Trip Number:</label>
                            <input type="text" class="form-control" id="tripNumber" v-model="form.tripNumber" disabled>
                        </div>
                        <div class="mb-4">
                            <label for="portOfArrival" class="form-label">Port of Arrival:</label>
                            <select class="form-select" id="portOfArrival" v-model="form.portOfArrival" disabled>
                                <option selected>Choose...</option>
                                <option value="Hurghada"> Hurghada </option>
                                <!-- Add options here -->
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="dateArrival" class="form-label">Date of Arrival:</label>
                            <input type="date" class="form-control" id="dateArrival" v-model="form.dateArrival"
                                disabled>
                        </div>
                        <div class="mb-4">
                            <label for="transportAgency" class="form-label">Transport Agency:</label>
                            <input type="text" class="form-control" id="transportAgency" v-model="form.transportAgency"
                                disabled>
                        </div>
                    </div>
                </fieldset>

                <ul v-else class="row list list-inline p-3 p-md-4 mb-4 bg-primary-subtle rounded">
                    <li class="col"> <strong>Trip Number:</strong> {{ form.tripNumber }}</li>
                    <li class="col"> <strong>Port of Arrival:</strong> {{ form.portOfArrival }}</li>
                    <li class="col"> <strong>Date of Arrival:</strong> {{ form.dateArrival }}</li>
                    <li class="col"> <strong>Transport Agency:</strong> {{ form.transportAgency }}</li>
                </ul>

                <fieldset class="inputs-group p-3 p-md-5 my-4 border-danger border   rounded">
                    <div class="row ">

                        <div class=" mb-4 col-md-2 col-lg-4 ">
                            <label for="fullName" class="form-label">Full Name:</label>
                            <input type="text" class="form-control" id="fullName" v-model="form.fullName" required>
                        </div>


                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="passportNumber" class="form-label">Passport Number:</label>
                            <input type="text" class="form-control" id="passportNumber" v-model="form.passportNumber">
                        </div>
                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="seatNo" class="form-label">Seat No.:</label>
                            <input type="text" class="form-control" id="seatNo" v-model="form.seatNo">
                        </div>
                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="phone" class="form-label">Phone Number in Egypt:</label>
                            <input type="text" class="form-control" id="phone" v-model="form.phone" required>
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="nationality" class="form-label">Nationality:</label>
                            <select class="form-select" id="nationality" v-model="form.nationality">
                                <option selected>Choose...</option>
                                <option value="egyption"> Egyption </option>
                                <!-- Add options here -->
                            </select>
                        </div>


                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="occupation" class="form-label">Occupation or Job:</label>
                            <input type="text" class="form-control" id="occupation" v-model="form.occupation">
                        </div>


                        <div class="form-group mb-4 col-md-2 col-lg-4">
                            <label class="form-label">Date of Birth:</label>
                            <div class="date-fields d-flex justify-content-between">
                                <select class="form-select" id="dobDay" name="dobDay" v-model="form.dobDay" required>
                                    <option selected value="0"> Day ...</option>
                                    <option v-for="day in 31" :value="day" :key="day">{{ day }}</option>
                                </select>
                                <select class="form-select" id="dobMonth" name="dobMonth" v-model="form.dobMonth"
                                    required>
                                    <option selected value="0"> Month ...</option>
                                    <option v-for="month in 12" :value="month" :key="month">{{ month }}</option>
                                </select>
                                <select class="form-select" id="dobYear" name="dobYear" v-model="form.dobYear" required>
                                    <option selected value="0"> Year ...</option>
                                    <option v-for="year in 100" :value="2025 - year" :key="year">{{ 2025 - year }}
                                    </option>
                                </select>
                                <!-- <input class="form-control" type="number" min="1920" :max="2024" placeholder="Year"
                                    id="dobYear" name="dobYear" v-model="form.dobYear"> -->
                            </div>
                        </div>
                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="email" v-model="form.email">
                        </div>




                        <div class=" my-3 col-12">
                            <h3 class="form-label mt-3">Detailed Address in Egypt:</h3>
                        </div>


                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="governorate" class="form-label">Governorate: {{ form.governorate }} </label>
                            <select class="form-select" id="governorate" v-model="form.governorate" required>
                                <option selected value="">Choose... </option>
                                <option v-for="(_, governorate) in countries_list" :key="governorate"
                                    :value="governorate"> {{ governorate }}
                                </option>
                            </select>
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="region" class="form-label">Region/Department: {{ form.region }} </label>
                            <select class="form-select" id="region" v-model="form.region">
                                <option selected value="">Choose...</option>
                                <option v-for="(cities, cityIndex ) in countries_list[form.governorate]"
                                    :key="cityIndex" :value="cityIndex">
                                    {{ cities }} </option>
                            </select>
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="address" class="form-label">Address:</label>
                            <input type="text" class="form-control" id="address" v-model="form.address" required>
                        </div>
                    </div>
                    <hr class="border" />
                    <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" id="fieldsetCheck">
                        <label class="form-check-label" for="fieldsetCheck">
                            {{ confirmationText }}
                        </label>
                    </div>
                    <div class="inputs-group p-4 my-4 bg-danger-subtle rounded">
                        <p class="mb-0"> <strong>Note:</strong> {{ note }}</p>
                    </div>
                </fieldset>


                <div class="mb-4 text-center">
                    <template v-if="isNewRecord">
                        <button type="reset" class="btn btn-outline-warning mx-2">reset</button>
                        <button type="submit" class="btn btn-success btn-lg my-2 px-5 mx-2">Create</button>
                    </template>

                    <button v-else type="submit" class="btn btn-primary btn-lg px-5 mx-2">Update</button>
                    <button type="button" class="btn btn-danger btn-lg px-5 my-2 mx-2" @click="deleteTrip">Delete</button>
                </div>
            </form>




        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useFormDataStore } from '@/stores/formData'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute();

const isNewRecord = route.params.recordId === "NewRecord"
console.log(route.params);
const formDataStore = useFormDataStore();
const { _, countries_list } = formDataStore
const { form, getCountry2 } = storeToRefs(formDataStore);




const confirmationText = "I hereby confirm that I have read and understood the above Questions and have answered them truthfully."
const note = "If you suffer from any symptoms or change your address Call (105)."

function submitForm() {
    console.log(form); // Replace this with actual submission logic
}
</script>