import {
    memo, MutableRefObject, ReactNode, UIEventHandler, useRef,
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames';
import { useLocation } from 'react-router-dom';
import { useInfiniteScroll, useInitialEffect } from 'shared/lib/hooks';
import { StateSchema, useAppDispatch, useAppSelector } from 'app/providers/storeProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import { setScrollPosition } from '../model/slice/scrollPositionSlice';

import cls from './page.module.scss';
import { scrollByPathSelector } from '../model/selectors/scrollSelectors/scrollSelectors';

export interface PageProps {
  className?: string;
  children: ReactNode;
  onLoadNextPart?: () => void;
}
export const Page = memo(({ className, children, onLoadNextPart }: PageProps) => {
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const position = useAppSelector((state: StateSchema) => scrollByPathSelector(state, pathname));

    // @ts-ignore
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = position;
    });

    useInfiniteScroll({ callback: onLoadNextPart, triggerRef, wrapperRef });

    const onScroll: UIEventHandler<HTMLDivElement> = useThrottle((e) => {
        dispatch(setScrollPosition({
            path: pathname,
            position: e.currentTarget.scrollTop,
        }));
    }, 500);

    return (
        <section onScroll={onScroll} ref={wrapperRef} className={classNames(cls.page, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
