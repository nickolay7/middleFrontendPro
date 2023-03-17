import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/helpers/classNames';
import { ArticleDetails } from 'entities/article';
import { Text } from 'shared/ui/text';
import { CommentList } from 'entities/comment';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useAppDispatch, useAppSelector } from 'app/providers/storeProvider';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { commentsReducer, commentsSelector } from '../model/slice/articledetailsCommentsSlice';
import cls from './articleDetailsPage.module.scss';
import {
    getArticleCommentsStateSelector,
} from '../model/selectors/getArticleCommentsStateSelector/getArticleCommentsStateSelector';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers = {
    articleDetailsComments: commentsReducer,
};
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams();
    const { t } = useTranslation('articles');
    useDynamicModuleLoader(reducers, true);
    const comments = useAppSelector(commentsSelector.selectAll);
    const commentsState = useAppSelector(getArticleCommentsStateSelector);
    const dispatch = useAppDispatch();

    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

    if (!id) {
        return <Text title={t('Статья не найдена')} />;
    }

    return (
        <div className={classNames(cls.articleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
            <Text className={cls.commentTitle} title={t('Комментарии')} />
            <CommentList comments={comments} isLoading={commentsState?.isLoading} />
        </div>
    );
};

export default ArticleDetailsPage;
