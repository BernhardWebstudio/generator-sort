export function compareStrings(sA: string, sB: string) {
    return [sA, sB]
}

type CompareFunction<T> = (a: T, b: T) => -1 | 0 | 1

export function sortGenerator<T>(
    gen: (a: T, b: T) => IterableIterator<string[]>
): CompareFunction<T> {
    return (a: T, b: T) => {
        for (let comp of gen(a, b)) {
            if (comp[0] < comp[1]) {
                return -1
            } else if (comp[0] > comp[1]) {
                return 1
            }
        }

        return 0
    }
}
