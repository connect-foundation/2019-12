import React from 'react';

import * as S from './style';

interface Props {
  /** steps string array */
  steps: string[];
  /** pivot step */
  pivot: number;
}

function StepList({ steps, pivot }: Props): React.ReactElement {
  return (
    <S.Container>
      {steps.map((step, index, arr) => (
        <React.Fragment key={index}>
          <S.Step
            highlight={index <= pivot - 1}
            data-testid={'steplist-step'}
          >{`${index + 1}. ${step}`}</S.Step>
          {index < arr.length - 1 && (
            <S.StepArrow
              highlight={index + 1 <= pivot - 1}
              data-testid={'steplist-step-arrow'}
            >
              &gt;
            </S.StepArrow>
          )}
        </React.Fragment>
      ))}
    </S.Container>
  );
}

export default StepList;
