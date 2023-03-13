import styled from "styled-components";

export const ThemeButtonContainer = styled.button<{ isDark: boolean }>`
  all: unset;
  width: 40px;
  padding: 5px 10px;
  right: 10px;
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: ${(props) => props.theme.color};
  border-radius: 13px;
  cursor: pointer;

  > div {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 50%;
    top: 3px;
    right: 5px;
    transform: translateX(${(props) => (props.isDark ? "-30px" : "0px")});
    transition: transform 0.5s;
  }
`;
