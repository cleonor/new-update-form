import { useId } from 'react'

function Title() {
  const id = useId()

  return (
    <div className="field">
      <label htmlFor={id}>Title</label>
      <input id={id} name="title" type="text" />
    </div>
  )
}

export default Title
