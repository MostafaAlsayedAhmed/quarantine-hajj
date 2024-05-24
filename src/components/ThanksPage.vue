<template>
    <div class="thanks-page">
        <div class="container">
            <div>

                <!-- This element will be visible in normal view but hidden in print view -->
                <section v-show="isPrintView">
                    <div class="text-center">
                        <div class="header my-4">
                            <h1>Thank You for Registering!</h1>
                        </div>
                        <div class="content">
                            <p>Dear <strong>{{ userName }}</strong>,
                                Your registration ID is <strong>{{ registrationId }}</strong>
                                <br>
                                Thank you for completing your registration. We have received your details successfully.
                            </p>
                            <div class="important">
                                <p>
                                    Important: <br> Please save this page and download the PDF document below. You will
                                    need
                                    to
                                    present this
                                    information to the Quarantine authority upon arrival.
                                </p>
                            </div>
                        </div>
                        <div>
                            <small>{{ theNewPassengerId }}</small>
                            <button class="btn btn-success btn-lg px-5 mx-2">Add a New Card</button>
                            <a href="javascript:if(window.print)window.print();"
                                class="btn btn-danger btn-lg px-5 my-2 mx-2">Download
                                Card </a>
                        </div>
                    </div>
                </section>

                <!-- This element will be visible in print view but hidden in normal view -->
                <section v-show="!isPrintView">
                    <div class="text-start">
                        <div class="content text-center">
                            <h3>المتابعة الصحية للركاب القادمين من موسم الحج 2024</h3>
                            <p>
                                Thank you for completing your registration. We have received your details successfully,
                                Your registration ID is <strong class="text-danger">{{ registrationId }}</strong>
                            </p>
                        </div>
                        <div class="container container2 mt-2  border-danger">
                            <div class="row">
                                <div class="col">
                                    <h4>Trip Information</h4>
                                    <hr>
                                    <div class="row row-cols-2 text-start ">
                                        <p><strong>Trip Number:</strong> {{ trip.trip_number }}</p>
                                        <p><strong>Arrival Port:</strong> {{ trip.arrival_port }}</p>
                                        <p><strong>Arrival Date:</strong> {{ trip.arrival_date }}</p>
                                        <p><strong>Agency:</strong> {{ trip.transport_agency }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <h4 class="mt-4">Passenger Information</h4>
                                    <hr>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>{{ info.full_name }}</td>
                                            </tr>
                                            <tr>
                                                <td>Passport Number</td>
                                                <td>{{ info.passport_number }}</td>
                                            </tr>
                                            <tr>
                                                <td>Seat Number</td>
                                                <td>{{ info.seat_number }}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{{ info.phone_number }}</td>
                                            </tr>
                                            <tr>
                                                <td>Nationality</td>
                                                <td>{{ info.nationality }}</td>
                                            </tr>
                                            <tr>
                                                <td>Governorate</td>
                                                <td>{{ info.governorate }}</td>
                                            </tr>
                                            <tr>
                                                <td>Region</td>
                                                <td>{{ info.region }}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{{ info.address }}</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Birth</td>
                                                <td>{{ info.dobDay }}</td>
                                            </tr>
                                            <tr>
                                                <td>Confirmed</td>
                                                <td>{{ info.confirmation ? 'Yes' : 'No' }}</td>
                                            </tr>
                                            <tr>
                                                <td>Created At</td>
                                                <td>{{ info.created_at }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>




            <div class="footer">
                <p>Safe travels and we look forward to seeing you soon!</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThanksPage',
    props: {
        info: {
            required: true
        },
        trip: {
            required: true
        },
        registrationId: {
            type: String,
            required: true
        },
    }
}
</script>



<script setup>
import { ref, computed, onMounted } from 'vue';


const isPrintView = ref(false);

// Detect when the page is being printed
onMounted(() => {
    window.addEventListener('beforeprint', () => {
        isPrintView.value = true;
    });

    window.addEventListener('afterprint', () => {
        isPrintView.value = false;
    });
});


</script>



<style scoped>
.container {
    max-width: 900px;
    margin: 50px auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.header h1 {
    margin: 0;
    color: #333;
}

.content {
    margin-bottom: 20px;
}

.content p {
    color: #555;
}

.important {
    background: #ffeb3b;
    padding: 15px;
    border: 1px solid #ffeb3b;
    border-radius: 5px;
    margin-bottom: 20px;
    max-width: 700px;
    margin: auto;
}

.important p {
    margin: 0;
    color: #d32f2f;
    font-weight: bold;
}

.footer {
    text-align: center;
    margin-top: 20px;
    color: #777;
}

.footer p {
    margin: 0;
}
</style>

<style lang="scss">
@media print {

    .thanks-page {

        .container {
            max-width: 90%;
            margin: 20px auto;
        }

        .container2 {
            padding: 10px;
            box-shadow: none;
        }
    }

    header {
        .container {
            all: unset;
        }

        .d-flex {

            padding-top: 0rem !important;
            flex-direction: row !important;
        }

        .logo {
            transform: scale(1) !important;
            ;
        }
    }

    .theform-page,
    .record-header,
    footer.d-flex {
        display: none !important;
        opacity: 0;
    }
}
</style>