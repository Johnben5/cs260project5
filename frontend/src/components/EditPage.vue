<template>
    <div class="ContentView">
        <Login v-if="!user" />
        <div v-else>
            <h3>Logged in as {{user.name}}</h3>
            <button @click="logout">Logout</button>
            <h3>Edit Profile</h3>
            <form @submit.prevent="changeProfile">
                <input type="text" v-model="name" placeholder="Name">
                <div></div>
                <input type="text" v-model="phone" placeholder="Phone Number">
                <div></div>
                <input type="text" v-model="state" placeholder="State">
                <div></div>
                <input type="text" v-model="city" placeholder="City">
                <div></div>
                <button type="submit">Submit Edit</button>
            </form>

            <h3>Delete Profile</h3>
            <button @click="deleteProfile">Delete</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
export default {
    name: 'EditPage',
    data() {
        return {
            name: "",
            phone: "",
            state: "",
            city: "",
        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
    created() {
        this.initiateEdit();
    },
    methods: {
        async deleteProfile() {
            try {
                await axios.delete("/api/users/" + this.user._id);
                this.$root.$data.user = null;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        initiateEdit() {
            this.name = this.user.name;
            this.phone = this.user.phone;
            this.state = this.user.state;
            this.city = this.user.city;
        },
        async changeProfile() {
            try {
                await axios.put("/api/users/" + this.user._id, {
                    name: this.name,
                    phone: this.phone,
                    state: this.state,
                    city: this.city,
                });
                window.location.reload();
                this.initiateEdit();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async logout() {
            try {
                await axios.delete("/api/users");
                this.$root.$data.user = null;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
    }
}</script>

<style>
    .editOptions {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid white;
        padding: 10px;
    }

        .editOptions p {
            font-size: 1.2em;
            font-weight: bold;
            margin: 3px;
        }
</style>