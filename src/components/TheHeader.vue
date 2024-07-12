<template>
    <header>
        <nav>
            <ul>
                <li>
                    <router-link to="/diary-new">New Diary</router-link>
                </li>
                <li>
                    <router-link to="/diary">Diary</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

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
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
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
    }

    li {
    margin: 0 0.5rem;
    }
</style>