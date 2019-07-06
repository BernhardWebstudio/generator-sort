import 'source-map-support/register'

import * as test from 'purple-tape'
import {
    sortFunction,
    compareStrings,
    compareNumbers,
    reverse,
    compareStringsCaseInsensitive,
} from '../index'

test('sort strings', async function(t) {
    const input = ['b', 'a', 'aa', 'A', 'B']

    t.deepEqual(
        input.sort(
            sortFunction(function*(oA: string, oB: string) {
                yield compareStrings(oA, oB)
            })
        ),
        ['A', 'B', 'a', 'aa', 'b']
    )
})

test('sort strings case-insensitice', async function(t) {
    const input = ['b', 'a', 'aa', 'A', 'B']

    t.deepEqual(
        input.sort(
            sortFunction(function*(oA: string, oB: string) {
                yield compareStringsCaseInsensitive(oA, oB)
                yield compareStrings(oA, oB)
            })
        ),
        ['A', 'a', 'aa', 'B', 'b']
    )
})

test('sort numbers', async function(t) {
    const input = [3, 7, 73, 3]

    t.deepEqual(
        input.sort(
            sortFunction(function*(oA: number, oB: number) {
                yield compareNumbers(oA, oB)
            })
        ),
        [3, 3, 7, 73]
    )
})

test('sort numbers in reverse', async function(t) {
    const input = [7, 73, 3]

    t.deepEqual(
        input.sort(
            sortFunction(function*(oA: number, oB: number) {
                yield reverse(compareNumbers(oA, oB))
            })
        ),
        [73, 7, 3]
    )
})

interface Obj {
    k1: string
    k2: string
}

test('sort objects', async function(t) {
    const input: Obj[] = [
        {
            k1: 'b',
            k2: 'f',
        },
        {
            k1: 'a',
            k2: 'f',
        },
        {
            k1: 'b',
            k2: 'e',
        },
    ]

    const output = input.sort(
        sortFunction(function*(oA: Obj, oB: Obj) {
            yield compareStrings(oA.k1, oB.k1)
            yield compareStrings(oA.k2, oB.k2)
        })
    )

    t.deepEqual(output, [
        {
            k1: 'a',
            k2: 'f',
        },
        {
            k1: 'b',
            k2: 'e',
        },
        {
            k1: 'b',
            k2: 'f',
        },
    ])
})
