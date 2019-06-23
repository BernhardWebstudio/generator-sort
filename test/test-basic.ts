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

test('sort objects', async function(t) {
    const input = [
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

    t.deepEqual(
        input.sort(
            sortGenerator(function*(oA: any, oB: any) {
                yield compareStrings(oA.k1, oB.k1)
                yield compareStrings(oA.k2, oB.k2)
            })
        ),
        [
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
        ]
    )
})
