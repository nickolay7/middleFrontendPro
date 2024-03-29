import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider';
import { Skeleton } from '@/shared/ui/skeleton';
import { Avatar } from '@/shared/ui/avatar';
import { Text, TextSize } from '@/shared/ui/text';
import Calendar from '@/shared/assets/icons/calendar-20-20.svg';
import Eye from '@/shared/assets/icons/eye-20-20.svg';
import { Icon, StrokeColor } from '@/shared/ui/icon';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { articleDetailsSelector } from '../../model/selectors/articleDetailsSelector';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeComponent } from '../articleCodeComponent/articleCodeComponent';
import { ArticleImageComponent } from '../articleImageComponent/articleImageComponent';
import { ArticleTextComponent } from '../articleTextComponent/articleTextComponent';

import cls from './articleDetails.module.scss';

export interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers = {
    articleDetails: articleDetailsReducer,
};

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeComponent
                    key={block.id}
                    className={cls.block}
                    text={block.code}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
    }
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    useDynamicModuleLoader(reducers, true);
    const dispatch = useAppDispatch();
    const state = useAppSelector(articleDetailsSelector);

    useInitialEffect(() => {
        if (id) dispatch(fetchArticleById(id));
    });

    let content;

    if (state?.isLoading) {
        content = (
            <div className={cls.loader}>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </div>
        );
    } else if (state?.error) {
        content = (
            // eslint-disable-next-line i18next/no-literal-string
            <div>Произошла ошибка при загрузке страницы</div>
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        src={state?.data?.img}
                        className={cls.avatar}
                        size={300}
                    />
                </div>
                <div className={cls.title}>
                    <Text
                        data-testid="ArticleDetails.title"
                        title={state?.data?.title}
                        text={state?.data?.subtitle}
                        className={cls.title}
                        size={TextSize.L_TEXT}
                    />
                </div>
                <div className={cls.views}>
                    <Icon
                        Svg={Eye}
                        stroke={StrokeColor.PRIMARY}
                        className={cls.icon}
                    />
                    <Text text={String(state?.data?.views)} />
                </div>
                <div className={cls.data}>
                    <Icon
                        Svg={Calendar}
                        stroke={StrokeColor.PRIMARY}
                        className={cls.icon}
                    />
                    <Text text={state?.data?.createdAt} className={cls.data} />
                </div>
                {state?.data?.blocks && state.data.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <div
            data-testid="ArticleDetails"
            className={classNames(cls.articleDetails, {}, [className])}
        >
            {content}
        </div>
    );
});
