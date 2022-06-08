import { AktivitetIkkeMuligPeriode } from '../../../../models/Sykmelding/Periode';
import ListEntry from '../Layout/ListEntry/ListEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

import styles from './AktivitetIkkeMuligView.module.css';

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode;
    arbeidsgiver: boolean;
}

const AktivitetIkkeMuligView = ({
    aktivitetIkkeMulig,
    arbeidsgiver,
}: AktivitetIkkeMuligViewProps): JSX.Element | null => {
    if (!aktivitetIkkeMulig.medisinskArsak && !aktivitetIkkeMulig.arbeidsrelatertArsak) {
        return null;
    }

    if (arbeidsgiver && !aktivitetIkkeMulig.arbeidsrelatertArsak) {
        return null;
    }

    return (
        <div className={styles.aktivitetIkkeMulig}>
            {!arbeidsgiver && !!aktivitetIkkeMulig.medisinskArsak && (
                <div className={styles.aarsak}>
                    {aktivitetIkkeMulig.medisinskArsak?.arsak && (
                        <ListEntry
                            listTitle="Medisinske årsaker hindrer arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.medisinskArsak.arsak}
                        />
                    )}
                    {aktivitetIkkeMulig.medisinskArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            mainText={aktivitetIkkeMulig.medisinskArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
            {!!aktivitetIkkeMulig.arbeidsrelatertArsak && (
                <div className={styles.aarsak}>
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak && (
                        <ListEntry
                            listTitle="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak}
                        />
                    )}
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            mainText={aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AktivitetIkkeMuligView;