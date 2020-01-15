<template>
  <b-card border-variant="light" class="mb-4">
    <b-form>
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      ></vue-form-generator>
    </b-form>
    <pulse-loader :loading="loading" v-show="loading" />
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default () {
        return {
          name: '',
          email: '',
          fields: {}
        }
      }
    }
  },
  data () {
    return {
      formOptions: {
        validateAfterChanged: true,
        validateDebounceTime: 500
      }
    }
  },
  computed: {
    ...mapState({
      additionalFields: state => state.fields.list
    }),
    schema () {
      return {
        'fields': [
          ...this.edit ? [] : [{
            type: 'input',
            inputType: 'email',
            label: 'E-mail',
            model: 'email',
            required: true,
            validator: ['email', 'required']
          }],
          ...[{
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name'
          }],
          ...this.additionalFormFields,
          ...[{
            type: 'submit',
            buttonText: this.edit ? 'Edit' : 'Add' + ' subscriber',
            fieldClasses: 'btn btn-primary',
            styleClasses: 'mt-4',
            disabled: () => this.loading,
            validateBeforeSubmit: true,
            onSubmit: this.onSubmit
          }]
        ]
      }
    },
    additionalFormFields () {
      return this.additionalFields.map((subscriberField) => {
        return this.mapField(subscriberField)
      })
    }
  },
  methods: {
    mapField (subscriberField) {
      const field = {
        label: subscriberField.title,
        model: 'fields.' + subscriberField.key
      }

      if (subscriberField.type === 'DATE') {
        return Object.assign({
          type: 'cleave',
          cleaveOptions: {
            date: true,
            delimiter: '-',
            datePattern: ['Y', 'm', 'd']
          },
          placeholder: 'YYYY-MM-DD',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          validator: ['regexp']
        }, field)
      }

      if (subscriberField.type === 'NUMBER') {
        return Object.assign({
          type: 'input',
          inputType: 'number',
          validator: ['number']
        }, field)
      }

      if (subscriberField.type === 'BOOLEAN') {
        return Object.assign({
          type: 'checkbox'
        }, field)
      }

      return Object.assign({
        type: 'input',
        inputType: 'text'
      }, field)
    },
    onSubmit () {
      this.$emit('submit', this.model)
    }
  }
}
</script>
