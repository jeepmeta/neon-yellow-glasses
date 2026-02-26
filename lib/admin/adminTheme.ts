// lib/admin/adminTheme.ts

export type AdminTheme = {
  logo: string;
  colors: {
    primary: string;
    accent: string;
    bg: string;
  };
  flair?: string;
};

export const DAO_THEMES: Record<string, AdminTheme> = {
  The789: {
    logo: '/dao/the789-logo.svg',
    colors: {
      primary: '#F5FF3B',
      accent: '#00F0FF',
      bg: '#050509',
    },
    flair: 'Cinematic grids and neon energy.',
  },
  OTFMedia: {
    logo: '/dao/otf-logo.svg',
    colors: {
      primary: '#E0D7FF',
      accent: '#A855F7',
      bg: '#050314',
    },
    flair: 'Cyberpunk broadcast control.',
  },
  TypeMedia: {
    logo: '/dao/type-logo.svg',
    colors: {
      primary: '#F5F5F5',
      accent: '#111827',
      bg: '#0B0B0B',
    },
    flair: 'Sharp type and clean grids.',
  },
  CryptoSpacesNetwork: {
    logo: '/dao/csn-logo.svg',
    colors: {
      primary: '#E5F2FF',
      accent: '#38BDF8',
      bg: '#020617',
    },
    flair: 'Signal in the noise.',
  },
};

export function getDAOTheme(dao: string): AdminTheme {
  return (
    DAO_THEMES[dao] || {
      logo: '/dao/default-logo.svg',
      colors: {
        primary: '#FFFFFF',
        accent: '#22C55E',
        bg: '#020617',
      },
      flair: 'Admin control.',
    }
  );
}
