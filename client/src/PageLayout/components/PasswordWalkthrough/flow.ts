export function flow(createdPasswords: number[][], shuffledSequence: number[]) {
  return [
    {
      title: "Create a password for",
      action: { isCreatingPassword: true },
      data: createdPasswords[0],
      description: "Show first password"
    },
    {
      title: "Create a password for",
      action: { isCreatingPassword: true },
      data: createdPasswords[1],
      description: "Show second password"
    },
    {
      title: "Create a password for",
      action: { isCreatingPassword: true },
      data: createdPasswords[2],
      description: "Show third password"
    },
    {
      title: "Remember the password for",
      action: { isCreatingPassword: false },
      data: createdPasswords[shuffledSequence[0]],
      description: "Remember first password"
    },
    {
      title: "Remember the password for",
      action: { isCreatingPassword: false },
      data: createdPasswords[shuffledSequence[1]],
      description: "Remember second password"
    },
    {
      title: "Remember the password for",
      action: { isCreatingPassword: false },
      data: createdPasswords[shuffledSequence[2]],
      description: "Remember third password"
    }
  ];
}
