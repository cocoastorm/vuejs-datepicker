import DateInput from '@/components/DateInput.vue'
import { shallowMount } from '@vue/test-utils'
import { en } from '@/locale'

describe('DateInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DateInput, {
      props: {
        format: 'dd MMM yyyy',
        translation: en,
        typeable: true
      }
    })
  })

  it('does not format the date when typed', async () => {
    const dateString = '2018-04-24'
    wrapper.vm.input.value = dateString
    expect(wrapper.vm.input.value).toEqual(dateString)
    await wrapper.setData({
      typedDate: dateString
    })
    await wrapper.setProps({
      selectedDate: new Date(dateString)
    })
    expect(wrapper.vm.typedDate).toEqual(dateString)
    expect(wrapper.vm.formattedValue).toEqual(dateString)
  })

  it('emits the date when typed', () => {
    const input = wrapper.find('input')
    wrapper.vm.input.value = '2018-04-24'
    input.trigger('keyup')
    expect(wrapper.emitted().typedDate).toBeDefined()
    expect(wrapper.emitted().typedDate[0][0]).toBeInstanceOf(Date)
  })

  it('emits closeCalendar when return is pressed', () => {
    const input = wrapper.find('input')
    const blurSpy = vi.spyOn(input.element, 'blur')
    input.trigger('keyup', { keyCode: 13 })
    expect(blurSpy).toBeCalled()
  })

  it('clears a typed date if it does not parse', async () => {
    const input = wrapper.find('input')
    await wrapper.setData({ typedDate: 'not a date' })
    input.trigger('blur')
    expect(wrapper.emitted().clearDate).toBeDefined()
  })

  it('doesn\'t emit the date if typeable=false', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        format: 'dd MMM yyyy',
        translation: en,
        typeable: false
      }
    })
    const input = wrapper.find('input')
    wrapper.vm.input.value = '2018-04-24'
    input.trigger('keydown')
    input.trigger('keyup')
    expect(wrapper.emitted().typedDate).not.toBeDefined()
  })
})
