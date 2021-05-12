import React from 'react';
import { Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import Brodsmuler from '../../commonComponents/Breadcrumbs/Breadcrumbs';
import Header from '../../commonComponents/Header/Header';
import Spacing from '../../commonComponents/Spacing/Spacing';
import TilHovedsiden from '../../commonComponents/TilHovedsiden/TilHovedsiden';

interface SykmeldingPageWrapperProps {
    sykmelding?: Sykmelding;
}
const SykmeldingPageWrapper: React.FC<SykmeldingPageWrapperProps> = ({ children, sykmelding }) => {
    return (
        <>
            <Header title={sykmelding?.getSykmeldingTitle()} sykmelding={sykmelding} />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: window._env_?.SYKEFRAVAER_ROOT || '#',
                        },
                        {
                            title: 'Sykmeldinger',
                            path: window._env_?.SYKMELDINGER_ROOT || '#',
                        },
                        {
                            title: sykmelding?.getSykmeldingTitle() ?? 'Sykmelding',
                        },
                    ]}
                />
                {children}
                <Spacing direction="top" amount="large">
                    <TilHovedsiden />
                </Spacing>
            </div>
        </>
    );
};

export default SykmeldingPageWrapper;
