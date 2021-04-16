<template>
    <div class="ContentView">
        <h3>Logged in as {{user.name}}</h3>
        <button @click="logout">Log Out</button>

        <h3>Add an Item to Sell</h3>
        <div class="form">
            <input type="text" v-model="name" placeholder="Item Name">
            <p></p>
            <input type="text" v-model="price" placeholder="Price">
            <p></p>
            <input type="text" v-model="condition" placeholder="Condition">
            <p></p>
            <input type="text" v-model="description" placeholder="Description">
            <p></p>
            <div class="uploadBox">
                <input type="file" name="photo" @change="fileChanged" class="upload">
            </div>
            <p></p>
            <button @click="addItem">Submit Item</button>
        </div>

        <div class="divider"></div>

        <h3>{{user.name}}'s items:</h3>
        <div class="allItems">
            <div v-for="item in items" :key="item.id">
                <div class="userItems">
                    <p>{{item.name}} for ${{item.price}}</p>
                    <img :src="item.path" />
                    <button @click="deleteItem(item)">Delete Item</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'SellPage',
        data() {
            return {
                items: [],
                name: "",
                path: "",
                price: "",
                condition: "",
                description: "",
                file: null,
            }
        },
        created() {
            this.getItems();
        },
        computed: {
            user() {
                return this.$root.$data.user;
            }
        },
        methods: {
            async addItem() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file, this.file.name)
                    let r1 = await axios.post('/api/items/photos', formData);
                    await axios.post(`/api/items/${this.user._id}`, {
                        name: this.name,
                        path: r1.data.path,
                        price: this.price,
                        condition: this.condition,
                        description: this.description,
                    });
                    this.getItems();
                    this.name = "";
                    this.path = "";
                    this.price = "";
                    this.condition = "";
                    this.description = "";
                } catch (error) {
                    console.log(error);
                }
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async getItems() {
                try {
                    const response = await axios.get(`/api/items/${this.user._id}`);
                    this.items = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteItem(item) {
                try {
                    await axios.delete(`/api/items/${this.user._id}/${item._id}`);
                    this.getItems();
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
    .userItems {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 7px;
    }

        .userItems p {
            font-size: 1.2em;
            font-weight: bold;
            margin: 3px;
        }

    .divider {
        margin-top: 10px;
        border-top: 1px solid white;
    }
</style>