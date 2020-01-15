<template>
  <div class="title-bar">
    <b-container>
      <b-row align-v="center">
        <b-col>
          <slot name="title">
            <h1>
              {{ title }}
            </h1>
          </slot>
        </b-col>
        <b-col align="right">
          <slot name="button">
            <b-button :to="backUrl" size="lg" variant="secondary">
              {{ backText || 'Back' }}
            </b-button>
          </slot>
        </b-col>
      </b-row>
      <slot></slot>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    backUrl: String,
    backText: String
  }
}
</script>
