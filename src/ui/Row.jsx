import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${({ type }) => {
    switch (type) {
      case "horizontal":
        return css`
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `;
      case "vertical":
        return css`
          flex-direction: column;
          gap: 1.6rem;
        `;
    }
  }}
`;
Row.defaultProps = {
  type: "vertical",
};
export default Row;
