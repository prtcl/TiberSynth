import React from 'react';
import Layout, { Header, Content, PageControls } from './components/Layout';
import { ROUTES } from '../../config/routes';

const Manual = ({
  next,
  onBack,
  onForward,
  pageContent: { title, content },
  prev,
}) => (
  <Layout>
    <Header
      title={title}
      left={{ label: 'Play', icon: 'back', to: ROUTES.PLAY }}
    />
    <Content>{content}</Content>
    <PageControls
      left={prev ? { label: prev.title, onClick: onBack } : null}
      right={next ? { label: next.title, onClick: onForward } : null}
    />
  </Layout>
);

export default Manual;
