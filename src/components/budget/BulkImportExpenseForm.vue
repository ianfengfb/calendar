<template>
    <h2>Bulk import expenses</h2>
    <p class="hint">
        Upload a JSON file containing an array of expense entries. Each entry needs
        <code>date</code> (YYYY-MM-DD), <code>budget_type_id</code> and <code>amount</code>,
        plus an optional <code>note</code>. If any entry is invalid, nothing will be saved.
    </p>
    <v-file-input
        label="Expense JSON file"
        accept="application/json,.json"
        v-model="file"
        class="mt-5"
        @update:modelValue="fileChange"
    ></v-file-input>
    <p class="text-err" v-if="!isFileValid">Please choose a JSON file</p>
    <v-btn
        rounded="lg"
        size="x-large"
        block
        color="#e9e9e9"
        class="mt-3"
        :disabled="submitting"
        @click="importExpenses"
    >{{ btnText }}</v-btn>

    <div class="import-errors mt-5" v-if="entryErrors.length > 0">
        <p class="text-err">
            {{ entryErrors.length }} invalid {{ entryErrors.length === 1 ? 'entry' : 'entries' }} found. No expenses were saved.
        </p>
        <v-table density="compact">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Entry</th>
                    <th>Errors</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="err in entryErrors" :key="err.index">
                    <td>{{ err.index + 1 }}</td>
                    <td><code>{{ JSON.stringify(err.entry) }}</code></td>
                    <td>
                        <div v-for="(msg, i) in err.errors" :key="i">{{ msg }}</div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>

    <div class="import-success mt-5" v-if="importedItems.length > 0">
        <p class="text-success">
            {{ importedItems.length }} {{ importedItems.length === 1 ? 'expense' : 'expenses' }} imported successfully.
        </p>
        <v-table density="compact">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in importedItems" :key="item.id">
                    <td>{{ item.date }}</td>
                    <td>{{ typeName(item.budget_type_id) }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.note || '-' }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                file: null,
                isFileValid: true,
                submitting: false,
                btnText: 'Import',
                entryErrors: [],
                importedItems: [],
            }
        },
        mounted() {
            this.$store.dispatch('budgets/fetchBudgetTypes', 'expense');
        },
        computed: {
            budgetTypesById() {
                const types = this.$store.getters['budgets/getBudgetTypes'];
                return types.reduce((map, type) => {
                    map[type.id] = type.name;
                    return map;
                }, {});
            },
        },
        methods: {
            typeName(budgetTypeId) {
                return this.budgetTypesById[budgetTypeId] || `#${budgetTypeId}`;
            },
            fileChange() {
                if (this.file) {
                    this.isFileValid = true;
                }
                this.entryErrors = [];
                this.importedItems = [];
            },
            async importExpenses() {
                if (!this.file || (Array.isArray(this.file) && this.file.length === 0)) {
                    this.isFileValid = false;
                    return;
                }
                this.entryErrors = [];
                this.importedItems = [];
                const data = new FormData();
                data.append('file', Array.isArray(this.file) ? this.file[0] : this.file);
                this.submitting = true;
                this.btnText = 'Importing...';
                try {
                    const result = await this.$store.dispatch('budgets/bulkImportExpenses', data);
                    this.importedItems = result?.data || [];
                    this.file = null;
                } catch (error) {
                    this.entryErrors = error?.data?.errors || [];
                }
                this.submitting = false;
                this.btnText = 'Import';
            },
        },
    }
</script>

<style scoped>
    .hint {
        color: #666;
        font-size: 14px;
        margin-top: 0.5rem;
    }
    .text-err {
        color: rgb(176, 0, 32);
        font-size: 12px;
        padding: 6px 0 0 12px;
    }
    .text-success {
        color: rgb(15, 118, 45);
        font-size: 12px;
        padding: 6px 0 0 12px;
    }
    .import-errors code {
        white-space: pre-wrap;
        word-break: break-word;
    }
</style>
