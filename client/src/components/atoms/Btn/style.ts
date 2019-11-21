import styled, { css } from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';
import { Link } from 'react-router-dom';

interface BtnStyleProps {
  styletype: string;
}

export const BtnStyle = css<BtnStyleProps>`
  ${theme('fontStyle.button')}
  background-color: ${ifProp('disabled', palette('grayscale', 3), props =>
    palette(props.styletype),
  )};
  flex-shrink: 0;
  flex-grow: '${ifProp('grow', '1', '0')}';
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  width: ${ifProp('fitWidth', 'fit-content', '18rem')};
  color: ${props =>
    props.styletype === 'transparent'
      ? palette('grayscale', 1)
      : palette('white')};
  -webkit-user-drag: none;
  display: inline-block;
  padding: ${ifProp('fitWidth', '0', '1.2rem 2rem')};
  border-radius: 0.3rem;
  border-color: transparent;
  outline: none;
  text-align: center;
  height: 4rem;
  user-select: none;

  &:hover {
    opacity: ${palette('opacityscale', 0)};
  }
`;

export const Anchor = styled.a`
  ${BtnStyle}
`;

export const StyledBtn = styled.button`
  ${BtnStyle}
  line-height: 0;
`;

export const StyledLink = styled(Link)`
  ${BtnStyle}
`;
