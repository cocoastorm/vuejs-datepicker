import DateInput from '@/components/DateInput.vue'
import { shallowMount } from '@vue/test-utils'
import { en } from '@/locale'

describe('DateInput', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en
      }
    })
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('nulls date', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: null,
        format: 'dd MMM yyyy',
        translation: en
      }
    })
    expect(wrapper.vm.formattedValue).toBeNull()
    expect(wrapper.find('input').element.value).toEqual('')
  })

  it('formats date', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en
      }
    })
    expect(wrapper.vm.formattedValue).toEqual('24 Mar 2018')
    expect(wrapper.find('input').element.value).toEqual('24 Mar 2018')
  })

  it('delegates date formatting', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2016, 1, 15),
        format: () => '2016/1/15',
        translation: en
      }
    })
    expect(wrapper.vm.formattedValue).toEqual('2016/1/15')
    expect(wrapper.find('input').element.value).toEqual('2016/1/15')
  })

  it('emits showCalendar', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en
      }
    })
    wrapper.vm.showCalendar()
    expect(wrapper.emitted().showCalendar).toBeTruthy()
  })

  it('adds bootstrap classes', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        bootstrapStyling: true,
        translation: en
      }
    })
    expect(wrapper.find('input').classes()).toContain('form-control')
  })

  it('appends bootstrap classes', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        inputClass: 'someClass',
        bootstrapStyling: true,
        translation: en
      }
    })
    expect(wrapper.find('input').classes()).toContain('form-control')
    expect(wrapper.find('input').classes()).toContain('someClass')
  })

  it('can be disabled', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        disabled: true,
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en
      }
    })
    expect(wrapper.find('input').attributes().disabled).toBeDefined()
  })

  it('accepts a function as a formatter', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: () => '!',
        translation: en
      }
    })
    expect(wrapper.find('input').element.value).toEqual('!')
  })

  it('triggers closeCalendar on blur', () => {
    const wrapper = shallowMount(DateInput, {
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: () => '!',
        translation: en
      }
    })
    wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('closeCalendar')).toBeTruthy()
  })
})
