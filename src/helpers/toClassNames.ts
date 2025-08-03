export const toClassName = (...args: (string | number | boolean | undefined)[]): string => {
  return args.filter(Boolean).join(' ')
}
