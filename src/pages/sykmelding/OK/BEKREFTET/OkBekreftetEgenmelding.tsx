import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import DateFormatter from '../../../../utils/DateFormatter';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

interface OkBekreftetEgenmeldingProps {
    sykmelding: Sykmelding;
}

const OkBekreftetEgenmelding: React.FC<OkBekreftetEgenmeldingProps> = ({ sykmelding }) => {
    return (
        <div className="sykmelding-container">
            <AlertStripeSuksess style={{ marginBottom: '2rem' }}>
                <Systemtittel tag="h2">Egenmeldingen er sendt til NAV</Systemtittel>
                <Normaltekst>
                    Dato sendt:{' '}
                    {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                </Normaltekst>
            </AlertStripeSuksess>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysnigner"
                title="Opplysninger fra egenmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkBekreftetEgenmelding;