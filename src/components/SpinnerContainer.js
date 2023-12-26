import React from 'react'
import { Box } from "grommet"
import { SpinBox } from './SpinBox'
import "./styles.css"

export const SpinnerContainer = ({
  idea = '',
  isLoading = false,
}) => {
  return (
    <>
      <SpinBox
        isLoading={isLoading}
        name="companyA"
        value={idea?.companyA}
      />
      <Box gridArea="meets">
        &ensp;meets&ensp;
      </Box>
      <SpinBox
        isLoading={isLoading}
        name="companyB"
        value={idea?.companyB}
      />
    </>
  )
}