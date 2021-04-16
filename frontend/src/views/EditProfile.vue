<template>
    <div class="ContentView">
        <Login v-if="!user" />
        <EditPage v-else/>
    </div>
</template>

<script>
    import axios from 'axios';
    import Login from '@/components/Login.vue'
    import EditPage from '@/components/EditPage.vue'
export default {
    name: 'EditProfile',
    components: {
        Login,
        EditPage,
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