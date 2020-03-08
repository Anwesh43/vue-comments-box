const w = window.innerWidth, h = window.innerHeight, sizeFactor = 4, textFactor = 20
const scGap = 0.05

Vue.component('comment', {
    props : ['text', 'i', 'scale'],
    computed : {
        objStyle() {
          console.log(this.scale)
          const style = {
              width : `${(Math.min(w, h) * this.scale) / sizeFactor}px`,
              height : `${(Math.min(w, h) * this.scale) / sizeFactor}px`,
              background : '#3F51B5',
              WebkitTransform : `rotate(${360 * this.scale}deg)`,
              color : 'white',
              fontSize : `${Math.min(w, h) / textFactor}px`,
              textAlign : 'center',
              float : 'top',
              margin : `${Math.min(w, h) / textFactor}px`
          }
          return style
        }
    },
    template : '<div :style = "objStyle">{{text}}</div>'
})

class Animator {

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 30)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

class State {

    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale += this.dir * scGap
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

const app = new Vue({
    el : '#app',
    data : {
        currText : '',
        comments : [],
        btnDisabled: false,
        animator : new Animator(),
        currScale : 0
    },
    methods : {
        add() {
            const text = this.currText
            const i = this.comments.length
            const comment = {text, i, scale : 0}
            this.comments.push(comment)
            this.btnDisabled = true
            const state = new State()
            state.startUpdating(() => {
                this.animator.start(() => {
                  //console.log(state.scale)
                    this.currScale = state.scale
                    this.comments[i].scale = this.currScale
                    state.update(() => {
                        this.animator.stop()
                        this.currText = ''
                        this.btnDisabled = false
                        this.comments[i].scale = state.scale
                    })
                })
            })
        },
        setScale(i) {
            if (i == this.comments.length - 1) {
                console.log(this.currScale)


            }
        }
    },
    computed : {
        disabled() {
            return this.currText.trim() === ""
        }
    }
})
