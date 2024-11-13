function nameTrimer(name: string): string {
  if (name.length < 5) return name;

  const newName = name.slice(0, 5);

  return `${newName}...`;
}

export default nameTrimer;
