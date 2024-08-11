<template>
    <v-row>
        <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        lg="4"
        md="6"
        >
        <v-skeleton-loader
            loading
            height="240"
            type="image, list-item-two-line, table, date-picker"
        >
            <v-responsive>
                <v-img
                    class="rounded-lg mb-2"
                    height="184"
                    cover
                ></v-img>

                <v-list-item
                    class="px-0"
                ></v-list-item>
            </v-responsive>
        </v-skeleton-loader>
        </v-col>
    </v-row>
</template>