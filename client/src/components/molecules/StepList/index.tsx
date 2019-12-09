import React from 'react';

import * as S from './style';

interface Props {
  /** steps string array */
  steps: string[];
  /** pivot step */
  pivot: number;
}

const makeSteps = (steps: string[], pivot: number) => {
  return steps.map((step, index, arr) => (
    <>
      <S.Step highlight={index <= pivot}>{step}</S.Step>
      {index < arr.length - 1 && (
        <S.StepArrow highlight={index + 1 <= pivot}>&lt;</S.StepArrow>
      )}
    </>
  ));
};

function StepList({ steps, pivot }: Props): React.ReactElement {
  return <S.Container>{makeSteps(steps, pivot - 1)}</S.Container>;
}

export default StepList;
