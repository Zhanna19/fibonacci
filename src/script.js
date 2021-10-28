const HOST = 'http://localhost';
const PORT = 1337;
const app = new Vue({
    el: '#app',
    data: {
        number: 0,
        result: 0,
    },
    methods: {
        getNumber() {
            axios.get(`${HOST}:${PORT}/getNearestFibonacciNumber/${this.number}`,{})
                .then((res) => {
                    this.result = res.data.number;
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
})