import React, { FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { classNames } from '@/shared/lib/helpers/classNames';
import { Text } from '@/shared/ui/text';
import { HStack } from '@/shared/ui/stack';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../articleListItem/articleListItem';
import { ArticleListSkeleton } from '../articleListItem/articleListSkeleton';

import cls from './articleList.module.scss';

export interface ArticlesListProps {
    virtualized?: boolean;
    className?: string;
    articles?: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    onLoadNextPart?: () => void;
    Header?: FC<{ className?: string }>;
}

const ArticlesListSkeleton = ({
    isLoading,
    children,
}: {
    isLoading?: boolean;
    children: ReactNode;
}) => {
    if (isLoading) {
        return <div className={cls.skeletons}>{children}</div>;
    }

    return null;
};

export const ArticlesList = memo(
    ({ className, ...otherProps }: ArticlesListProps) => {
        const {
            articles,
            view,
            isLoading,
            onLoadNextPart,
            virtualized,
            Header = () => <div>{}</div>,
        } = otherProps;
        const { t } = useTranslation();

        if (!articles?.length && !isLoading) {
            return <Text title={t('Статьи не найдены')} />;
        }

        if (!virtualized && articles) {
            const renderArticles = articles.map((article: Article) => (
                <ArticleListItem
                    key={article.id}
                    view={view}
                    article={article}
                    className={cls.articleItem}
                />
            ));

            return (
                <HStack
                    gap="gap8"
                    className={classNames(cls.articleList, {}, [className])}
                >
                    {renderArticles}
                </HStack>
            );
        }

        const renderArticle = (index: number, article: Article) => (
            <ArticleListItem
                target="_blank"
                key={article.id}
                view={view}
                article={article}
                className={cls.articleItem}
            />
        );

        const skeletons = new Array(3)
            .fill(0)
            .map(() => <ArticleListSkeleton key={Math.random()} view={view} />);

        return (
            <div
                data-testid="articleList"
                className={classNames(cls.articleList, {}, [className])}
            >
                {/* eslint-disable-next-line no-nested-ternary */}
                {articles ? (
                    view === ArticleView.LIST ? (
                        <Virtuoso
                            style={{
                                height: '100%',
                            }}
                            data={articles}
                            itemContent={renderArticle}
                            endReached={onLoadNextPart}
                            components={{
                                // eslint-disable-next-line react/no-unstable-nested-components
                                Header: () => (
                                    <Header className={cls.articlesFilter} />
                                ), // <ArticlePageFilter className={cls.articlesFilter} />,
                                // eslint-disable-next-line react/no-unstable-nested-components
                                Footer: () => (
                                    <ArticlesListSkeleton isLoading={isLoading}>
                                        {skeletons}
                                    </ArticlesListSkeleton>
                                ),
                            }}
                        />
                    ) : (
                        <VirtuosoGrid
                            data={articles}
                            style={{
                                height: '100%',
                            }}
                            endReached={onLoadNextPart}
                            listClassName={cls.plateItemsWrapper}
                            components={{
                                // eslint-disable-next-line react/no-unstable-nested-components
                                Header: () => (
                                    <Header className={cls.articlesFilter} />
                                ), // <ArticlePageFilter className={cls.articlesFilter} />,
                                // eslint-disable-next-line react/no-unstable-nested-components
                                ScrollSeekPlaceholder: () => (
                                    <ArticleListSkeleton
                                        key={Math.random()}
                                        view={view}
                                    />
                                ),
                            }}
                            itemContent={renderArticle}
                            scrollSeekConfiguration={{
                                enter: (velocity) => Math.abs(velocity) > 200,
                                exit: (velocity) => Math.abs(velocity) < 30,
                            }}
                        />
                    )
                ) : (
                    'list is empty'
                )}
                {isLoading && skeletons}
            </div>
        );
    },
);
