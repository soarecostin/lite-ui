<template>
  <div :class="className">
    <div v-show="busy" class="v-spinner">
      <div v-bind:style="[spinnerStyle,spinnerDelay1]" class="v-pulse v-pulse1" />
      <div v-bind:style="[spinnerStyle,spinnerDelay2]" class="v-pulse v-pulse2" />
      <div v-bind:style="[spinnerStyle,spinnerDelay3]" class="v-pulse v-pulse3" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PulseLoader',
  props: {
    busy: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '15px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    },
    position: {
      type: String,
      default: 'absolute'
    }
  },
  data () {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: 'inline-block',
        animationName: 'v-pulseStretchDelay',
        animationDuration: '0.75s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both'
      },
      spinnerDelay1: {
        animationDelay: '0.12s'
      },
      spinnerDelay2: {
        animationDelay: '0.24s'
      },
      spinnerDelay3: {
        animationDelay: '0.36s'
      }
    }
  },
  computed: {
    className () {
      return this.position === 'absolute'
        ? { 'abs-centered': true }
        : { 'position-relative': true }
    }
  }
}
</script>

<style>
.abs-centered {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: rgba(255,255,255,.7);
}

@-webkit-keyframes v-pulseStretchDelay
{
    0%,
    80%
    {
        -webkit-transform: scale(1);
                transform: scale(1);
        -webkit-opacity: 1;
                opacity: 1;
    }
    45%
    {
        -webkit-transform: scale(0.1);
                transform: scale(0.1);
        -webkit-opacity: 0.7;
                opacity: 0.7;
    }
}
@keyframes v-pulseStretchDelay
{
    0%,
    80%
    {
        -webkit-transform: scale(1);
                transform: scale(1);
        -webkit-opacity: 1;
                opacity: 1;
    }
    45%
    {
        -webkit-transform: scale(0.1);
                transform: scale(0.1);
        -webkit-opacity: 0.7;
                opacity: 0.7;
    }
}
</style>
