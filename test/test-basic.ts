import 'source-map-support/register'

import * as test from 'purple-tape'
import { sortGenerator, compareStrings } from '..'

test('sort strings', async function(t) {
    const input = ['b', 'a', 'aa']

    t.deepEqual(
        input.sort(
            sortGenerator(function*(oA: string, oB: string) {
                yield compareStrings(oA, oB)
            })
        ),
        ['a', 'aa', 'b']
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
        sortGenerator(function*(oA: Obj, oB: Obj) {
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
