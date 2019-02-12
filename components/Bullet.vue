<template>
  <div
    class="bullet"
    :style="{
      left: `${left}px`,
      top: `${top}px`,
      background: 'purple',
      width: `${size}px`,
      height: `${size}px`
    }"
  />
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    }
  }
}
</script>
