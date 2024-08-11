<template>
    <v-container>
        <v-row>
            <div class="col-4 my-5">
                <summary-card
                    icon="mdi-book-account"
                    number="7"
                    title="Number of diaries last week"
                ></summary-card>
            </div>
            <div class="col-4 my-5">
                <summary-card
                    icon="mdi-cash-multiple"
                    number="100"
                    title="Total expenses last week"
                ></summary-card>
            </div>
            <div class="col-4 my-5">
                <summary-card
                    icon="mdi-timer-sand"
                    number="14"
                    title="Number of free hours last week"
                ></summary-card>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    import SummaryCard from '@/components/dashboard/SummaryCard.vue'

    export default {
        components: {
            SummaryCard
        },
        data() {
            return {
            }
        }
    }
</script>