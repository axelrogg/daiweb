import { Appearance, LocalizationResource } from "@clerk/types";
import { esES } from "@clerk/localizations";

const localization = {
    ...esES,
    socialButtonsBlockButton: "Continúa con {{provider|titleize}}",
    signIn: {
        ...esES.signIn,
        start: {
            ...esES.signIn?.start,
            title: "Hola de nuevo",
            subtitle: "Para entrar en la DAI",
            actionLink: "Créala",
            actionText: "¿No tienes una cuenta?",
        },
    },
    signUp: {
        ...esES.signUp,
        start: {
            ...esES.signUp?.start,
            subtitle: "Para empezar con la DAI",
            actionLink: "Entra",
        },
    },
} satisfies LocalizationResource;

const appeareance = {
    elements: {
        //footer: "hidden",
    },
} satisfies Appearance;

const clerkConfig = {
    appeareance: appeareance,
    localization: localization,
};

export default clerkConfig;
