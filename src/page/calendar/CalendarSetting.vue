<template>
    <section>
        <base-card>
            <v-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-center" width="50%"><b>Name</b></th>
                        <th class="text-center" width="30%"><b>Color</b></th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in formatedEventTypes" :key="item.id">
                        <td class="text-center" v-if="item.isEditting">
                            <v-text-field
                                v-model="editTypeName"
                            ></v-text-field>
                        </td>
                        <td class="text-center" v-else>{{ item.name }}</td>
                        <td class="text-center" v-if="item.isEditting">
                            <input 
                                type="color" 
                                v-model="editTypeColor" 
                            />
                        </td>
                        <td class="text-center" :style="{backgroundColor: item.color}" v-else></td>
                        <td class="text-center" v-if="item.isEditting">
                            <v-icon @click="updateType">
                                mdi-check
                            </v-icon>
                            <v-icon class="ml-2" @click="closeEditType">
                                mdi-close
                            </v-icon>
                        </td>
                        <td class="text-center" v-else>
                            <v-icon @click="editType(item)">
                                mdi-pencil
                            </v-icon>
                        </td>
                    </tr>
                    <tr v-if="isAdding">
                        <td class="text-center">
                            <v-text-field
                                v-model="newTypeName"
                            ></v-text-field>
                        </td>
                        <td class="text-center">
                            <input 
                                type="color" 
                                v-model="newTypeColor" 
                            />
                        </td>
                        <td class="text-center">
                            <v-icon @click="createNewType">
                                mdi-check
                            </v-icon>
                            <v-icon class="ml-2" @click="closeNewTypeForm">
                                mdi-close
                            </v-icon>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center">
                            <v-icon 
                            class="newTypeIcon"
                            @click="openNewTypeForm"
                            >
                                mdi-plus
                            </v-icon>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                </tbody>
            </v-table>
        </base-card>
    </section>
</template>

<script>
export default {
    data: () => ({
        isAdding: false,
        newTypeName: "",
        newTypeColor: "",
        edditingId: null,
        editTypeName: "",
        editTypeColor: "",
    }),
    mounted() {
        this.$store.dispatch('calendar/fetchEventTypes');
    },
    computed: {
        eventTypes() {
            return this.$store.getters['calendar/getEventTypes'];
        },
        formatedEventTypes() {
            return this.eventTypes.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    color: item.color,
                    isEditting: item.id === this.edditingId,
                }
            });
        }
    },
    methods: {
        openNewTypeForm() {
            this.isAdding = true;
            console.log(this.eventTypes);
        },
        closeNewTypeForm() {
            this.isAdding = false;
            this.newTypeColor = "";
            this.newTypeName = "";
        },
        editType(item) {
            this.edditingId = item.id;
            this.editTypeName = item.name;
            this.editTypeColor = item.color;
        },
        closeEditType() {
            this.edditingId = null;
            this.editTypeName = "";
            this.editTypeColor = "";
        },
        async updateType() {
            let data = new FormData();
            data.append('id', this.edditingId);
            data.append('name', this.editTypeName.trim());
            data.append('color', this.editTypeColor);
            try {
                await this.$store.dispatch('calendar/updateEventType', data);
            } catch (error) {
                console.log(error);
            }
            this.closeEditType();
        },
        async createNewType() {
            let data = new FormData();
            data.append('name', this.newTypeName.trim());
            data.append('color', this.newTypeColor);
            try {
                await this.$store.dispatch('calendar/addEventType', data);
            } catch (error) {
                console.log(error);
            }
            this.closeNewTypeForm();
        },
    },
};
</script>

<style scoped>
    .newTypeIcon {
        cursor: pointer;
    }
</style>