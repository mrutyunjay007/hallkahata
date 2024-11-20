function nameTrimer(name: string, len: number): string {
  if (name.length < len) return name;

  const newName = name.slice(0, len);

  return `${newName}...`;
}

export default nameTrimer;
