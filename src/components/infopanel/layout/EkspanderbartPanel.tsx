import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import doktor from '../../../svg/doktor.svg';

import './ekspanderbartpanel.less';

interface PanelHeadingProps {
    tittel: string;
}

const PanelHeading = ({ tittel }: PanelHeadingProps) => {
    return (
        <div className="ekspanderbartpanel-heading">
            <img className="ekspanderbartpanel-ikon" alt="doktor ikon" src={doktor} />
            <span>
                <strong className="ekspanderbartpanel-tekst">{tittel}</strong>
            </span>
        </div>
    );
};

interface EkspanderbartpanelProps {
    tittel: string;
    children: any | any[];
}

const Ekspanderbartpanel = ({ tittel, children }: EkspanderbartpanelProps) => {
    return (
        <div className="ekspanderbart-panel">
            <EkspanderbartpanelBase heading={<PanelHeading tittel={tittel} />} border>
                {children}
            </EkspanderbartpanelBase>
        </div>
    );
};

export default Ekspanderbartpanel;