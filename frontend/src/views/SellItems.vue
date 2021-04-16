<template>
    <div class="ContentView">
        <Login v-if="!user" />
        <SellPage v-else />
    </div>
</template>

<script>
    import axios from 'axios';
    import Login from '@/components/Login.vue'
    import SellPage from '@/components/SellPage.vue'
    export default {
        name: 'SellItems',
        components: {
            Login,
            SellPage,
        },
        computed: {
            user() {
                return this.$root.$data.user;
            }
        },
        async created() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
    }</script>