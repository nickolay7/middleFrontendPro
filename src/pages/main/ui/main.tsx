import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/page';
import { VStack } from '@/shared/ui/stack';

import cls from './main.module.scss';

const Main = () => {
    const { t } = useTranslation('main');

    return (
        <Page data-testid="Main" className={cls.main}>
            <VStack gap="gap8" justify="justifyCenter">
                <div>{t('Домашняя страница')}</div>
            </VStack>
        </Page>
    );
};

export default Main;
