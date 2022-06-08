import { MedisinskVurdering } from '../../../../models/Sykmelding/MedisinskVurdering';
import { toReadableDate } from '../../../../utils/dateUtils';
import JaEntry from '../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

import styles from './MedisinskVurderingView.module.css';

interface MedisinskVurderingViewProps {
    medisinskVurdering?: MedisinskVurdering | null;
    arbeidsgiver: boolean;
}

const MedisinskVurderingView = ({
    medisinskVurdering,
    arbeidsgiver,
}: MedisinskVurderingViewProps): JSX.Element | null => {
    if (!medisinskVurdering) {
        return null;
    }

    if (arbeidsgiver) {
        if (!medisinskVurdering.hovedDiagnose && medisinskVurdering.biDiagnoser.length === 0) {
            return null;
        }

        return (
            <div className={styles.medisinskVurderingView}>
                {!!medisinskVurdering.hovedDiagnose?.tekst && (
                    <SykmeldingEntry title="Diagnose" mainText={medisinskVurdering?.hovedDiagnose?.tekst} sladd />
                )}
                {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} sladd />;
                    }
                    return null;
                })}
            </div>
        );
    }

    return (
        <div className={styles.medisinskVurderingView}>
            {!!medisinskVurdering.hovedDiagnose?.tekst && (
                <SykmeldingEntry title="Diagnose" mainText={medisinskVurdering?.hovedDiagnose?.tekst} />
            )}
            {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                if (bidiagnose.tekst) {
                    return <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} />;
                }
                return null;
            })}
            <div>
                {!!(
                    medisinskVurdering.annenFraversArsak?.grunn &&
                    medisinskVurdering.annenFraversArsak?.grunn.length > 0
                ) && (
                    <SykmeldingEntry
                        title="Annen lovfestet fraværsgrunn"
                        mainText={medisinskVurdering.annenFraversArsak.grunn.join(', ')}
                    />
                )}
                {!!medisinskVurdering.annenFraversArsak?.beskrivelse && (
                    <SykmeldingEntry
                        title="Beskrivelse av fraværsgrunn"
                        mainText={medisinskVurdering.annenFraversArsak.beskrivelse}
                        small
                    />
                )}
                {medisinskVurdering.svangerskap && <JaEntry title="Er sykdommen svangerskapsrelatert?" />}
                {medisinskVurdering.yrkesskade && <JaEntry title="Kan sykdommen skyldes en yrkesskade/yrkessykdom?" />}
                {!!medisinskVurdering.yrkesskadeDato && (
                    <SykmeldingEntry
                        title="Skadedato"
                        mainText={toReadableDate(medisinskVurdering.yrkesskadeDato)}
                        borderTop
                    />
                )}
            </div>
        </div>
    );
};

export default MedisinskVurderingView;