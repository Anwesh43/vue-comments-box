const app = new Vue({
    el : '#app',
    data : {
        currText : '',
        comments : [],
        btnDisabled: false
    },
    methods : {
        add() {
            this.comments.push(this.currText)
            this.btnDisabled = true
            setTimeout(() => {
                this.currText = ''
                this.btnDisabled = false
            }, 5000)
        }
    },
    computed : {
        disabled() {
            return this.currText.trim() === ""
        }
    }
})
