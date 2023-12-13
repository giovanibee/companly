import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import anime from 'animejs';
import {
  Box, Button, Grid, Grommet, Skeleton,
} from 'grommet';
import { companyList } from './misc/company-list';
import { getTitle } from './hooks';

import './styles.css';

type CompanyTuple = [string, string];

function SpinBox({ name = '', value = '', isLoading = false }) {
  return (
    <Box gridArea={name}>
      <div className="company">{isLoading ? '...' : value}</div>
    </Box>
  );
}

export default function App() {
  const [isIdeaLoaded, setIsIdeaLoaded] = useState(false);
  const [idea, setIdea] = useState<CompanyTuple>();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    anime({
      color: '#000',
      easing: 'linear',
      targets: '#loading-header #default-header #initial-header',
    });
  }, [isIdeaLoaded, idea]);

  const ideaText = useMemo(() => {
    if (!idea) return null;

    const [companyA, companyB] = idea;

    return (
      <Grid
        id="idea-container"
        rows={['auto']}
        columns={['auto', 'small', 'auto']}
        gap="xxsmall"
        areas={[
          { name: 'companyA', start: [0, 0], end: [0, 0] },
          { name: 'meets', start: [1, 0], end: [1, 0] },
          { name: 'companyB', start: [2, 0], end: [2, 0] },
        ]}
      >
        <SpinBox name="companyA" isLoading={isLoading} value={companyA} />
        <Box gridArea="meets" id="meets">
          &ensp;meets&ensp;
        </Box>
        <SpinBox name="companyB" isLoading={isLoading} value={companyB} />
      </Grid>
    );
  }, [idea, isLoading]);

  const onGenerate = () => {
    setIsLoading(true);
    const companyAIndex = Math.floor(Math.random() * companyList.length - 1);
    const companyA = companyList[companyAIndex];
    let companyBIndex = Math.floor(Math.random() * companyList.length - 1);
    if (companyBIndex === companyAIndex) {
      companyBIndex++;
      if (companyBIndex === companyList.length - 1) companyBIndex--;
    }
    const companyB = companyList[companyBIndex];
    const tuple = [companyA, companyB];

    anime({
      color: 'red',
      easing: 'linear',
      targets: '.company',
    });

    setIdea(tuple);

    const titleText = 'Companly';
    getTitle();
    setTitle(titleText);

    setTimeout(() => setIsLoading(false), 2800);

    if (!isIdeaLoaded) setIsIdeaLoaded(true);
  };

  const header = useMemo(() => {
    if (!isIdeaLoaded) {
      return <h1 id="initial-header">Random startup idea generator</h1>;
    }

    return isLoading ? (
      <h1 id="loading-header">Drumroll please...</h1>
    ) : (
      <h1 id="default-header">Congrats! Here's your startup</h1>
    );
  }, [isIdeaLoaded, isLoading]);

  return (
    <Grommet>
      <div className="App">
        {header}
        {title && (
          <h1 id="company-title">
            {isLoading ? (
              <Skeleton height="45px" margin="auto" width="medium" />
            ) : (
              'Companly'
            )}
          </h1>
        )}
        {ideaText}
        <Button primary label="Generate!" onClick={onGenerate} />
      </div>
    </Grommet>
  );
}
