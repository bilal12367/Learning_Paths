
interface ThemeState {
    colors: {
        b1: string
        b2: string
        b3: string
        b4: string
        g1: string
        g2: string
        primary: string
        secondary: string
        accent: string
        text: string
        textSecondary: string
        borderPrimary: string
        borderSecondary: string
        error: string
        success: string
        warning: string
        info: string,
        grad1: string[]
    }
    typography: {
        f1: string
        f2: string
        fontSize: string
        fontWeight: {
            light: number
            regular: number
            medium: number
            bold: number
        }
        heading: {
            h1: string
            h2: string
            h3: string
            h4: string
            h5: string
            h6: string
        }
        body: {
            large: string
            medium: string
            small: string
        }
    },

    shadows: {
        light: string
        medium: string
        heavy: string
    },
    padding: {
        std: string
    },
    transition: {
        std: string
    }
}


const PrimaryTheme: ThemeState = {
    colors: {
        b1: '#424549',
        b2: '#36393E',
        b3: '#282B30',
        b4: '#1E2124',
        g1: '#E7E7E7',
        g2: '#c7c7c7',
        primary: '#7289DA',
        secondary: '#F8325C',
        accent: '#E7ECFF',
        text: 'string',
        textSecondary: 'string',
        borderPrimary: 'string',
        borderSecondary: 'string',
        error: '#C6595B',
        success: '#3DE78A',
        warning: '#F0AE1F',
        info: '#2380EA',
        grad1: ['var(--accent)', '#FFFFFF']

    },
    typography: {
        f1: "gg-sans",
        f2: "'Roboto', sans-serif",
        fontSize: '16px',
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            bold: 800
        },
        heading: {
            h1: '2.5rem',
            h2: '2rem',
            h3: '1.75rem',
            h4: '1.5rem',
            h5: '1.25rem',
            h6: '1rem',
        },
        body: {
            large: '1.125rem',
            medium: '1rem',
            small: '0.875rem',
        }
    },
    shadows: {
        light: '0 1px 3px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.14)',
        heavy: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
    padding: {
        std: '0.75rem 2.5rem'
    },
    transition: {
        std: 'all 0.4s ease-in-out'
    }
}

export const getGrad = (gradArr: string[], deg: number = 0) => {
    return `linear-gradient(${deg.toString()}deg,${gradArr.join(',')})`
}

const setTheme = (theme: ThemeState) => {

}

const Themes = { PrimaryTheme }


export default Themes