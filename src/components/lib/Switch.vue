<template>
  <button><span></span></button>
</template>

<script lang="ts">
export default {
  name: "Switch",
};
</script>

<style lang="scss" scoped>
$h: 22px;
$h2: $h - 4px;
$small-shadow: 2px 2px 6px
    rgba(
      $color: #000,
      $alpha: 0.5,
    ),
  -2px -2px 6px
    rgba(
      $color: #fff,
      $alpha: 0.7,
    );

$small-shadow-inset: 2px 2px 5px inset
    rgba(
      $color: #000,
      $alpha: 0.3,
    ),
  -2px -2px 5px inset
    rgba(
      $color: #fff,
      $alpha: 0.5,
    );

$tiny-shadow: -2px -2px 4px rgba(
      $color: #ffffff,
      $alpha: 0.6,
    ),
  2px 2px 4px
    rgba(
      $color: #000000,
      $alpha: 0.4,
    );
button {
  height: $h;
  width: $h * 2;
  border: none;
  background: linear-gradient(145deg, #e06a2a, #ff7e32);
  border-radius: $h/2;
  position: relative;
  box-shadow: $small-shadow, $small-shadow-inset;
}
span {
  position: absolute;
  top: 2px;
  left: 2px;
  height: $h2;
  width: $h2;
  background: linear-gradient(145deg, #ffffff, #dfdfdf);
  border-radius: $h2/2;
  box-shadow: $tiny-shadow;
}
button:hover > span {
  left: calc(100% - #{$h2} - 2px);
}
</style>
