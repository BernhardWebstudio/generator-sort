export function compareStrings(sA: string, sB: string) {
    return [sA, sB]
}

type CompareFunction = (a: any, b: any) => -1 | 0 | 1

export function sortGenerator(_gen: any): CompareFunction {
    return (a: any, b: any) => {
        for (let comp of _gen(a, b)) {
            if (comp[0] < comp[1]) {
                return -1
            } else if (comp[0] > comp[1]) {
                return 1
            }
        }

        return 0
    }
}
