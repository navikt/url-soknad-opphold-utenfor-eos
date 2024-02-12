import { describe, it, expect } from 'vitest'

import { Pasient } from 'queries'

import { getPasientName } from './pasientUtils'

describe('pasientUtils', () => {
    describe('getName', () => {
        it('Returns full name', () => {
            const pasient: Pasient = {
                __typename: 'Pasient',
                fnr: '12345678901',
                fornavn: 'Ola',
                mellomnavn: 'Halvor',
                etternavn: 'Nordmann',
                overSyttiAar: null,
            }
            expect(getPasientName(pasient)).toEqual('Ola Halvor Nordmann')
        })

        it('Returns name without middle name', () => {
            const pasient: Pasient = {
                __typename: 'Pasient',
                fnr: '12345678901',
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
                overSyttiAar: null,
            }
            expect(getPasientName(pasient)).toEqual('Ola Nordmann')
        })

        it('Returns undefined for missing fornavn', () => {
            const pasient: Pasient = {
                __typename: 'Pasient',
                fnr: '12345678901',
                fornavn: null,
                mellomnavn: null,
                etternavn: 'Nordmann',
            }
            expect(getPasientName(pasient)).toBeUndefined()
        })
    })
})
