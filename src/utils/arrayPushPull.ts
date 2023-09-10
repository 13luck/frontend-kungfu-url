export const arrayPushPull = <T>(array: T[], value: T, push: boolean) => (push
  ? [...array, value]
  : array.filter((v) => v !== value))
