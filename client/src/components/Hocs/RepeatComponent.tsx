import { JSXElementConstructor, ReactElement, cloneElement } from "react";

interface RepeatComponentProps {
  /**
   * 컴포넌트 반복횟수
   */
  count: number;
  /**
   * 반복 할 컴포넌트 (Children 형태로 감싸서 사용)
   */
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

const RepeatComponent = ({ count, children }: RepeatComponentProps) => {
  const repeatedComponents = [];

  for (let i = 0; i < count; i++) {
    repeatedComponents.push(cloneElement(children, { key: i }));
  }

  return <>{repeatedComponents}</>;
};
export default RepeatComponent;
