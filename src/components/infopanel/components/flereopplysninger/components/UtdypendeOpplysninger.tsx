import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { SporsmalSvar } from '../../../../../types/sykmeldingTypes';

import tekster from '../flereopplysninger-tekster';

import OpplysningerSeksjon from './OpplysningerSeksjon';
import Margin from '../../Margin';
import ElementMedTekst from './ElementMedTekst';

interface OpplysningsGruppeProps {
    opplysningGruppe: Map<string, SporsmalSvar>;
}

const OpplysningsGruppe = ({ opplysningGruppe }: OpplysningsGruppeProps) => {
    const sporsmal = Array.from(opplysningGruppe).map(([key, sporsmalSvar]) => (
        <ElementMedTekst key={key} tittel={sporsmalSvar.sporsmal} tekst={sporsmalSvar.svar} margin />
    ));
    return <>{sporsmal}</>;
};

interface UtdypendeOpplysningerProps {
    opplysninger: Map<string, Map<string, SporsmalSvar>>;
}

const UtdypendeOpplysninger = ({ opplysninger }: UtdypendeOpplysningerProps) => {
    // TODO: legg til logikk for visning av seksjon
    /*
    const visSeksjon = sykmelding.utdypendeOpplysninger.sykehistorie ||
        sykmelding.utdypendeOpplysninger.paavirkningArbeidsevne ||
        sykmelding.utdypendeOpplysninger.resultatAvBehandling ||
        sykmelding.utdypendeOpplysninger.henvisningUtredningBehandling;
    */

    const opplysningGrupper = Array.from(opplysninger).map(([key, opplysningGruppe]) => (
        <Margin>
            <OpplysningsGruppe key={key} opplysningGruppe={opplysningGruppe} />
        </Margin>
    ));

    return <OpplysningerSeksjon tittel={tekster['utdypende.tittel']}>{opplysningGrupper}</OpplysningerSeksjon>;
};

export default UtdypendeOpplysninger;
