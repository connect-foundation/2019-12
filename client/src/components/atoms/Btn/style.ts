import styled, { css } from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';
import { Link } from 'react-router-dom';

interface BtnStyleProps {
  styletype: string;
}

export const BtnStyle = css<BtnStyleProps>`
  ${theme('fontStyle.button')}
  line-height: 1.4rem;
  background-color: ${ifProp('disabled', palette('grayscale', 3), props =>
    palette(props.styletype),
  )};
  flex-shrink: 0;
  flex-grow: ${ifProp('grow', '1', '0')};
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  width: ${ifProp('fit', 'fit-content', '18rem')};
  color: ${props =>
    props.styletype === 'transparent' ||
    props.styletype === 'transparent-border'
      ? palette('grayscale', 2)
      : palette('white')};
  -webkit-user-drag: none;
  display: inline-block;
  padding: 1.2rem 2rem;
  border-radius: 0.3rem;
  border-color: ${props =>
    props.styletype === 'transparent-border'
      ? palette('grayscale', 2)
      : 'transparent'};
  outline: none;
  text-align: center;
  height: ${ifProp('fit', 'auto', '4rem')};
  user-select: none;
  transition: opacity ease 0.2s, background-color ease 0.2s, color ease 0.2s;
  border-style: solid;
  border-width: thin;

  &:hover {
    opacity: ${palette('opacityscale', 0)};
    ${props => {
      if (props.styletype === 'transparent-border') {
        return css`
          background-color: ${palette('grayscale', 2)};
          color: ${palette('grayscale', 6)};
        `;
      }
    }}
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
