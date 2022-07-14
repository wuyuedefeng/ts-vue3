<template>
  <slot v-bind="{...slotData}"></slot>
</template>

<script lang='tsx'>
import { reactive, toRefs, defineComponent, computed } from 'vue'
import { useLoading } from '@/utils/hooks/useLoading'

export default defineComponent({
  inheritAttrs: false,
  setup (_props, ctx) {
    const state: any = reactive({
      submitLoading: useLoading(),
      formRef: null,
      formAttrs: computed(() => {
        const attrs: any = {}
        for (const key in ctx.attrs) {
          if (!/^(_|onSubmit|onCancel|onReset)/.test(key)) {
            attrs[key] = ctx.attrs[key]
          }
        }
        // onSubmit
        attrs['onSubmit'] = (...args: [any]) => {
          state.submitLoading.load(async () => {
            await state.formRef?.validate().then(async () => {
              //await new Promise(resolve => {
              //  setTimeout(() => {
              //    resolve()
              //  }, 3000)
              //})
              let onSubmit: any = ctx.attrs['onSubmit']
              if (onSubmit) {
                args = args.length ? args : [ctx.attrs.model || {}]
                await onSubmit(...args)
              }
            })
          })
        }
        // onCancel
        attrs['onCancel'] = (...args: [any]) => {
          const onCancel: any = ctx.attrs['onCancel']
          if (onCancel) { onCancel(...args) }
        }
        // onReset
        attrs['onReset'] = (...args: [any]) => {
          state.formRef.resetFields()
          const onReset: any = ctx.attrs['onReset']
          if (onReset) { onReset(...args) }
        }

        attrs.model = attrs.model || {}
        return attrs
      }),
    })
    return {
      ...toRefs(state),
      slotData: computed(() => {
        return {
          formRef: state.formRef,
          formAttrs: state.formAttrs,
          submitLoading: state.submitLoading,
        }
      })
    }
  },
})
</script>

<style lang="scss" scoped>
</style>