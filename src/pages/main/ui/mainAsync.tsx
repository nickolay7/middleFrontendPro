import { lazy } from 'react';

export const MainAsync = lazy(() => new Promise((resolve) => {
    setTimeout(() => {
        // @ts-ignore
        resolve(import('./main'));
    }, 1500);
}));