import { ComponentMeta, ComponentStory } from '@storybook/react';
import { themeDecorator } from 'shared/config/decorators/themeDecorator';
import { Theme } from 'app/providers/theme';
import withMock from 'storybook-addon-mock';
import { Article, ArticleType } from 'entities/article';
import { storeDecorator } from 'shared/config/decorators/storeDecorator';
import { ArticleRecommendationsList, ArticleRecommendationsListProps } from './articleRecommendationsList';

const article: Article = {
    id: '1',
    img: '',
    createdAt: '',
    views: 123,
    user: { id: '1', username: '123' },
    blocks: [],
    type: ArticleType.IT,
    title: '123',
    subtitle: 'asfsa',
};

export default {
    title: 'features/recommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        withMock,
        storeDecorator({}),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_limit=3`,
                method: 'GET',
                status: 200,
                response: [
                    { ...article },
                    { ...article, id: '2' },
                    { ...article, id: '3' },
                ],
            },
        ],
    },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args: ArticleRecommendationsListProps) => (
    <ArticleRecommendationsList {...args} />
);

export const Light = Template.bind({});
Light.args = {
    className: '',
};

export const Dark = Template.bind({});
Dark.args = {
    className: '',
};

Dark.decorators = [
    themeDecorator(Theme.DARK),
];