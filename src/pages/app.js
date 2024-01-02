import React from "react"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import anime from "animejs"
import { Box, Grid, Grommet } from "grommet"
import { alphabet, companyList } from "../company-list"
import { SpinnerContainer } from "../components/SpinnerContainer"
import { defaultList, useTitle } from "../hooks"
import "./styles.css"

// https://codesandbox.io/p/sandbox/slot-machine-forked-q7x73w?file=%2Fsrc%2FSlotMachine.jsx%3A20%2C21
export default function App() {
  const { data: { title, companies } = {}, isIdle, isLoading: isSpinning, mutateAsync: getTitle } = useTitle()

  useEffect(() => {
    const initialHeader = document.getElementById("initial-header")
    anime.timeline({
      endDelay: 1000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    }).add({
      targets: initialHeader,
      duration: 1000,
    })
  
    const companyTitle = document.getElementById("company-title")
    anime({
      easing: "easeInOutSine",
      targets: companyTitle,
      translateY: 20,
    });
  }, [])

  useEffect(() => {
    if (!isSpinning) return
    anime({
      easing: "easeInOutSine",
      loop: true,
      targets: document.getElementById("company-title"),
      translateY: 20,
    })
  }, [isSpinning])

  const onGenerate = async () => {
    const companyAIndex = Math.floor(Math.random() * companyList.length - 1)
    const companyA = companyList[companyAIndex]
    let companyBIndex = Math.floor(Math.random() * companyList.length - 1)
    if (companyBIndex === companyAIndex) {
      companyBIndex++
      if (companyBIndex === companyList.length - 1) companyBIndex--
    }
    const companyB = companyList[companyBIndex]
    getTitle({ companyA, companyB })
  };

  const header = useMemo(() => {
    const popupinfo = (
      <div className="popupinfo">
        hehehe
      </div>
    )

    anime({
      easing: "easeInOutSine",
      targets: '#initial-header #loading-header #default-header',
      translateX: 250
    });
    if (!isIdle) {
      return (
        <h1 id="initial-header">
          Random startup idea generator
        </h1>
      );
    }

    return isSpinning
      ? <h1 id="loading-header">
          Drumroll please...
        </h1>
      : <h1 id="default-header">
          Congrats! Here&apos;s your startup
        </h1>
  }, [isSpinning])

  return (
    <Grommet>
      <Grid
        align="center"
        areas={[
          ["companyTitle", "companyTitle", "companyTitle"],
          ["companyA", "meets", "companyB"],
          ["generateButton", "generateButton", "generateButton"],
        ]}
        columns={["medium", "xxsmall", "medium"]}
        fill
        id='app-grid'
        gap="xxsmall"
        justify="center"
        justifyContent="center"
        pad="small"
        rows={["medium", "xsmall", "xsmall"]}
      >
        <Box gridArea="companyTitle" className="App">
          {header}
          <div className="company-title-row">
            {(Array.isArray(title) ? title : defaultList).map((letter, id) => {
                alphabet.sort(() => Math.random() - 0.5)
                return (
                  <div className='company-title' key={`letter-${id}`}>
                    <div className='letters'>
                      {isSpinning
                        ? <div className="alphabet-list">
                            {alphabet.map((item, id) => (
                              <div key={`item-${id}`}>
                                {item}
                              </div>
                            ))}
                          </div>
                        : letter}
                    </div>
                  </div>
                )
              })}
          </div>
        </Box>
        <SpinnerContainer
          idea={companies}
          isLoading={isSpinning}
        />
        <Box gridArea="generateButton" className="App">
          <button
            id='generate-button'
            disabled={isSpinning}
            onClick={onGenerate}
          >
            Generate
          </button>
        </Box>
      </Grid>
    </Grommet>
  )
}
