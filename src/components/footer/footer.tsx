import styled from 'styled-components';

export default function Footer() {
    return (
      <FooterContainer>
        <div>
          <ContentContainer>
            <a>
              <TitleBox>Joungwon_Kim Page</TitleBox>
            </a>
          </ContentContainer>
        </div>
      </FooterContainer>
    );
  }

const FooterContainer = styled.footer`
  background-color: #f8f8f8;
`;

const ContentContainer = styled.div`
  padding: 24px 0;
  text-align: center;
`;

const TitleBox = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`; 