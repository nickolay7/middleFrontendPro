import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames';
import { Text } from 'shared/ui/text';
import { Icon, StrokeColor } from 'shared/ui/icon';
import View from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/card/ui/card';
import { Avatar } from 'shared/ui/avatar';
import { Button } from 'shared/ui/button';
import { useNavigate } from 'react-router-dom';
import { LinkPath } from 'widgets/sideBar/lib/types';
import cls from './articleListItem.module.scss';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../index';
import { ArticleTextComponent } from '../articleTextComponent/articleTextComponent';
import { ArticleListSkeleton } from './articleListSkeleton';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  isLoading?: boolean;
}
export const ArticleListItem = memo(({ className, ...otherProps }: ArticleListItemProps) => {
    const { article, view, isLoading } = otherProps;
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onOpenArticle = () => {
        navigate(LinkPath.ARTICLES + article.id);
    };

    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    if (isLoading) {
        return <ArticleListSkeleton view={ArticleView.LIST} />;
    }

    if (view === ArticleView.PLATE) {
        return (
            <Card onClick={onOpenArticle} className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
                <div className={cls.imgWrapper}>
                    <img src={article.img} className={cls.img} alt={article.title} />
                    <Text text={article.createdAt} className={cls.createdAt} />
                </div>
                <div className={cls.content}>
                    <div className={cls.topicsAndViews}>
                        <Text text={article.type} className={cls.topics} />
                        <div className={cls.countView}>
                            <Text text={String(article.views)} className={cls.views} />
                            <Icon Svg={View} stroke={StrokeColor.PRIMARY} />
                        </div>
                    </div>
                    <div className={cls.title}>
                        <Text text={article.title} />
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className={classNames(cls.articleListItem, {}, [className, cls[view], cls.listView])}>
            <div className={cls.header}>
                <div className={cls.avatar}>
                    <Avatar src={article.user.avatar} size={30} />
                    <Text text={article.user.username} className={cls.createdAt} />
                </div>
                <Text text={article.createdAt} className={cls.createdAt} />
            </div>
            <Text title={article.title} className={cls.title} />
            <Text text={article.type} className={cls.topics} />
            <div className={cls.imgCenter}>
                <img src={article.img} className={cls.img} alt={article.title} />
            </div>
            <div className={cls.text}>
                {textBlock && <ArticleTextComponent block={textBlock} />}
            </div>
            <div className={cls.footer}>
                <Button onClick={onOpenArticle}>{`${t('Читать дальше')}...`}</Button>
                <div className={cls.countView}>
                    <Text text={String(article.views)} className={cls.views} />
                    <Icon Svg={View} stroke={StrokeColor.PRIMARY} />
                </div>
            </div>
        </Card>
    );
});