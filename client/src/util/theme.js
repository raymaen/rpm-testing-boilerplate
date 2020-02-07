/* tslint:disable */
import { createMuiTheme } from '@material-ui/core/styles';

const spacing = 8;

export const colors = {
  blue: {
    1: '#151965',
    2: '#32407b',
    3: '#515585',
    4: '#6abf6a',
    5: '#46b5d1',
    6: '#dff6f0'
  },

  grey: {
    1: 'rgba(146,162,181,1)',
    2: 'rgba(146,162,181,0.75)',
    3: 'rgba(146,162,181,0.50)',
    4: 'rgba(146,162,181,0.25)'
  },

  black: '#000000',
  white: '#ffffff',

  complimentary: {
    amber: '#FFAD28',
    blue: '#2A68B8',
    orange: '#FD5E00',
    purple: '#B532C3',
    red: '#b71d31'
  },

  neoteric: {
    blueAlpha: '#1DB790',
    blueBravo: '#89C657',
    greyDark: '#2A323C',
    greyMid: '#778088',
    grey125: '#F1F3F5'
  }
};

export default createMuiTheme({
  breakpoints: {
    values: {
      lg: 1280,
      md: 960,
      sm: 600,
      xl: 1600,
      xs: 0
    }
  },

  palette: {
    error: {
      contrastText: colors.white,
      main: colors.complimentary.red
    },
    primary: {
      contrastText: colors.white,
      main: colors.blue[2]
    },
    secondary: {
      contrastText: colors.black,
      main: colors.grey[1]
    },
    default: {
      contrastText: colors.black,
      main: colors.grey[1]
    },
    background: {
      default: '#fff'
    },
    type: 'light'
  },

  spacing,

  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif'
    },
    h2: {
      fontFamily: 'Nunito, sans-serif'
    },
    h3: {
      fontFamily: 'Nunito, sans-serif'
    },
    h4: {
      fontSize: '1.75rem',
      fontFamily: 'Nunito, sans-serif',
      color: '#1db790',
      fontWeight: 200
    },
    h5: {
      fontFamily: 'Nunito, sans-serif'
    },
    h6: {
      fontFamily: 'Nunito, sans-serif'
    },
    overline: {
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: 1.5,
      textTransform: 'uppercase'
    }
  }
});

/**
 * 	overrides: {
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: 'rgba(51,51,51, 0.87)',
				color: '#f4f4f4',
			},
		},
		MuiCardHeader: {
			title: {
				color: colors.blue[1],
				fontSize: '1.1rem',
				fontWeight: '500',
				letterSpacing: '-0.04rem',
			},
		},
		MuiChip: {
			root: {
				background: '#eeeeee',
			},
			avatar: {
				marginLeft: 0,
			},
		},
		MuiInputLabel: {
			root: {
				color: '#515151',
			},
			shrink: {
				fontSize: 16,
			},
		},
		MuiPaper: {
			root: {},
		},
		MuiTableRow: {
			root: {
				'&$hover:hover': {
					backgroundColor: '#F9FAFB',
				},
			},
		},
		labels: {
			category: '#515151',
		},
	},
 */
