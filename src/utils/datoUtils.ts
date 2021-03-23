import dayjs from 'dayjs';
import Periode from '../types/sykmelding/Periode';

const maaneder = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
];
const SKILLETEGN_PERIODE = '–';

// TODO: refactor to make year only show if different
export const toReadableTotalPeriodLength = (perioder: Periode[]): string => {
    const earliestFom: Date = perioder.reduce((earlist, current) => {
        if (dayjs(current.fom).isBefore(dayjs(earlist.fom))) {
            return current;
        }
        return earlist;
    }).fom;
    const latestTom: Date = perioder.reduce((latest, current) => {
        if (dayjs(current.tom).isAfter(latest.tom)) {
            return current;
        }
        return latest;
    }).tom;

    return `${dayjs(earliestFom).format('DD. MMMM YYYY')} - ${dayjs(latestTom).format('DD. MMMM YYYY')}`;
};

export const tilLesbarPeriodeMedArstall = (fom: Date, tom: Date): string => {
    const erSammeAar = fom.getFullYear() === tom.getFullYear();
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeAar && erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
        ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarDatoMedArstall = (datoArg?: Date) => {
    if (!datoArg) {
        return undefined;
    }
    return `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(datoArg).getFullYear()}`;
};

export const tilLesbarPeriodeUtenArstall = (fomArg: string, tomArg: string): string => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`;
};

export const tilLesbarDatoUtenAarstall = (datoArg: Date) => {
    if (datoArg) {
        const dato = new Date(datoArg);
        const dag = dato.getDate();
        const manedIndex = dato.getMonth();
        const maned = maaneder[manedIndex];
        return `${dag}. ${maned}`;
    }
    return null;
};

// TODO: Inaccurate, returns wrong number of days.
export function hentDagerMellomDatoer(fra: Date, til: Date) {
    const f = dayjs(fra);
    const t = dayjs(til);

    const diff = t.diff(f, 'day');

    if (diff === 0) {
        return 1;
    }

    if (diff === 1) {
        return 2;
    }

    // +2 for å inkludere til og fra-datoen
    return diff + 2;
}