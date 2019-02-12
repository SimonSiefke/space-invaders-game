<template>
  <section class="container">
    <div class="garden">
      <div class="ball" />
    </div>
    <pre class="output" />
  </section>
</template>

<script>
export default {
  mounted() {
    const ball = document.querySelector('.ball')
    const garden = document.querySelector('.garden')
    const output = document.querySelector('.output')

    const maxX = garden.clientWidth - ball.clientWidth
    const maxY = garden.clientHeight - ball.clientHeight

    function handleOrientation(event) {
      let x = event.beta // In degree in the range [-180,180]
      let y = event.gamma // In degree in the range [-90,90]

      output.innerHTML = `beta : ${x}\n`
      output.innerHTML += `gamma: ${y}\n`

      // Because we don't want to have the device upside down
      // We constrain the x value to the range [-90,90]
      if (x > 90) {
        x = 90
      }
      if (x < -90) {
        x = -90
      }

      // To make computation easier we shift the range of
      // x and y to [0,180]
      x += 90
      y += 90

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      ball.style.top = `${(maxX * x) / 180 - 10}px`
      ball.style.left = `${(maxY * y) / 180 - 10}px`
    }

    window.addEventListener('deviceorientation', handleOrientation)
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.garden {
  position: relative;
  width: 200px;
  height: 200px;
  border: 5px solid #ccc;
  border-radius: 10px;
}

.ball {
  position: absolute;
  top: 90px;
  left: 90px;
  width: 20px;
  height: 20px;
  background: green;
  border-radius: 100%;
}
</style>
