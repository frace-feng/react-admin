/**
 * 功能：相加
 */

type ArrayItem<T> = T extends (infer U)[] ? U : never;

export function useSum<T extends string[] | number[]>(payload: T): ArrayItem<T> | undefined {
  const first = payload[0];
  if (typeof first === 'string') {
    return (payload as string[]).reduce((prev, cur) => prev + cur, '') as ArrayItem<T>
  } else if (typeof first === 'number') {
    return (payload as number[]).reduce((prev, cur) => prev + cur, 0) as ArrayItem<T>
  }
}