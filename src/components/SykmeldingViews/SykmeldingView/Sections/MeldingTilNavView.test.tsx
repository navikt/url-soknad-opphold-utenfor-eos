import { render, screen } from '@testing-library/react';

import { MeldingTilNAVSchema, MeldingTilNAV } from '../../../../models/Sykmelding/MeldingTilNav';

import MeldingTilNavView from './MeldingTilNavView';

describe('MeldingTilNavView', () => {
    it('Renders ønsker bistand if bistandUmiddelbart is true', () => {
        const meldingTilNav: MeldingTilNAV = MeldingTilNAVSchema.parse({
            bistandUmiddelbart: true,
            beskrivBistand: null,
        });
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} arbeidsgiver={false} />);
        expect(screen.getByText('Melding til NAV')).toBeInTheDocument();
        expect(screen.getByText('Ønskes bistand fra NAV nå?')).toBeInTheDocument();
    });

    it('Does not render ønsker bistand if bistandUmiddelbart is false', () => {
        const meldingTilNav: MeldingTilNAV = MeldingTilNAVSchema.parse({
            bistandUmiddelbart: false,
            beskrivBistand: null,
        });
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} arbeidsgiver={false} />);
        expect(() => {
            expect(screen.getByText('Melding til NAV'));
        }).toThrow();
        expect(() => {
            screen.getByText('Ønskes bistand fra NAV nå?');
        }).toThrow();
    });

    it('Renders beskrivelse', () => {
        const meldingTilNav: MeldingTilNAV = MeldingTilNAVSchema.parse({
            bistandUmiddelbart: true,
            beskrivBistand: 'beskrivelse av bistanden',
        });
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} arbeidsgiver={false} />);
        expect(screen.getByText('Nærmere beskrivelse')).toBeInTheDocument();
        expect(screen.getByText('beskrivelse av bistanden')).toBeInTheDocument();
    });

    it('Does not render if arbeidsgiver', () => {
        const meldingTilNav: MeldingTilNAV = MeldingTilNAVSchema.parse({
            bistandUmiddelbart: true,
            beskrivBistand: 'beskrivelse av bistanden',
        });
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} arbeidsgiver />);
        expect(screen.queryByText('Melding til NAV')).not.toBeInTheDocument();
        expect(screen.queryByText('Ønskes bistand fra NAV nå?')).not.toBeInTheDocument();
        expect(screen.queryByText('Nærmere beskrivelse')).not.toBeInTheDocument();
    });

    it('Does not render section if object does not exist', () => {
        render(<MeldingTilNavView arbeidsgiver={false} />);
        expect(screen.queryByText('Melding til NAV')).not.toBeInTheDocument();
        expect(screen.queryByText('Ønskes bistand fra NAV nå?')).not.toBeInTheDocument();
        expect(screen.queryByText('Nærmere beskrivelse')).not.toBeInTheDocument();
    });
});