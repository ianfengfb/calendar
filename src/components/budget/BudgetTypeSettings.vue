<template>
    <v-expansion-panels>
        <v-expansion-panel
            title="Budget Types"
            class="mb-10"
        >
            <v-expansion-panel-text>
                <v-treeview
                    v-model="tree"
                    :items="items"
                    item-key="name"
                    density="compact"
                >
                    <template v-slot:prepend="{ item, open }">
                        <v-icon>
                            {{ item.mdi ? item.mdi : 'mdi-help-circle-outline' }}
                        </v-icon>
                    </template>
                </v-treeview>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
  export default {
    data: () => ({
      tree: [],
      items: [
        {
          title: 'Tansport',
          mdi: 'mdi-car',
            children: [
                {
                title: 'Car',
                mdi: null,
                },
                {
                title: 'Bus',
                mdi: 'mdi-bus',
                },
                {
                title: 'Train',
                mdi: 'mdi-train',
                },
            ],
        },
        {
            title: 'Food',
            mdi: null,
                children: [
                    {
                    title: 'Groceries',
                    mdi: 'mdi-cart',
                    },
                    {
                    title: 'Restaurants',
                    mdi: 'mdi-silverware',
                    },
                ],
            },
            {
            title: 'Utilities',
            mdi: 'mdi-flash',
                children: [
                    {
                    title: 'Electricity',
                    mdi: 'mdi-flash',
                    },
                    {
                    title: 'Water',
                    mdi: 'mdi-water',
                    },
                    {
                    title: 'Gas',
                    mdi: 'mdi-gas-cylinder',
                    },
                ],
        }
      ],
    }),
    mounted() {
        this.$store.dispatch('budgets/fetchBudgetTypes', 'settings');
    },
    computed: {
        fechedTypes() {
            const tempTypes = this.$store.getters['budgets/getBudgetTypes'];
            console.log(tempTypes);
            return 'aaa';
        }
    },
  }
</script>