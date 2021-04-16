<template>
    <div class="ContentView">
        <h3>Create a Profile</h3>
        <form @submit.prevent="createProfile">
            <input type="text" v-model="name" placeholder="Name">
            <div></div>
            <input type="text" v-model="phone" placeholder="Phone Number">
            <div></div>
            <input type="text" v-model="state" placeholder="State">
            <div></div>
            <input type="text" v-model="city" placeholder="City">
            <div></div>
            <input type="text" v-model="email" placeholder="Email">
            <div></div>
            <input type="text" v-model="password" placeholder="Password">
            <div></div>
            <button type="submit">Submit</button>
        </form>
        <p v-if="error" class="error">{{error}}</p>

        <h3>Login</h3>
        <form @submit.prevent="login">
            <input type="text" v-model="emailLogin" placeholder="Email">
            <div></div>
            <input type="text" v-model="passwordLogin" placeholder="Password">
            <div></div>
            <button type="submit">Submit</button>
        </form>
        <p v-if="errorLogin" class="error">{{errorLogin}}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'EditProfile',
    data() {
        return {
            profiles: [],
            name: "",
            phone: "",
            email: "",
            state: "",
            city: "",
            password: "",
            emailLogin: '',
            passwordLogin: '',
            error: '',
            errorLogin: '',
        }
    },
    methods: {
        async createProfile() {
            this.error = '';
            this.errorLogin = '';
            if (!this.name || !this.phone || !this.state || !this.city || !this.email || !this.password)
                return;
            try {
                let response = await axios.post('/api/users', {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    state: this.state,
                    city: this.city,
                    password: this.password,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.error = error.response.data.message;
                this.$root.$data.user = null;
            }
        },
        async login() {
            this.error = '';
            this.errorLogin = '';
            if (!this.emailLogin || !this.passwordLogin)
                return;
            try {
                let response = await axios.post('/api/users/login', {
                    email: this.emailLogin,
                    password: this.passwordLogin,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        }
    }
}</script>