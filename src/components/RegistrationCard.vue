<template>
    <div class="theform-page">
        <div class="container mt-5">
            <!-- <p class="bg-success-subtle ps-4 d-flex">  <br>
            <div> form Data: <br>{{ formData }}</div>  </p> -->

            <form>
                <ul class="row list list-inline p-3 p-md-4 mb-4 bg-primary-subtle rounded">
                    <li class="col"> <strong>Trip Number:</strong> {{ tripDetails.tripNumber }}</li>
                    <li class="col"> <strong> Arrival Port:</strong> {{ tripDetails.portOfArrival }}</li>
                    <li class="col"> <strong> Arrival Date:</strong> {{ tripDetails.dateArrival }}</li>
                    <li class="col"> <strong> Agency:</strong> {{ tripDetails.transportAgency }}</li>
                </ul>

                <fieldset class="inputs-group p-3 p-md-5 my-4 border-danger border   rounded">
                    <div class="row ">

                        <div class="mb-4 col-md-2 col-lg-4 ">
                            <label for="fullName" class="form-label">Full Name:</label>
                            <input type="text" class="form-control" id="fullName" v-model="formData.full_name" required>
                        </div>


                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="passportNumber" class="form-label">Passport Number:</label>
                            <input type="text" class="form-control" id="passportNumber"
                                v-model="formData.passport_number">
                        </div>
                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="seatNo" class="form-label">Seat No.:</label>
                            <input type="text" class="form-control" id="seatNo" v-model="formData.seat_number">
                        </div>
                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="phone" class="form-label">Phone Number in Egypt:</label>
                            <input type="text" class="form-control" id="phone" v-model="formData.phone_number" required>
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="nationality" class="form-label">Nationality:</label>
                            <select class="form-select" id="nationality" v-model="formData.nationality">
                                <option selected>Choose...</option>
                                <option value="egyption"> Egyption </option>
                                <!-- Add options here -->
                            </select>
                        </div>


                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="occupation" class="form-label">Occupation or Job:</label>
                            <input type="text" class="form-control" id="occupation" v-model="formData.occupation">
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="dobDay" class="form-label">Date of Birth:</label>
                            <input type="date" class="form-control" id="dobDay" v-model="formData.dobDay">
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="email" v-model="formData.email">
                        </div>


                        <div class=" my-3 col-12">
                            <h3 class="form-label mt-3">Detailed Address in Egypt:</h3>
                        </div>


                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="governorate" class="form-label">Governorate: {{ formData.governorate }} </label>
                            <select class="form-select" id="governorate" v-model="formData.governorate" required>
                                <option selected value="">Choose... </option>
                                <option v-for="(_, governorate) in countries_list" :key="governorate"
                                    :value="governorate"> {{ governorate }}
                                </option>
                            </select>
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="region" class="form-label">Region/Department: {{ formData.region }} </label>
                            <select class="form-select" id="region" v-model="formData.region">
                                <option selected value="">Choose...</option>
                                <option v-for="(cities, cityIndex ) in countries_list[formData.governorate]"
                                    :key="cityIndex" :value="countries_list[formData.governorate][cityIndex]">
                                    {{ cities }} </option>
                            </select>
                        </div>

                        <div class=" mb-4 col-md-2 col-lg-4">
                            <label for="address" class="form-label">Address:</label>
                            <input type="text" class="form-control" id="address" v-model="formData.address" required>
                        </div>
                    </div>
                    <hr class="border" />
                    <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" id="fieldsetCheck"
                            v-model="formData.confirmation">
                        <label class="form-check-label" for="fieldsetCheck">
                            {{ confirmationText }}
                        </label>
                    </div>
                    <div class="inputs-group p-4 my-4 bg-danger-subtle rounded">
                        <p class="mb-0"> <strong>Note:</strong> {{ note }}</p>
                    </div>
                </fieldset>
                <slot></slot>
            </form>

        </div>
    </div>
</template>

<script setup>
import { useFormDataStore } from '@/stores/formData'
import { useRoute } from "vue-router";

const formDataStore = useFormDataStore();
const { _, countries_list } = formDataStore;

const route = useRoute();

const { formData } = defineProps(['formData'])
console.log(route.query);
const tripDetails = route.query;
const confirmationText = "I hereby confirm that I have read and understood the above Questions and have answered them truthfully."
const note = "If you suffer from any symptoms or change your address Call (105)."


</script>