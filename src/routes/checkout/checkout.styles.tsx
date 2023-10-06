import { styled } from "styled-components";

export const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  .total {
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
  }

  @media screen and (max-width: 800px) {
    min-height: unset;
    margin: 0;
    width: 100%;

    .total {
      font-size: 24px;
    }
  }
`;

export const CheckoutHeaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;

  .header-block {
    text-transform: capitalize;
    width: 23%;

    &:last-child {
      width: 8%;
    }
  }

  @media screen and (max-width: 800px) {
    .header-block {
      font-size: 14px;
      width: unset;

      &:last-child {
        width: 15%;
      }
    }
  }
`;
