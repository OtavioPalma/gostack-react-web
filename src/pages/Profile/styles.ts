import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  background: #28262e;
  height: 144px;

  display: flex;
  align-items: center;

  svg {
    color: #999591;
  }

  div {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
  }
`;

export const Avatar = styled.div`
  position: relative;

  width: 186px;

  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ff9000;
    color: #312e38;

    cursor: pointer;

    position: absolute;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;
  margin: -170px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    display: flex;
    flex-direction: column;

    h1 {
      margin: 32px 0 24px;
      font-size: 20px;
      text-align: left;
    }

    div:nth-of-type(4) {
      margin-top: 24px;
    }
  }
`;
