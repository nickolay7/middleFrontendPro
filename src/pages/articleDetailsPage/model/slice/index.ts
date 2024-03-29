import { combineReducers } from '@reduxjs/toolkit';
import { commentsReducer } from '@/features/articleDetailsComments';
import { recommendationsReducer } from './articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducers =
    combineReducers<ArticleDetailsPageSchema>({
        articleDetailsComments: commentsReducer,
        articleDetailsRecommends: recommendationsReducer,
    });
