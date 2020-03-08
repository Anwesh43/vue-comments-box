const w = window.innerWidth, h = window.innerHeight, sizeFactor = 10, textFactor = 20

Vue.component('CommentBox', {
    props : ['scale', 'text'],
    data() {
        const objStyle = {
            width : `${(Math.min(w, h) * this.scale) / sizeFactor}px`,
            height : `${(Math.min(w, h) * this.scale) / sizeFactor}px`,
            background : '#3F51B5',
            WebkitTransform : `rotate(${360 * this.scale}deg)`,
            color : 'white',
            fontSize : `${Math.min(w, h) / textFactor}`,
            textAlign : 'center'
        }
    },
    template : '<div :style = "objStyle">{{text}}</div>'
})

class Animator {

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

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
