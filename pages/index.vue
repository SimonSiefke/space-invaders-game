<template>
  <section class="container">
    <div class="garden">
      <div ref="ball" class="ball" />
    </div>
    <pre class="output" />
  </section>
</template>

<script>
/* eslint-disable no-restricted-globals */
export default {
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

    function handleOrientation(event) {
      let y = event.gamma // In degree in the range [-90,90]
      output.innerHTML = `gamma: ${y}\n`

      y += 90

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      // ball.style.top = `${(maxX * x) / 180 - 10}px`
      ball.style.left = `${(maxY * y) / 180 - 10}px`
    }

    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('click', this.shoot)
  },
  methods: {
    shoot() {
      //
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

.ball {
  position: absolute;
  top: 90px;
  left: 90px;
  width: 20px;
  height: 20px;
  background: green;
}
</style>
