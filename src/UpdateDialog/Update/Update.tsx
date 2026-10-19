import { useId } from 'react'

function Update() {
  const id = useId()

  return (
    <div className="field">
      <label htmlFor={id}>Update</label>
      <textarea id={id} name="content" rows={6} />
    </div>
  )
}

export default Update
