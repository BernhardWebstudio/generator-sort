type CompareResult = -1 | 1 | 0
type CompareFunction<T> = (a: T, b: T) => CompareResult

export function compareStrings(sA: string, sB: string) {
    return sA.localeCompare(sB) as CompareResult
}

export function compareStringsCaseInsensitive(sA: string, sB: string) {
    return compareStrings(sA.toLowerCase(), sB.toLowerCase())
}

export function sortGenerator<T>(
    gen: (a: T, b: T) => IterableIterator<CompareResult>
): CompareFunction<T> {
    return (a: T, b: T) => {
        for (let comp of gen(a, b)) {
            if (comp) {
                return comp
            }
        }

        return 0
    }
}
