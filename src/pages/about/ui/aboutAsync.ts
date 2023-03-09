import { lazy } from 'react';

export const AboutAsync = lazy(() => new Promise((resolve) => {
    setTimeout(() => {
        // @ts-ignore
        resolve(import('./about'));
    }, 1500);
}));