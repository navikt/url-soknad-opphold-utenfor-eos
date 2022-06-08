import React, { PropsWithChildren } from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Head from 'next/head';

import Spinner from '../../components/Spinner/Spinner';
import useSykmelding from '../../hooks/useSykmelding';
import VeilederMaleSvg from '../../components/Veileder/svg/VeilederMaleSvg';
import { logger } from '../../utils/logger';
import { getReadableSykmeldingLength, getSykmeldingTitle, Sykmelding } from '../../models/Sykmelding/Sykmelding';
import useFindOlderSykmeldingId from '../../hooks/useFindOlderSykmeldingId';
import OkBekreftetSykmelding from '../../components/SykmeldingViews/OK/BEKREFTET/OkBekreftetSykmelding';
import OkAvbruttSykmelding from '../../components/SykmeldingViews/OK/AVBRUTT/OkAvbruttSykmelding';
import OkSendtSykmelding from '../../components/SykmeldingViews/OK/SENDT/OkSendtSykmelding';
import OkUtgattSykmelding from '../../components/SykmeldingViews/OK/UTGATT/OkUtgattSykmelding';
import OkApenSykmelding from '../../components/SykmeldingViews/OK/APEN/OkApenSykmelding';
import InvalidApenSykmelding from '../../components/SykmeldingViews/INVALID/APEN/InvalidApenSykmelding';
import InvalidBekreftetSykmelding from '../../components/SykmeldingViews/INVALID/BEKREFTET/InvalidBekreftetSykmelding';
import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam';
import Header from '../../components/Header/Header';
import Brodsmuler from '../../components/Breadcrumbs/Breadcrumbs';
import Spacing from '../../components/Spacing/Spacing';
import TilHovedsiden from '../../components/TilHovedsiden/TilHovedsiden';
import { withAuthenticatedPage } from '../../auth/withAuthentication';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

function SykmeldingPage(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam();

    const { isLoading, isFetching, error, data: sykmelding } = useSykmelding(sykmeldingId);
    const olderSykmelding = useFindOlderSykmeldingId(sykmelding);

    if (isLoading || isFetching || olderSykmelding.isLoading) {
        return (
            <Spacing>
                <Spinner headline="Henter sykmelding" />
            </Spacing>
        );
    }

    if (error || olderSykmelding.error) {
        return (
            <SykmeldingerWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    {error?.message ?? olderSykmelding.error?.message}
                </AlertStripeAdvarsel>
            </SykmeldingerWrapper>
        );
    }

    if (sykmelding === undefined) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`);
        return (
            <SykmeldingerWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </AlertStripeAdvarsel>
            </SykmeldingerWrapper>
        );
    }
    return (
        <SykmeldingerWrapper sykmelding={sykmelding}>
            <SykmeldingComponent sykmelding={sykmelding} olderSykmeldingId={olderSykmelding.earliestSykmeldingId} />
        </SykmeldingerWrapper>
    );
}

const SykmeldingComponent = ({
    sykmelding,
    olderSykmeldingId,
}: {
    sykmelding: Sykmelding;
    olderSykmeldingId: string | null;
}): JSX.Element | null => {
    const behandlingsutfall = sykmelding.behandlingsutfall.status;
    const status = sykmelding.sykmeldingStatus.statusEvent;

    switch (behandlingsutfall) {
        case 'OK':
        case 'MANUAL_PROCESSING':
            switch (status) {
                case 'APEN':
                    return <OkApenSykmelding sykmelding={sykmelding} olderSykmeldingId={olderSykmeldingId} />;
                case 'BEKREFTET':
                    return <OkBekreftetSykmelding sykmelding={sykmelding} />;
                case 'SENDT':
                    return <OkSendtSykmelding sykmelding={sykmelding} />;
                case 'AVBRUTT':
                    return <OkAvbruttSykmelding sykmelding={sykmelding} />;
                case 'UTGATT':
                    return <OkUtgattSykmelding sykmelding={sykmelding} />;
                default:
                    logger.error(`${behandlingsutfall} sykmelding with unsupported status: ${status}`);
                    return (
                        <Veilederpanel svg={<VeilederMaleSvg />}>
                            Oisann! Det har oppstått en feil i baksystemene.
                        </Veilederpanel>
                    );
            }
        case 'INVALID':
            switch (status) {
                case 'APEN':
                    return <InvalidApenSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    return <InvalidBekreftetSykmelding sykmelding={sykmelding} />;
                default:
                    logger.error(`Avvist sykmelding with unsupported status: ${status}`);
                    return (
                        <Veilederpanel svg={<VeilederMaleSvg />}>
                            Oisann! Det har oppstått en feil i baksystemene.
                        </Veilederpanel>
                    );
            }
    }

    return null;
};

function SykmeldingerWrapper({ sykmelding, children }: PropsWithChildren<{ sykmelding?: Sykmelding }>): JSX.Element {
    return (
        <>
            <Head>
                <title>Sykmelding - www.nav.no</title>
            </Head>
            <Header
                title={sykmelding ? getSykmeldingTitle(sykmelding) : undefined}
                subTitle={sykmelding ? getReadableSykmeldingLength(sykmelding) : undefined}
            />
            <PageWrapper>
                <Brodsmuler
                    breadcrumbs={[
                        { title: 'Sykmeldinger', path: '/' },
                        { title: sykmelding ? getSykmeldingTitle(sykmelding) : 'Sykmelding' },
                    ]}
                />
                {children}
                <Spacing direction="top" amount="large">
                    <TilHovedsiden />
                </Spacing>
            </PageWrapper>
        </>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default SykmeldingPage;