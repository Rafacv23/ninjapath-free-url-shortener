export function handleChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setUrl: React.Dispatch<React.SetStateAction<string>>
) {
  setUrl(event.target.value)
}

export function handleChangeAlias(
  event: React.ChangeEvent<HTMLInputElement>,
  setAlias: React.Dispatch<React.SetStateAction<string>>
) {
  const value = event.target.value.replace(/\s/g, "")
  setAlias(value)
}
