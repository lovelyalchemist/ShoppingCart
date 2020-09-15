window.addEventListener('load', () => {

    window.vue = new Vue({
        el: '#app',
        name: 'Productionlist',
        data: {
            isLoading: true,
            productionlist: [],
            saved: [],
            smilary: [],
            qty: 1,
            // checked: 'Hediye Paketi Olsun',
            //checkedGiftpackage: []
        },
        methods: {
            //bu sepetten ürün çıkarmak için
            removeFromProductionlist(index) {
                this.productionlist.splice(index, 1);
            },
            // Daha sonra alınacaklara atmak için
            saveForLater(index) {
                const item = this.productionlist.splice(index, 1);
                this.saved.push(item[0]);
            },
            // Daha Sonra Alınacaktan silmek için
            removeFromSavedList(index) {
                this.saved.splice(index);
            },

            //sonradan alınacaklar listesinden sepete...
            moveToProductionlist(index) {
                const item = this.saved.splice(index, 1);
                this.productionlist.push(item[0]);
            },

            //Bnzer ürünlerden silme
            removeFromSmilaryList(index) {
                this.smilary.splice(index);
            },

            //Benzerden Sepete
            moveToProductionlistfromSmilary(index) {
                const item = this.smilary.splice(index, 1);
                this.productionlist.push(item[0]);
            },

            //arttırma eksiltme basit

            decrease(i) {
                i.quantity--;1;
            },
            increase(i) {
                i.quantity++;
                1;
            }

        },
        computed: {
            productionlistTotal() {
                let total = 0;
                this.productionlist.forEach((item) => {
                    total += parseFloat(item.price * item.quantity, 10);
                });
                return total.toFixed(2);
            },
        },
        created() {
            fetch('./data.json')
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    this.isLoading = false;
                    this.productionlist = res.productionlist;
                    this.saved = res.saved;
                    this.smilary = res.smilary;
                })
        },

    })
});