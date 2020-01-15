<script>
export default {
  render (createElement) {
    return createElement('b-table', {
      props: this.$attrs,
      slots: this.$parent.$slots,
      scopedSlots: this.$parent.$scopedSlots
    })
  }
}
</script>
