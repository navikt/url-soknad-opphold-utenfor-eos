import nock from 'nock';
import { sykmeldingApen } from '../../../mock/data/sykmelding-apen';
import { render, screen, waitFor, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import { createMemoryHistory } from 'history';
import SykmeldingPage from '../SykmeldingPage';
import userEvent from '@testing-library/user-event';

describe('Annet', () => {
    const apiNock = nock('http://localhost');

    const renderOptions = {
        initialRouterEntries: [`/syk/sykmeldinger/${sykmeldingApen().id}`],
        renderPath: '/syk/sykmeldinger/:sykmeldingId',
    };

    beforeEach(() => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });
    });

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        expect(screen.getByRole('article', { name: 'Din sykmelding' }));
    });

    it('should be able to submit form with work situation annet', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
        apiNock
            .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                erOpplysningeneRiktige: {
                    svar: 'JA',
                    sporsmaltekst: 'Er opplysningene riktige?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                arbeidssituasjon: {
                    svar: 'ANNET',
                    sporsmaltekst: 'Jeg er sykmeldt som',
                    svartekster:
                        '{"ARBEIDSTAKER":"arbeidstaker","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                },
            })
            .reply(200);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, {
            ...sykmeldingApen(),
            sykmeldingStatus: {
                ...sykmeldingApen().sykmeldingStatus,
                statusEvent: 'BEKREFTET',
                timestamp: '2020-01-01',
            },
        });
        const history = createMemoryHistory({
            initialEntries: renderOptions.initialRouterEntries,
        });

        render(<SykmeldingPage />, { ...renderOptions, history });

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'annet' }));
        userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

        await waitFor(() =>
            expect(history.location.pathname).toBe(`/syk/sykmeldinger/${sykmeldingApen().id}/kvittering`),
        );
    });
});