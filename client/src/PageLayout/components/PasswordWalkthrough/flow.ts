export function flow(
  createdPasswords: number[][],
  shuffledPasswords: number[][]
) {
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
      title: "Remember a password",
      action: { isCreatingPassword: false },
      data: shuffledPasswords[0],
      description: "Remember first password"
    },
    {
      title: "Remember a password",
      action: { isCreatingPassword: false },
      data: shuffledPasswords[1],
      description: "Remember second password"
    },
    {
      title: "Remember a password",
      action: { isCreatingPassword: false },
      data: shuffledPasswords[2],
      description: "Remember third password"
    }
  ];
}
