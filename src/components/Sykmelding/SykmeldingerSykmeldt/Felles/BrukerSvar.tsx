import React, { ReactElement } from 'react'
import { BoatIcon, BriefcaseIcon, CheckmarkCircleIcon, TasklistIcon, XMarkOctagonIcon } from '@navikt/aksel-icons'
import { ExpansionCard } from '@navikt/ds-react'
import { useQuery } from '@apollo/client'

import { BrukerinformasjonDocument, BrukerSvarFragment, JaEllerNei, SykmeldingErUtenforVentetidDocument } from 'queries'

import { SykmeldingInfo, SykmeldingListInfo } from '../../../molecules/sykmelding/SykmeldingInfo'
import { arbeidsSituasjonEnumToText, uriktigeOpplysningerEnumToText } from '../../../../utils/sporsmal'
import { capitalizeFirstLetter, pluralize } from '../../../../utils/stringUtils'
import { toReadableDate, toReadableDatePeriod } from '../../../../utils/dateUtils'
import { FormValues } from '../../../SendSykmelding/SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'
import { isArbeidsledig, isFrilanserOrNaeringsdrivendeOrJordbruker } from '../../../../utils/arbeidssituasjonUtils'

import { mapFormValuesToBrukerSvar, mapFrilanserFormValuesToBrukerSvar, SporsmaltekstMetadata } from './BrukerSvarUtils'

export type { SporsmaltekstMetadata }

type Props = {
    title: 'Oppsummering av dine svar' | 'Dine svar'
    brukerSvar: BrukerSvarFragment | { values: FormValues; sporsmaltekstMetadata: SporsmaltekstMetadata }
    className?: string
}

export function BrukerSvarExpansionCard({ title, brukerSvar, className }: Props): ReactElement {
    return (
        <ExpansionCard
            aria-labelledby="oppsummering-bruker-svar-heading"
            className={className}
            onToggle={(open) => {
                logAmplitudeEvent(
                    {
                        eventName: `accordion ${open ? 'åpnet' : 'lukket'}`,
                        data: { tekst: title },
                    },
                    {
                        status: '__typename' in brukerSvar ? 'sendt/bekreftet' : 'ikke sendt',
                    },
                )
            }}
        >
            <ExpansionCard.Header>
                <div className="flex items-center gap-4">
                    <div className="mt-1.5 grid shrink-0 place-content-center text-4xl">
                        <TasklistIcon role="img" aria-hidden />
                    </div>
                    <ExpansionCard.Title id="oppsummering-bruker-svar-heading" as="h2">
                        {title}
                    </ExpansionCard.Title>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {'__typename' in brukerSvar ? (
                    <SentSykmeldingBrukerSvar brukerSvar={brukerSvar} />
                ) : (
                    <CurrentFormValuesBrukerSvar brukerSvar={brukerSvar} />
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

function SentSykmeldingBrukerSvar({ brukerSvar }: { brukerSvar: BrukerSvarFragment }): ReactElement {
    return (
        <>
            <YesNoAnswer response={brukerSvar.erOpplysningeneRiktige} />
            <UriktigeOpplysningerAnswer response={brukerSvar.uriktigeOpplysninger} />
            <ArbeidssituasjonAnswer response={brukerSvar.arbeidssituasjon} />
            <FiskerBladAnswer response={brukerSvar.fisker?.blad} />
            <FiskerLottOgHyreAnswer response={brukerSvar.fisker?.lottOgHyre} />
            {brukerSvar.arbeidsgiverOrgnummer && (
                // This component does some data-fetching, avoid rendering it to avoid unnecessary requests
                <ArbeidsgiverOrgnummerAnswer response={brukerSvar.arbeidsgiverOrgnummer} />
            )}
            <YesNoAnswer response={brukerSvar.riktigNarmesteLeder} />
            <YesNoAnswer response={brukerSvar.harBruktEgenmeldingsdager} />
            <EgenmeldingsdagerAnswer response={brukerSvar.egenmeldingsdager} />
            <YesNoAnswer response={brukerSvar.harBruktEgenmelding} />
            <FrilanserEgenmeldingsperioderAnswer response={brukerSvar.egenmeldingsperioder} />
            <YesNoAnswer response={brukerSvar.harForsikring} />
            {isArbeidsledig(brukerSvar.arbeidssituasjon?.svar) && (
                <ArbeidsledigFraOrgnummerAnswer response={brukerSvar.arbeidsledig?.arbeidsledigFraOrgnummer} />
            )}
        </>
    )
}

function CurrentFormValuesBrukerSvar({
    brukerSvar,
}: {
    brukerSvar: { values: FormValues; sporsmaltekstMetadata: SporsmaltekstMetadata }
}): ReactElement {
    const mappedValues = mapFormValuesToBrukerSvar(brukerSvar.values, brukerSvar.sporsmaltekstMetadata)

    return (
        <>
            <YesNoAnswer response={mappedValues.erOpplysningeneRiktige} />
            <UriktigeOpplysningerAnswer response={mappedValues.uriktigeOpplysninger} />
            <ArbeidssituasjonAnswer response={mappedValues.arbeidssituasjon} />
            <FiskerBladAnswer response={mappedValues.fisker?.blad} />
            <FiskerLottOgHyreAnswer response={mappedValues.fisker?.lottOgHyre} />
            {mappedValues.arbeidsgiverOrgnummer && (
                // This component does some data-fetching, avoid rendering it to avoid unnecessary requests
                <ArbeidsgiverOrgnummerAnswer response={mappedValues.arbeidsgiverOrgnummer} />
            )}
            <YesNoAnswer response={mappedValues.riktigNarmesteLeder} />
            <YesNoAnswer response={mappedValues.harBruktEgenmeldingsdager} />
            <EgenmeldingsdagerAnswer response={mappedValues.egenmeldingsdager} />
            {isFrilanserOrNaeringsdrivendeOrJordbruker(mappedValues.arbeidssituasjon?.svar) && (
                <FrilanserNaeringsdrivendeBrukerSvar
                    formValues={brukerSvar.values}
                    sykmeldingStartDato={brukerSvar.sporsmaltekstMetadata.sykmeldingStartDato}
                    sykmeldingId={brukerSvar.sporsmaltekstMetadata.sykmeldingId}
                />
            )}
        </>
    )
}

function ArbeidsledigFraOrgnummerAnswer({
    response,
}: {
    response:
        | Pick<
              NonNullable<NonNullable<BrukerSvarFragment['arbeidsledig']>['arbeidsledigFraOrgnummer']>,
              'sporsmaltekst' | 'svar'
          >
        | null
        | undefined
}): ReactElement | null {
    // This loading state will never be seen, so we can ignore it
    const { data } = useQuery(BrukerinformasjonDocument)
    if (response == null) return null

    const relevantArbeidsgiverNavn: string | null =
        data?.brukerinformasjon.arbeidsgivere.find((it) => it.orgnummer === response.svar)?.navn ?? null
    const text = relevantArbeidsgiverNavn != null ? `${relevantArbeidsgiverNavn} (${response.svar})` : response.svar

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3" icon={<BriefcaseIcon aria-hidden />}>
            {text}
        </SykmeldingInfo>
    )
}

function FrilanserNaeringsdrivendeBrukerSvar({
    formValues,
    sykmeldingStartDato,
    sykmeldingId,
}: {
    formValues: FormValues
    sykmeldingStartDato: string
    sykmeldingId: string
}): React.ReactElement | null {
    // This loading state will never be seen, so we can ignore it
    const { data } = useQuery(SykmeldingErUtenforVentetidDocument, {
        variables: { sykmeldingId },
    })

    if (!data) {
        return null
    }

    const oppfolgingsdato = data.sykmeldingUtenforVentetid.oppfolgingsdato || sykmeldingStartDato
    const mappedValues = mapFrilanserFormValuesToBrukerSvar(formValues, oppfolgingsdato)

    return (
        <>
            <YesNoAnswer response={mappedValues.harBruktEgenmelding} />
            <FrilanserEgenmeldingsperioderAnswer response={mappedValues.egenmeldingsperioder} />
            <YesNoAnswer response={mappedValues.harForsikring} />
        </>
    )
}

function UriktigeOpplysningerAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['uriktigeOpplysninger']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3">
            <ul className="flex gap-1 flex-col">
                {response.svar.map((svar) => (
                    <li key={svar} className="flex gap-3 items-center">
                        <XMarkOctagonIcon aria-hidden className="text-xl" />
                        {uriktigeOpplysningerEnumToText(svar)}
                    </li>
                ))}
            </ul>
        </SykmeldingInfo>
    )
}

function YesNoAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<BrukerSvarFragment['erOpplysningeneRiktige']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3" icon={<CheckmarkCircleIcon aria-hidden />}>
            {response.svar === JaEllerNei.JA ? 'Ja' : 'Nei'}
        </SykmeldingInfo>
    )
}

function ArbeidssituasjonAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['arbeidssituasjon']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3" icon={<BriefcaseIcon aria-hidden />}>
            {capitalizeFirstLetter(arbeidsSituasjonEnumToText(response.svar))}
        </SykmeldingInfo>
    )
}

function ArbeidsgiverOrgnummerAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['arbeidsgiverOrgnummer']>, 'sporsmaltekst' | 'svar'>
}): ReactElement {
    // This loading state will never be seen, so we can ignore it
    const { data } = useQuery(BrukerinformasjonDocument)

    const relevantArbeidsgiverNavn: string | null =
        data?.brukerinformasjon.arbeidsgivere.find((it) => it.orgnummer === response.svar)?.navn ?? null
    const text = relevantArbeidsgiverNavn != null ? `${relevantArbeidsgiverNavn} (${response.svar})` : response.svar

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3" icon={<BriefcaseIcon aria-hidden />}>
            {text}
        </SykmeldingInfo>
    )
}

function FiskerBladAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<NonNullable<BrukerSvarFragment['fisker']>['blad']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3" icon={<BoatIcon aria-hidden />}>
            Blad {response.svar}
        </SykmeldingInfo>
    )
}

function FiskerLottOgHyreAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<NonNullable<BrukerSvarFragment['fisker']>['lottOgHyre']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} level="3" icon={<BoatIcon aria-hidden />}>
            {capitalizeFirstLetter(response.svar.toLocaleLowerCase())}
        </SykmeldingInfo>
    )
}

function EgenmeldingsdagerAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['egenmeldingsdager']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingListInfo
            heading={response.sporsmaltekst}
            level="3"
            texts={[...response.svar.map(toReadableDate), `(${pluralize('dag', response.svar.length)})`]}
        />
    )
}

function FrilanserEgenmeldingsperioderAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['egenmeldingsperioder']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingListInfo
            heading={response.sporsmaltekst}
            level="3"
            texts={response.svar.map((it) => toReadableDatePeriod(it.fom, it.tom))}
        />
    )
}
