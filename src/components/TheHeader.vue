<template>
    <header>
        <nav>
            <ul>
                <li>
                    <v-btn
                    color="#e9e9e9"
                    dark
                    v-bind="props"
                    >
                        <router-link :to="dashboard.path">{{ dashboard.title }}</router-link>
                    </v-btn>
                </li>
                <li>
                    <v-menu location="bottom" open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn
                            color="#e9e9e9"
                            dark
                            v-bind="props"
                            >
                                Diary
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="diary in diaries"
                            :key="diary"
                            >
                                <router-link :to="diary.path">{{ diary.title }}</router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </li>
                <li>
                    <v-menu location="bottom" open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn
                            color="#e9e9e9"
                            dark
                            v-bind="props"
                            >
                                Expense
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="budget in budgets"
                            :key="budget"
                            >
                                <router-link :to="budget.path">{{ budget.title }}</router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                dashboard: {
                    title: 'Dashboard',
                    path: '/dashboard'
                },
                diaries: [
                    { title: 'New Diary', path: '/diaries/new'},
                    { title: 'Diaries', path: '/diaries'},
                ],
                budgets: [
                    { title: 'New Expense', path: '/budgets/new'},
                    { title: 'Budgets Settings', path: '/budgets/settings'},
                ]
            }
        }
    }
</script>

<style scoped>
    header {
        background-color: #e9e9e9;
        color: white;
        padding: 20px;
        text-align: center;
        flex: 0 0 auto;
    }

    header a {
    text-decoration: none;
    color: #404040;
    display: inline-block;
    }

    /* a:active,
    a:hover,
    a.router-link-active {
    border: 1px solid #03a9f4;
    } */

    h1 {
    margin: 0;
    }

    h1 a {
    color: white;
    margin: 0;
    }

    h1 a:hover,
    h1 a:active,
    h1 a.router-link-active {
    border-color: transparent;
    }

    header nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    }

    li {
    margin: 0 0.5rem;
    }
</style>