export function flow(createdPasswords: number[][]) {
  return [
    {
      title: "Create passwords",
      action: { isCreatingPassword: true },
      data: createdPasswords[0],
      description: "Show first password"
    },
    {
      title: "Create passwords",
      action: { isCreatingPassword: true },
      data: createdPasswords[1],
      description: "Show second password"
    },
    {
      title: "Create passwords",
      action: { isCreatingPassword: true },
      data: createdPasswords[2],
      description: "Show third password"
    }
  ];
}
