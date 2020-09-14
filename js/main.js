window.addEventListener('load', () => {

    window.vue = new Vue({
        el: '#app',
        name: 'Productionlist',
        data: {
            isLoading: true,
            productionlist: [],
            saved: [],
            smilary:[],
            counter:1,
           // checked: 'Hediye Paketi Olsun',
            //checkedGiftpackage: []
        },
        methods: {
            removeFromProductionlist(index) {
                this.productionlist.splice(index, 1);
            },
            saveForLater(index) {
                const item = this.productionlist.splice(index, 1);
                this.saved.push(item[0]);
            },
            removeFromSavedList(index) {
                this.saved.splice(index);
            },
            moveToProductionlist(index) {
                const item = this.saved.splice(index, 1);
                this.productionlist.push(item[0]);
            },
            increase: function() {
                this.counter++;
            },
            decrease: function() {
                this.counter--;
            },
            removeFromSmilaryList(index) {
                this.smilary.splice(index);
            },
            moveToProductionlistfromSmilary(index) {
                const item = this.smilary.splice(index, 1);
                this.productionlist.push(item[0]);
            },
        },
        computed: {
            productionlistTotal() {
                let total = 0;
                this.productionlist.forEach((item) => {
                    total += parseFloat(item.price, 10);
                });
                return total.toFixed(2);
            }
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