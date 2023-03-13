import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 70%;
  position: fixed;
  right: 0px;
  color: black;

  h3 {
    color: white;
    text-align: end;
  }

  @media screen and (max-width: 1150px) {
    width: 100%;
    position: static;
  }
`;
