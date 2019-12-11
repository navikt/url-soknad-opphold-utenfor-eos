import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldError, ValidationPayload } from 'react-hook-form/dist/types';
import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import Flatpickr from 'react-flatpickr';
import './flatpickr.less';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import { Egenmeldingsperiode } from '../valideringsSkjema';
import { Skjemafelt } from '../../../types/sporsmalTypes';
import Lenke from 'nav-frontend-lenker';
import './egenmeldingsdager.less';

const locale: CustomLocale = {
    rangeSeparator: ' til ',
    firstDayOfWeek: 1,
    weekdays: {
        shorthand: ['søn', 'man', 'tirs', 'ons', 'tors', 'fre', 'lør'],
        longhand: ['søndag', 'mandag', 'tirsadg', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    },
    months: {
        shorthand: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
        longhand: [
            'januar',
            'februar',
            'mars',
            'april',
            'mai',
            'juni',
            'juli',
            'aug',
            'september',
            'oktober',
            'november',
            'desember',
        ],
    },
};

interface EgenmeldingsdagerProps {
    vis: boolean;
    name: string;
    sykmeldingStartdato?: Date;
}

const Egenmeldingsdager = ({ vis, name, sykmeldingStartdato }: EgenmeldingsdagerProps) => {
    const { register, unregister, errors, setValue, triggerValidation, formState } = useFormContext();
    const { isSubmitted } = formState;

    const [perioder, setPerioder] = useState<Egenmeldingsperiode[]>([{ id: 0 }]); // Legger til første periode

    // Registrer ved mount, unregistrer ved unmount
    useEffect(() => {
        register({ name: name });
        return () => unregister(name);
    }, [name, register, unregister]);

    const opprettNyPeriode = (): void => {
        const nyPeriode: Egenmeldingsperiode = { id: perioder[perioder.length - 1].id + 1 };
        const nyPerioder = [...perioder, nyPeriode];
        setPerioder(nyPerioder); // Legger til periode med id én høyere enn siste element i listen
        setValue(name, nyPerioder);
    };

    const slettPeriode = (id: number): void => {
        const nyPerioder = perioder.filter(periode => periode.id !== id);
        setPerioder(nyPerioder);
        setValue(name, nyPerioder);
        if (isSubmitted) {
            triggerValidation({ name: name });
        }
    };

    const oppdaterPeriode = (id: number, datoer: Date[]): void => {
        setPerioder(perioder => {
            return perioder.map(periode => {
                if (periode.id === id) {
                    return { ...periode, datoer };
                } else {
                    return periode;
                }
            });
        });
        setValue(
            name,
            perioder.map(periode => {
                if (periode.id === id) {
                    const nyPeriode: Egenmeldingsperiode = { ...periode, datoer };
                    return nyPeriode;
                }
                return periode;
            }),
        );
        if (isSubmitted) {
            triggerValidation({ name: name });
        }
    };

    if (!vis) {
        return null;
    }

    return (
        <>
            <SkjemaGruppe
                feil={
                    errors.egenmeldingsperioder
                        ? { feilmelding: tekster['egenmeldingsperioder.feilmelding'] }
                        : undefined
                }
            >
                <Fieldset legend={tekster['egenmeldingsperioder.tittel']}>
                    {perioder.map(periode => {
                        return (
                            <div className="periode" key={periode.id}>
                                <Flatpickr
                                    value={periode.datoer}
                                    className="typo-normal flatpickr"
                                    placeholder="Trykk for å velge periode"
                                    onChange={datoer => oppdaterPeriode(periode.id, datoer)}
                                    options={{
                                        minDate: new Date('10.02.2019'),
                                        maxDate: new Date('11.10.2019'),
                                        mode: 'range',
                                        enableTime: false,
                                        dateFormat: 'd-m-y',
                                        altInput: true,
                                        altFormat: 'j. M, Y',
                                        locale: locale,
                                    }}
                                />
                                {/* Skal ikke kunne slette første periode */}
                                {periode.id !== 0 && (
                                    <Lenke
                                        className="periode__slett"
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            slettPeriode(periode.id);
                                        }}
                                    >
                                        {tekster['egenmeldingsperioder.slett-periode']}
                                    </Lenke>
                                )}
                            </div>
                        );
                    })}
                </Fieldset>
                <Lenke
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        opprettNyPeriode();
                    }}
                >
                    {tekster['egenmeldingsperioder.legg-til-periode']}
                </Lenke>
            </SkjemaGruppe>
        </>
    );
};

export default Egenmeldingsdager;
