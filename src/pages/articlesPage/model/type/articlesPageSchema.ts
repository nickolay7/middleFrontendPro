import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/article';

export interface ArticlesPageSchema extends EntityState<Article>{
    isLoading?: boolean,
    error?: string,
    view: ArticleView;
    limit?: number;
    page?: number;
    hasMore?: boolean;
    _init?: boolean;
}
