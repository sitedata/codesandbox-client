import { graphql } from 'gatsby';
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/layout';
import PageContainer from '../components/PageContainer';
import TitleAndMetaTags from '../components/TitleAndMetaTags';

import {
  SeoText,
  ContentBlock,
  Title,
  Banner,
  Tweet,
  User,
  Avatar,
  Description,
} from './_feature.elements';
import Button from '../components/Button';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ({
  data: {
    feature: {
      frontmatter: {
        columns,
        bgColor,
        SEOText,
        description,
        coverImage,
        tweetText,
        tweetJob,
        tweetName,
        tweetHandle,
        coverReversed,
        textCenter,
        coverSmaller,
        ctaLink,
        ctaText,
      },
      fields: { title },
      html,
    },
  },
}) => {
  const TweetSide = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: '100%',
        display: 'flex',
      }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      <Tweet reverse={coverReversed}>
        "{tweetText}"
        <User>
          <Avatar
            src={`https://avatars.io/twitter/${tweetHandle}`}
            alt={tweetName}
          />
          <div>
            <p>{tweetName}</p>
            <p>{tweetJob}</p>
          </div>
        </User>
      </Tweet>
    </motion.div>
  );

  const ImageSide = () => (
    <motion.div
      initial={{ opacity: 0, y: 140 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      <img src={coverImage.publicURL} alt={title} />
    </motion.div>
  );
  return (
    <Layout>
      <TitleAndMetaTags title={`${title} - CodeSandbox`} />
      <PageContainer width={1086}>
        <TitleWrapper>
          <Title textCenter={textCenter}>{title}</Title>
          {ctaLink && ctaText ? (
            <Button target="_blank" href={ctaLink}>
              {ctaText}
            </Button>
          ) : null}
        </TitleWrapper>
        <Description seoText={SEOText}>{description}</Description>
        {SEOText ? <SeoText>{SEOText}</SeoText> : null}
        <Banner
          coverSmaller={coverSmaller}
          color={bgColor}
          reverse={coverReversed}
        >
          {coverReversed ? (
            <>
              <ImageSide />
              <TweetSide />
            </>
          ) : (
            <>
              <TweetSide />
              <ImageSide />
            </>
          )}
        </Banner>

        <ContentBlock
          columns={columns}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </PageContainer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Feature($id: String) {
    feature: markdownRemark(id: { eq: $id }) {
      frontmatter {
        columns
        bgColor
        SEOText
        description
        tweetText
        tweetJob
        ctaText
        ctaLink
        tweetName
        tweetHandle
        coverReversed
        textCenter
        coverSmaller
        coverImage {
          publicURL
        }
      }
      fields {
        title
      }
      html
    }
  }
`;