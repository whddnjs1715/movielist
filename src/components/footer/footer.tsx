import React from 'react';
import styled from 'styled-components';

export default function Footer() {
    return (
      <FooterContainer>
        <div>
          <ContentContainer>
            <a>
              <Title>Joungwon_Kim Page</Title>
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

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const SocialLinks = styled.span`
  margin-top: 12px;

  a {
    color: #555;
    margin-left: 12px;
  }
`;  