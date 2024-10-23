import { DatePickerComponent } from './date-picker-component'
import { InputComponent } from './input-component'
import { PassengersComponent } from './passengers-component'

export function SearchComponents(props: any) {
  const { field } = props
  if (field === 'fly_from' || field === 'fly_to') {
    return <InputComponent {...props} />
  }

  if (field === 'date_from' || field === 'return_to') {
    return <DatePickerComponent {...props} />
  }

  if (field === 'passengers') {
    return <PassengersComponent {...props} />
  }

  return null
}
