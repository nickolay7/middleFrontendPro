import {
    memo,
    MutableRefObject,
    ReactNode,
    UIEventHandler,
    useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from '../../../lib/helpers/classNames';
import { useInfiniteScroll } from '../../../lib/hooks/useInfiniteScroll';
import { useInitialEffect } from '../../../lib/hooks/useInitialEffect';
import {
    useAppDispatch,
    useAppSelector,
} from '@/app/providers/storeProvider/config/hooks';
import { StateSchema } from '@/app/providers/storeProvider/config/stateSchema';
import { useThrottle } from '../../../lib/hooks/useThrottle';
import { setScrollPosition } from '../model/slice/scrollPositionSlice';
import { scrollByPathSelector } from '../model/selectors/scrollSelectors/scrollSelectors';
import { TestId } from '../../../types/tests';

import cls from './page.module.scss';

export interface PageProps extends TestId {
    className?: string;
    children: ReactNode;
    onLoadNextPart?: () => void;
}

export const Page = memo(
    ({ className, children, onLoadNextPart, ...otherProps }: PageProps) => {
        const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
        const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
        const { pathname } = useLocation();
        const dispatch = useAppDispatch();
        const position = useAppSelector((state: StateSchema) =>
            scrollByPathSelector(state, pathname),
        );

        useInitialEffect(() => {
            wrapperRef.current.scrollTop = position;
        });

        useInfiniteScroll({ callback: onLoadNextPart, triggerRef, wrapperRef });

        const onScroll: UIEventHandler<HTMLDivElement> = useThrottle((e) => {
            dispatch(
                setScrollPosition({
                    path: pathname,
                    position: e.currentTarget.scrollTop,
                }),
            );
        }, 500);

        return (
            <section
                data-testid={otherProps['data-testid'] ?? 'page'}
                onScroll={onScroll}
                ref={wrapperRef}
                className={classNames(cls.page, {}, [className])}
            >
                {children}
                <div ref={triggerRef} />
            </section>
        );
    },
);
