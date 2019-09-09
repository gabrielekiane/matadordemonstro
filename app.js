new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 | this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial){
            // min de 7 e máx de 12 e o especial está falso para ferir o player
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            // o playerLife e o monsterLife são os atributos q quero atender
            }
        }, 
        hurt(atr, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
           // a vida do player nunca será negativa, o valor minimo é 0
            this[atr] = Math.max(this.playerLife - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            // false pq o player n pode ser ferido com ataque especial
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        // valores aleatórios pq os ataques diminuem valores randomicos
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        // cls = classe
        // unshift = smp fica em cima o log mais recente
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        // monitorar a variavel hasResult()
        hasResult(value) {
            // recebe falso se o valor tiver resultado (pq se tem resultado é pq o jogo n está rodando, ai inicia novamente)
            if (value) this.running = false 
        }
    }
})