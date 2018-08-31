var modelApp = function() {
    new Vue({
        el: "#jModelApp",
        data: {
            msg: "Hello World"
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                this.setMsg();
            });
        },
        methods: {
            setMsg: function() {
                this.msg = "Welcome to join us!";
            },
            changeMsg: function() {
                this.msg = "^_^";
            }

        }
    });
}

module.exports = modelApp;