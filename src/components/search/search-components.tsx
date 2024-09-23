import { DatePickerComponent } from './date-picker-component'
import { InputComponent } from './input-component'
import { PassengersComponent } from './passengers-components'

export function SearchComponents(props: any) {
  const { field } = props
  if (field === 'flyFrom' || field === 'flyTo') {
    return <InputComponent {...props} />
  }

  if (field === 'departure' || field === 'arrival') {
    return <DatePickerComponent {...props} />
  }

  if (field === 'passengers') {
    return <PassengersComponent />
  }

  return null
}
