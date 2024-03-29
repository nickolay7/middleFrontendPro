import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/helpers/classNames';
import { Button } from '@/shared/ui/button';
import { useAppSelector } from '@/app/providers/storeProvider';
import { getIsEditable } from '../../model/selectors/getIsEditable/getIsEditable';
import { ElementTheme } from '@/shared/types/ui';

import cls from './headerDetailsPage.module.scss';
import { getArticleEdit, getArticles } from '@/shared/consts/consts';

export interface HeaderDetailsPageProps {
    className?: string;
}
const HeaderDetailsPage = memo(({ className }: HeaderDetailsPageProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id = '' } = useParams();
    const isEditable = useAppSelector(getIsEditable);

    const onBackToList = () => {
        navigate(getArticles());
    };

    const onEditArticle = (id: string) => () => {
        navigate(getArticleEdit(id));
    };

    return (
        <div className={classNames(cls.headerDetailsPage, {}, [className])}>
            <Button onClick={onBackToList} variant={ElementTheme.OUTLINE}>
                {t('Назад к списку')}
            </Button>
            <div className={cls.editButtonsBlock}>
                {isEditable && (
                    <Button
                        onClick={onEditArticle(id)}
                        variant={ElementTheme.OUTLINE}
                    >
                        {t('Редактировать')}
                    </Button>
                )}
            </div>
        </div>
    );
});

export default HeaderDetailsPage;
