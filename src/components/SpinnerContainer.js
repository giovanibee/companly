import React from 'react'
import { Box, Grid } from "grommet"
import { SpinBox } from './SpinBox'
import "./styles.css"

export const SpinnerContainer = ({
  idea = '',
  isLoading = false,
}) => {
  return (
    <Grid
      areas={[
        { name: "companyA", start: [0, 0], end: [0, 0] },
        { name: "meets", start: [1, 0], end: [1, 0] },
        { name: "companyB", start: [2, 0], end: [2, 0] },
      ]}
      columns={["auto", "small", "auto"]}
      id="idea-container"
      gap="xxsmall"
      rows={["auto"]}
    >
      <SpinBox
        isLoading={isLoading}
        name="companyA"
        value={idea?.companyA}
      />
      <Box gridArea="meets" id='meets'>
        &ensp;meets&ensp;
      </Box>
      <SpinBox
        isLoading={isLoading}
        name="companyB"
        value={idea?.companyB}
      />
    </Grid>
  )
}