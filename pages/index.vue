<template>
  <section class="container">
    <div class="garden">
      <div
        ref="ball"
        class="ball"
        :style="{
          left: `${ball.x}px`,
          top: `${ball.y}px`,
          width: `${ball.size}px`,
          height: `${ball.size}px`
        }"
      />
      <div
        v-for="bullet in bullets"
        :key="bullet.id"
        :style="{
          left: `${bullet.x}px`,
          top: `${bullet.y}px`,
          background: 'purple',
          width: `${bullet.size}px`,
          height: `${bullet.size}px`
        }"
        class="bullet"
      />
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
/* eslint-disable no-restricted-globals */
export default {
  data() {
    return {
      ball: {
        x: 90,
        y: 10,
        size: 20
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
    const maxY = garden.clientHeight - ball.clientHeight

    const handleOrientation = event => {
      let y = event.gamma // In degree in the range [-90,90]

      y += 90

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      Vue.set(this.ball, 'x', (maxY * y) / 180 - 10)
    }

    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('click', _.throttle(this.shoot, 700))
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
      const bulletSize = 4
      this.bullets.push({
        x: this.ball.x + this.ball.size / 2 - bulletSize / 2,
        y: this.ball.y - bulletSize,
        id: Math.random(),
        size: bulletSize
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
  background: green;
}
.bullet {
  background: red;
}
</style>
