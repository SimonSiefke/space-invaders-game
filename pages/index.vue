<template>
  <section class="container">
    <div class="garden">
      <div
        ref="ball"
        class="ball"
        :style="{ left: `${ball.x}px`, top: `${ball.y}px` }"
      />
      <div
        v-for="bullet in bullets"
        :key="bullet.id"
        :style="{
          left: `${bullet.x}px`,
          top: `${bullet.y}px`,
          background: 'purple'
        }"
        class="bullet"
      />
    </div>
    <pre class="output" />
  </section>
</template>

<script>
import Vue from 'vue'
/* eslint-disable no-restricted-globals */
export default {
  data() {
    return {
      ball: {
        x: 90,
        y: 10
      },
      bullets: [
        {
          x: 10,
          y: 10,
          id: 0
        }
      ]
    }
  },
  mounted() {
    // disallow rotation of screen
    screen.lockOrientationUniversal =
      screen.lockOrientation ||
      screen.mozLockOrientation ||
      screen.msLockOrientation
    if (screen.lockOrientationUniversal) {
      screen.lockOrientationUniversal('portrait-primary')
    }
    const ball = this.$refs.ball
    const garden = document.querySelector('.garden')
    const output = document.querySelector('.output')
    const maxY = garden.clientHeight - ball.clientHeight

    const handleOrientation = event => {
      let y = event.gamma // In degree in the range [-90,90]
      output.innerHTML = `gamma: ${y}\n`

      y += 90

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      Vue.set(this.ball, 'x', (maxY * y) / 180 - 10)
    }

    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('click', this.shoot)
    this.loop()
  },
  methods: {
    loop() {
      for (const bullet of this.bullets) {
        bullet.y--
      }
      requestAnimationFrame(this.loop)
    },
    shoot() {
      this.bullets.push({
        x: this.ball.x,
        y: this.ball.y,
        id: Math.random()
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.garden {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.ball,
.bullet {
  position: absolute;
}
.ball {
  position: absolute;
  top: 90px;
  width: 20px;
  height: 20px;
  background: green;
}
.bullet {
  width: 3px;
  height: 3px;
  background: red;
}
</style>
